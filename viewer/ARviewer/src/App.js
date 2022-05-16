import './App.css';
import Three from './Three';
import { Suspense } from 'react'
import { ARCanvas } from '@react-three/xr'

function App() {
  return (
    <Suspense fallback={<div>Loading... </div>}>
      <ARCanvas style={{width: `100%`, height: `900px`}}>
        <Three />
      </ARCanvas>
    </Suspense>
  );
}

export default App;
