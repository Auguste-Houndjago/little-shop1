
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Cofee(props) {
  const { nodes, materials } = useGLTF('/models/phone_game.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.defaultMaterial.geometry} material={materials.Material_001} rotation={[Math.PI / 2, 0, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/phone_game.glb')
