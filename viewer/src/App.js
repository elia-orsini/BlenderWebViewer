import './App.css';
import Three from './Three';
import { Suspense } from 'react'
import { applyProps, Canvas, useThree } from '@react-three/fiber'

function App() {
  return (
    <Suspense fallback={<div>Loading... </div>}>
      <Canvas style={{width: `100%`, height: `900px`}}>
        <Three />
      </Canvas>
    </Suspense>
  );
}

export default App;
