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
  const isDraggingRef = useRef<boolean>(false)
  const lastMouseYRef = useRef<number>(0)
  const accelerationRef = useRef<number>(0)

  const handleMouseDown = (event: MouseEvent) => {
    isDraggingRef.current = true
    lastMouseYRef.current = event.clientY
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (isDraggingRef.current) {
      const deltaY = event.clientY - lastMouseYRef.current
      accelerationRef.current += deltaY * 0.1
      lastMouseYRef.current = event.clientY
    }
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  useEffect(() => {
    if (!containerRef.current || imageUrls.length < 2) return

    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let textures: THREE.Texture[] = []
    let scrollPos = 0
    let velocity = 0

    const init = async () => {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)
      camera.position.set(0, 0, 10)
      scene.add(camera)

      rendererRef.current = new THREE.WebGLRenderer({ antialias: false })
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      containerRef.current?.appendChild(rendererRef.current.domElement)

      const geometry = new THREE.PlaneGeometry(4.75, 7, 64, 64)

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
      scene.add(mesh)

      setLoading(false)
      animate()
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
      velocity += accelerationRef.current
      if (Math.abs(velocity) > 0.1) {
        velocity *= 0.95
        scrollPos += velocity
      } else {
        velocity = 0
      }
      accelerationRef.current = 0

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
      accelerationRef.current += Math.sign(event.deltaY) * 2
    }

    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      rendererRef.current?.setSize(window.innerWidth, window.innerHeight)
    }

    const handleMouseClick = (event: MouseEvent) => {
      if (isDraggingRef.current) return // Don't trigger wave effect if dragging

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
    containerRef.current.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    init()

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeEventListener('click', handleMouseClick)
      containerRef.current?.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      containerRef.current?.removeChild(rendererRef.current!.domElement)
    }
  }, [imageUrls])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  )
}

