import './App.css';
import Three from './Three';
import { Suspense } from 'react'
import { VRCanvas, DefaultXRControllers, Hands } from '@react-three/xr'

function App() {
  return (
    <Suspense fallback={<div>Loading... </div>}>
      <VRCanvas style={{width: `100%`, height: `900px`}}>
        <DefaultXRControllers />
        <Hands />
        <Three />
      </VRCanvas>
    </Suspense>
  );
}

export default App;
