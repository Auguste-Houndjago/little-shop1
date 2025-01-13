
import { useGLTF } from '@react-three/drei'

export function Phone(props) {
  const { nodes, materials } = useGLTF('/models/phone.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={4}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0.037, 0.0011, 0]} scale={[0.9999, 2.9997, 0.9999]}>
            <mesh geometry={nodes.Object_6.geometry} material={materials.Silver} />
            <mesh geometry={nodes.Object_7.geometry} material={materials.Matt} />
            <mesh geometry={nodes.Object_8.geometry} material={materials.Matt_Black_Plastic} />
          </group>
          <group position={[0.0591, 0.1431, -0.005]} rotation={[Math.PI / 2, 0, 0]} scale={1.4189}>
            <mesh geometry={nodes.Object_10.geometry} material={materials.Rubber} />
            <mesh geometry={nodes.Object_11.geometry} material={materials.Matt_Black_Plastic} />
            <mesh geometry={nodes.Object_12.geometry} material={materials.Phone_color} />
            <mesh geometry={nodes.Object_13.geometry} material={materials.Glass} />
          </group>
          <group position={[0.0591, 0.1264, -0.005]} rotation={[Math.PI / 2, 0, 0]} scale={1.7427}>
            <mesh geometry={nodes.Object_15.geometry} material={materials.Black_Screen} />
            <mesh geometry={nodes.Object_16.geometry} material={materials.Phone_color} />
            <mesh geometry={nodes.Object_17.geometry} material={materials.Matt_Black_Plastic} />
            <mesh geometry={nodes.Object_18.geometry} material={materials.Glass} />
          </group>
          <group position={[0.0458, 0.1238, -0.0051]} rotation={[Math.PI / 2, 0, 0]} scale={[2.6964, 1.3544, 2.6964]}>
            <mesh geometry={nodes.Object_24.geometry} material={materials.Phone_color} />
            <mesh geometry={nodes.Object_25.geometry} material={materials['Material.004']} />
            <mesh geometry={nodes.Object_26.geometry} material={materials.Plastic_Glass} />
          </group>
          <group position={[0.0371, 0.079, 0]}>
            <mesh geometry={nodes.Object_42.geometry} material={materials.Phone_color} />
            <mesh geometry={nodes.Object_43.geometry} material={materials.Black_Screen} />
          </group>
          <group position={[0.0457, 0.1347, -0.005]} rotation={[Math.PI / 2, 0, 0]} scale={1.4189}>
            <mesh geometry={nodes.Object_61.geometry} material={materials.Rubber} />
            <mesh geometry={nodes.Object_62.geometry} material={materials.Matt_Black_Plastic} />
            <mesh geometry={nodes.Object_63.geometry} material={materials.Phone_color} />
            <mesh geometry={nodes.Object_64.geometry} material={materials.Glass} />
          </group>
          <mesh geometry={nodes.Object_4.geometry} material={materials.Matt_Black_Plastic} position={[0.037, 0.0012, 0]} />
          <mesh geometry={nodes.Object_20.geometry} material={materials.Phone_color} position={[0.0458, 0.1435, -0.0051]} rotation={[Math.PI / 2, 0, 0]} scale={1.3544} />
          <mesh geometry={nodes.Object_22.geometry} material={materials.material} position={[0.0458, 0.1435, -0.0051]} rotation={[Math.PI / 2, 0, 0]} scale={1.3544} />
          <mesh geometry={nodes.Object_28.geometry} material={materials.Phone_color} position={[0.0528, 0.1348, -0.0046]} scale={[1.0471, 1.141, 1.141]} />
          <mesh geometry={nodes.Object_30.geometry} material={materials.Matt_Black_Plastic} position={[0.0359, 0.1545, 0.0041]} rotation={[Math.PI / 2, 0, 0]} scale={0.2834} />
          <mesh geometry={nodes.Object_32.geometry} material={materials.Matt_Black_Plastic} position={[0.0319, 0.1579, -0.0005]} />
          <mesh geometry={nodes.Object_34.geometry} material={materials.Matt_Black_Plastic} position={[0.0184, 0.001, -0.0005]} scale={[0.9461, 1, 0.9461]} />
          <mesh geometry={nodes.Object_36.geometry} material={materials.Phone_color} position={[0.037, 0.079, 0]} scale={[0.9938, 1.0033, 1]} />
          <mesh geometry={nodes.Object_38.geometry} material={materials.Phone_color} position={[0.0741, 0.1048, 0]} scale={[1, 1.0334, 1]} />
          <mesh geometry={nodes.Object_40.geometry} material={materials.Rubber} position={[0.037, 0.079, 0]} scale={[0.9938, 1.0033, 1]} />
          <mesh geometry={nodes.Object_45.geometry} material={materials.Phone_color} position={[0.023, 0.1579, -0.0005]} scale={[1, 1, 0.7116]} />
          <mesh geometry={nodes.Object_47.geometry} material={materials.Lems} position={[0.0591, 0.1431, -0.0046]} scale={[0.0014, 0.0014, 0.001]} />
          <mesh geometry={nodes.Object_49.geometry} material={materials.Lems} position={[0.0591, 0.1431, -0.0046]} scale={[0.0009, 0.0009, 0.0007]} />
          <mesh geometry={nodes.Object_51.geometry} material={materials.Lems} position={[0.0457, 0.1347, -0.0046]} scale={[0.0014, 0.0014, 0.001]} />
          <mesh geometry={nodes.Object_53.geometry} material={materials.Lems} position={[0.0457, 0.1347, -0.0046]} scale={[0.0009, 0.0009, 0.0007]} />
          <mesh geometry={nodes.Object_55.geometry} material={materials.Lems} position={[0.0591, 0.1264, -0.0046]} scale={[0.002, 0.002, 0.0011]} />
          <mesh geometry={nodes.Object_57.geometry} material={materials.Lems} position={[0.0591, 0.1264, -0.0046]} scale={[0.0013, 0.0013, 0.0009]} />
          <mesh geometry={nodes.Object_59.geometry} material={materials.Phone_color} position={[0, 0.1123, 0]} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/phone.glb')
