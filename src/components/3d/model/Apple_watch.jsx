
import { useGLTF } from '@react-three/drei'

export function AppleWatch1(props) {
  const { nodes, materials } = useGLTF('/models/apple_watch.glb')
  return (
    <group {...props} dispose={null}>
     <group scale={0.008}>
  
        <group position={[16.249, 8.337, 10.526]} rotation={[Math.PI / 2, Math.PI / 2, 0]} scale={[0.99, 0.99, 0.894]}>
          <mesh geometry={nodes.Button_Iron_Clean_0.geometry} material={materials.Iron_Clean} />
          <mesh geometry={nodes.Button_Iron_Clean2_0.geometry} material={materials.Iron_Clean2} />
          <mesh geometry={nodes.Button_Black2_0.geometry} material={materials.Black2} />
        </group>
        <group position={[-1.708, -0.146, 10.091]}>
          <group position={[0, 0, -5.35]}>
            <mesh geometry={nodes.Case_Iron_Clean_0.geometry} material={materials.Iron_Clean} />
            <mesh geometry={nodes.Case_Iron_Clean2_0.geometry} material={materials.Iron_Clean2} />
          </group>
        </group>
        <group position={[-1.708, -0.736, 4.583]} rotation={[0, 0, 0.065]} scale={0.914}>
          <mesh geometry={nodes.Back_cover_Black_Glossy2_0.geometry} material={materials.Black_Glossy2} />
          <mesh geometry={nodes.Back_cover_Black_Glossy_0.geometry} material={materials.Black_Glossy} />
          <mesh geometry={nodes.Back_cover_Glass_Clear2_0.geometry} material={materials.Glass_Clear2} />
        </group>
        <group position={[-1.963, -6.058, -44.509]} scale={0.993}>
          <group position={[0, 5.981, 49.034]}>
            <mesh geometry={nodes.Rivet_Iron_Clean3_0.geometry} material={materials.Iron_Clean3} />
            <mesh geometry={nodes.Rivet_Iron_Clean2_0.geometry} material={materials.Iron_Clean2} />
          </group>
        </group>
        <group position={[-1.708, -0.146, 14.314]} scale={0.999}>
          <group position={[0, 0, -9.573]}>
            <mesh geometry={nodes.Case_2_Black_Glossy_0.geometry} material={materials.Black_Glossy} />
            <mesh geometry={nodes.Case_2_Black_Glossy_TEXT_0.geometry} material={materials.Black_Glossy_TEXT} />
          </group>
        </group>
        <group position={[-1.708, 1.559, 10.091]}>
          <mesh geometry={nodes['Cap_Material_#1898_0'].geometry} material={materials.Material_1898} position={[0, 0, -5.35]} />
        </group>
        <group position={[-1.708, -0.146, 14.237]} scale={0.999}>
          <mesh geometry={nodes.Screen_Screen_1_0.geometry} material={materials.Screen_1} position={[0, 0, -9.573]} />
        </group>
        <mesh geometry={nodes.Strap_Rubber_0.geometry} material={materials.Rubber} position={[-1.81, -0.119, 4.597]} scale={0.993} />
        <mesh geometry={nodes['Sensor_Material_#2034_0'].geometry} material={materials.Material_2034} position={[-1.708, -0.736, 3.935]} rotation={[0, 0, 0.065]} scale={0.914} />
        <mesh geometry={nodes.Glass_Glass_Clear_0.geometry} material={materials.Glass_Clear} position={[-1.708, -0.146, 4.741]} />
  
</group>
    </group>
  )
}

useGLTF.preload('/models/apple_watch.glb')
