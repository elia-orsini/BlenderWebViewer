import './App.css';
import { useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import Scene from "./Scene";
import { OrbitControls, GizmoHelper, GizmoViewport} from '@react-three/drei';
import { useControls, button } from 'leva'
import * as THREE from 'three'

function Three() {

    const {scene, camera} = useThree()
    const [blenderCamera, setBlenderCamera] = useState(false)

    let localColor
    if (localStorage.getItem('bgColor')) {
        localColor = localStorage.getItem('bgColor')
    } else {
        localColor = '#272727'
    }
    const bg = useControls({ bgColor: localColor })

    let localGrid
    if (localStorage.getItem('grid')) {
        localGrid = localStorage.getItem('grid') == 'true'
    } else {
        localGrid = true
    }
    const grid = useControls({ floor: localGrid })

    let localAxes
    if (localStorage.getItem('axes')) {
        localAxes = localStorage.getItem('axes') == 'true'
    } else {
        localAxes = true
    }
    const axes = useControls({ axesHelper: localAxes })

    const ble = useControls({
        blenderView: button(() => {setBlenderCamera(true)})
    })

    useEffect(()=>{
        localStorage.setItem('bgColor', bg.bgColor)
        localStorage.setItem('grid', grid.floor)
        localStorage.setItem('axes', axes.axesHelper)
    }, [bg, grid, axes])

    // adjust light intensity
    useEffect(()=>{
        scene.children.map(child => {
            if (child.type == "Group") {
                child.children.map(subchild => {
                    if (subchild.type == 'Group')
                        subchild.children.map(subsubchild => {
                            if (subsubchild.type == 'PointLight' || subsubchild.type == 'SpotLight') subsubchild.intensity = subsubchild.intensity/1200
                        })
                })
            }
        })
    }, [])

    return(
        <>
            <ambientLight intensity={0.1} />
            <color attach="background" args={[bg.bgColor]} />
            
            <Scene blenderCamera={blenderCamera}/>

            {axes.axesHelper ? (<primitive object={new THREE.AxesHelper(60)} />) : (<></>)}
            <mesh rotation={[Math.PI/2,Math.PI,Math.PI]} position={[0,0,0]}>
                <planeBufferGeometry args={[120,120,100,100]}/>
                <meshBasicMaterial color="#f3f3f3" wireframe opacity={grid.floor ? (0.07) : (0)} transparent/>
            </mesh>
            { blenderCamera ? (
                <></>
            ) : (
                <OrbitControls minDistance={10} makeDefault/>
            )}
        </>
    )
}

export default Three;