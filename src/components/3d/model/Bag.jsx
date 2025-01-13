
import { useGLTF } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';

export function Bag(props) {
  const { nodes } = useGLTF('/models/bag.glb');


  const darkColor = new MeshStandardMaterial({ color: '#333333', roughness: 0.8 });

  return (
    <group {...props} dispose={null}>
      <group scale={0.0008}  >
    
        <mesh geometry={nodes.bag_2_1.geometry} material={darkColor} />
        <mesh geometry={nodes.bag_2_2.geometry} material={darkColor} />
        <mesh geometry={nodes.bag_2_3.geometry} material={darkColor} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/bag.glb');
