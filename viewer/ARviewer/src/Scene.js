/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/scene.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh name="Suzanne" castShadow receiveShadow geometry={nodes.Suzanne.geometry} material={materials['Material.001']} position={[0, 0.11, 0]} scale={0.07} />
    </group>
  )
}

useGLTF.preload('/scene.glb')