import * as THREE from 'three';
declare type FBOSettings<T extends boolean = false> = {
    multisample?: T;
    samples?: number;
} & THREE.WebGLRenderTargetOptions;
export declare function useFBO<T extends boolean = false>(width?: number | FBOSettings<T>, height?: number, settings?: FBOSettings<T>): THREE.WebGLRenderTarget;
export {};
