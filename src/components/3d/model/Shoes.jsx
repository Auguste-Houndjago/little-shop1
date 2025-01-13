

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Shoes(props) {
  const { nodes, materials } = useGLTF('/models/shoes.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={0.05} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.lambert1.geometry} material={materials.lambert1} rotation={[Math.PI / 2, 0, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/shoes.glb')
