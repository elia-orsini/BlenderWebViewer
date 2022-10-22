/// <reference types="react" />
import * as THREE from 'three';
import { ReactThreeFiber } from '@react-three/fiber';
declare global {
    namespace JSX {
        interface IntrinsicElements {
            position: ReactThreeFiber.Object3DNode<Position, typeof Position>;
        }
    }
}
export declare class Position extends THREE.Group {
    color: THREE.Color;
    instance: React.MutableRefObject<THREE.InstancedMesh | undefined>;
    instanceKey: React.MutableRefObject<JSX.IntrinsicElements['position'] | undefined>;
    constructor();
    get geometry(): THREE.BufferGeometry | undefined;
    raycast(raycaster: any, intersects: any): void;
}
