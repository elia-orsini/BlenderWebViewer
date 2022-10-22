import './App.css';
import { useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import Scene from "./Scene";
import { OrbitControls, GizmoHelper, GizmoViewport, Environment} from '@react-three/drei';
import { useControls, button } from 'leva'
import { AxesHelper } from 'three'

function Three() {

    const {scene, camera} = useThree()
    const [blenderCamera, setBlenderCamera] = useState(false)

    camera.position.y = 4

    let localColor
    if (localStorage.getItem('bgColor')) {
        localColor = localStorage.getItem('bgColor')
    } else {
        localColor = '#272727'
    }
    const bgColor = useControls({ bgColor: localColor })

    let localGrid
    if (localStorage.getItem('grid')) {
        localGrid = localStorage.getItem('grid') == 'true'
    } else {
        localGrid = true
    }
    const grid = useControls({ floor: localGrid })

    let initAutoRotate
    if (localStorage.getItem('autorotate')) {
        initAutoRotate = localStorage.getItem('autorotate') == 'true'
    } else {
        initAutoRotate = false
    }
    const autoRotate = useControls({ autoRotate: initAutoRotate })

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

    const bg = useControls({
        bg: {options: ['color', 'dawn', 'night', 'sunset', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby']}
    })

    // cache values
    useEffect(()=>{
        localStorage.setItem('bgColor', bgColor.bgColor)
        localStorage.setItem('grid', grid.floor)
        localStorage.setItem('axes', axes.axesHelper)
        localStorage.setItem('autorotate', autoRotate.autoRotate)
    }, [bg, grid, axes, autoRotate])

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

    return (
        <>
            <ambientLight intensity={0.1} />
            <directionalLight position={[4,5,0]} intensity={[2]}/>
            {bg.bg !== 'color' ? (<Environment preset={bg.bg} background/>) : (<color attach="background" args={[bgColor.bgColor]} />)}
            
            <Scene blenderCamera={blenderCamera} position={[0,0,-0.3]}/>

            {/* {axes.axesHelper ? (<primitive object={new AxesHelper(60)} />) : (<></>)} */}
            {/* <mesh rotation={[Math.PI/2,Math.PI,Math.PI]} position={[0,0,0]}>
                <planeBufferGeometry args={[120,120,100,100]}/>
                <meshBasicMaterial color="#f3f3f3" wireframe opacity={grid.floor ? (0.07) : (0)} transparent/>
            </mesh> */}
            { blenderCamera ? (
                <></>
            ) : (
                <OrbitControls minDistance={10} makeDefault autoRotate={autoRotate.autoRotate} autoRotateSpeed={1.2}/>
            )}
        </>
    )
}

export default Three;