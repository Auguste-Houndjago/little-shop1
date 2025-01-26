'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const vertexShader = `
  precision mediump float;
  precision mediump int;
  attribute vec4 color;
  varying vec3 vPosition;
  varying vec4 vColor;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vPosition = position;
    vColor = color;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
  }
`

const fragmentShader = `
  precision mediump float;
  precision mediump int;
  uniform float time;
  uniform float blend;
  uniform vec2 clickPosition;
  uniform float waveIntensity;
  varying vec3 vPosition;
  varying vec4 vColor;
  uniform sampler2D tex1;
  uniform sampler2D tex2;
  varying vec2 vUv;
  
  float displaceAmount = 0.3;

  void main() {
    float blend2 = 1.-blend;
    vec4 image1 = texture2D(tex1, vUv);
    vec4 image2 = texture2D(tex2, vUv);
    float t1 = ((image2.r*displaceAmount)*blend)*2.;
    float t2 = ((image1.r*displaceAmount)*blend2)*2.;
    
    // Water wave effect
    float dist = distance(vUv, clickPosition);
    float wave = sin(dist * 50.0 - time * 10.0) * 0.005 * waveIntensity;
    wave *= smoothstep(0.3, 0.0, dist);
    
    vec2 waveUv = vUv + vec2(wave);
    
    vec4 imageA = texture2D(tex2, vec2(waveUv.x, waveUv.y-t1))*blend2;
    vec4 imageB = texture2D(tex1, vec2(waveUv.x, waveUv.y+t2))*blend;
    gl_FragColor = imageA.bbra * blend + imageA * blend2 +
    imageB.bbra * blend2 + imageB * blend;
  }
`

interface ImageTransitionGalleryProps {
  imageUrls: string[]
}

export default function ImageTransitionGallery({ imageUrls }: ImageTransitionGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const mousePositionRef = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5))
  const waveIntensityRef = useRef<number>(0)
  const meshRef = useRef<THREE.Mesh | null>(null)

  useEffect(() => {
    if (!containerRef.current || imageUrls.length < 2) return

    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let textures: THREE.Texture[] = []
    let scrollPos = 0
    let velocity = 0
    let acceleration = 0

    const init = async () => {
      scene = new THREE.Scene()
      const container = containerRef.current
      if (!container) return 

      const width = container.offsetWidth
      const height = container.offsetHeight

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000)
      camera.position.set(0, 0, 10)
      scene.add(camera)

      rendererRef.current = new THREE.WebGLRenderer({ antialias: true })
      rendererRef.current.setSize(width, height)
      container.appendChild(rendererRef.current.domElement)

      const geometry = new THREE.PlaneGeometry(1, 1, 64, 64) 
      textures = await Promise.all(imageUrls.map(loadTexture))

      materialRef.current = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 1.0 },
          blend: { value: 0.0 },
          tex1: { value: textures[1] },
          tex2: { value: textures[0] },
          clickPosition: { value: mousePositionRef.current },
          waveIntensity: { value: 0.0 }
        },
        vertexShader,
        fragmentShader,
      })

      const mesh = new THREE.Mesh(geometry, materialRef.current)
      meshRef.current = mesh
      scene.add(mesh)

      resizePlane() 
      setLoading(false)
      animate()
    }

    const resizePlane = () => {
      const container = containerRef.current
      if (!container) return 

      const width = container.offsetWidth
      const height = container.offsetHeight
      const aspect = width / height
      meshRef.current?.geometry.dispose()
      if (meshRef.current) {
        meshRef.current.geometry = new THREE.PlaneGeometry(aspect * 10, 10, 64, 64)
      }
      camera.aspect = aspect
      camera.updateProjectionMatrix()
      rendererRef.current?.setSize(width, height)
    }

    const loadTexture = (url: string): Promise<THREE.Texture> => {
      return new Promise((resolve) => {
        new THREE.TextureLoader().load(url, (texture) => {
          resolve(texture)
        })
      })
    }

    const animate = () => {
      requestAnimationFrame(animate)
      updateScroll()
      if (materialRef.current) {
        materialRef.current.uniforms.time.value += 0.05
        materialRef.current.uniforms.waveIntensity.value = waveIntensityRef.current
        waveIntensityRef.current *= 0.95 // Decrease wave intensity over time
      }
      rendererRef.current?.render(scene, camera)
    }

    const updateScroll = () => {
      velocity += acceleration
      if (Math.abs(velocity) > 0.1) {
        velocity *= 0.95
        scrollPos += velocity
      } else {
        velocity = 0
      }
      acceleration = 0

      if (scrollPos < 0) scrollPos = 0
      if (scrollPos > (imageUrls.length - 1) * 500) scrollPos = (imageUrls.length - 1) * 500

      const imageIndex = Math.floor(scrollPos / 500)
      if (materialRef.current) {
        materialRef.current.uniforms.tex2.value = textures[imageIndex]
        materialRef.current.uniforms.tex1.value = textures[Math.min(imageIndex + 1, textures.length - 1)]
        materialRef.current.uniforms.blend.value = (scrollPos % 500) / 500
      }
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      acceleration += Math.sign(event.deltaY) * 2
    }

    const handleResize = () => {
      resizePlane()
    }

    const handleMouseClick = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        mousePositionRef.current.x = (event.clientX - rect.left) / rect.width
        mousePositionRef.current.y = 1 - (event.clientY - rect.top) / rect.height
        if (materialRef.current) {
          materialRef.current.uniforms.clickPosition.value = mousePositionRef.current
        }
        waveIntensityRef.current = 1.0 // Set wave intensity to maximum on click
      }
    }

    window.addEventListener('wheel', handleWheel)
    window.addEventListener('resize', handleResize)
    containerRef.current.addEventListener('click', handleMouseClick)

    init()

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeEventListener('click', handleMouseClick)
      containerRef.current?.removeChild(rendererRef.current!.domElement)
    }
  }, [imageUrls])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  )
}