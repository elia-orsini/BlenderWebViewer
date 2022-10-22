import './App.css';
import Three from './Three';
import { Suspense } from 'react'
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'

function App() {
  return (
    <Suspense fallback={<div>Loading... </div>}>
      <ARButton />
      <Canvas style={{width: `100%`, height: `900px`}}>
        <XR>
          <Three />
        </XR>
      </Canvas>
    </Suspense>
  );
}

export default App;
