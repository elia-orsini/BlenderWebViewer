import * as THREE from 'three';
import * as React from 'react';
import { ReactThreeFiber } from '@react-three/fiber';
import { Line2 } from 'three-stdlib';
declare type SegmentsProps = {
    limit?: number;
    lineWidth?: number;
    children: React.ReactNode;
};
declare type Segment = {
    start: THREE.Vector3;
    end: THREE.Vector3;
    color?: THREE.Color;
};
declare type SegmentProps = JSX.IntrinsicElements['segmentObject'] & Segment;
declare const Segments: React.ForwardRefExoticComponent<SegmentsProps & React.RefAttributes<Line2>>;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            segmentObject: ReactThreeFiber.Object3DNode<SegmentObject, typeof SegmentObject>;
        }
    }
}
declare class SegmentObject {
    color: THREE.Color;
    start: THREE.Vector3;
    end: THREE.Vector3;
    constructor();
}
declare const Segment: React.ForwardRefExoticComponent<Pick<SegmentProps, "attach" | "attachArray" | "attachObject" | "args" | "children" | "key" | "onUpdate" | "position" | "up" | "scale" | "rotation" | "matrix" | "quaternion" | "layers" | "dispose" | "color" | "onClick" | "onContextMenu" | "onDoubleClick" | "onPointerDown" | "onPointerMove" | "onPointerUp" | "onPointerCancel" | "onPointerEnter" | "onPointerLeave" | "onPointerOver" | "onPointerOut" | "onWheel" | "onPointerMissed" | "end" | "start"> & React.RefAttributes<Segment>>;
export { Segments, Segment };
