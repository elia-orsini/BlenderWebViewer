import * as React from 'react';
import * as THREE from 'three';
import { PresetsType } from '../helpers/environment-assets';
declare const presets: {
    rembrandt: {
        main: number[];
        fill: number[];
    };
    portrait: {
        main: number[];
        fill: number[];
    };
    upfront: {
        main: number[];
        fill: number[];
    };
    soft: {
        main: number[];
        fill: number[];
    };
};
declare type ControlsProto = {
    update(): void;
    target: THREE.Vector3;
};
declare type Props = JSX.IntrinsicElements['group'] & {
    shadows?: boolean;
    adjustCamera?: boolean;
    environment?: PresetsType | null;
    intensity?: number;
    ambience?: number;
    controls?: React.MutableRefObject<ControlsProto>;
    preset?: keyof typeof presets;
    shadowBias?: number;
    contactShadow?: {
        blur: number;
        opacity?: number;
        position?: [x: number, y: number, z: number];
    } | false;
};
export declare function Stage({ children, controls, shadows, adjustCamera, environment, intensity, preset, shadowBias, contactShadow, ...props }: Props): JSX.Element;
export {};
