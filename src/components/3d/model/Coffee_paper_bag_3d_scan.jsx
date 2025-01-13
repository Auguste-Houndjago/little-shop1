
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Cofee(props) {
  const { nodes, materials } = useGLTF('/models/coffee_paper_bag_3d_scan.glb')
  return (
    <group {...props} dispose={null} >
      <group scale={0.001}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.kava_low} position={[-1.497, -10.254, 11.752]} rotation={[Math.PI, 1.571, 0]} scale={0.01} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/coffee_paper_bag_3d_scan.glb')
