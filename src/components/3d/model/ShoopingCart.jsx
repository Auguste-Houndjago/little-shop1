
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function ShoopingCart(props) {
  const { nodes, materials } = useGLTF('/models/shopping_cart.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={6.489}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials.Griff}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_6.geometry}
            material={materials.Chrome}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/shopping_cart.glb')

