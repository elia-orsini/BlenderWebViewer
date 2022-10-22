/// <reference types="react" />
import { Event } from 'three';
declare type GizmoViewportProps = JSX.IntrinsicElements['group'] & {
    axisColors?: [string, string, string];
    axisScale?: [number, number, number];
    labels?: [string, string, string];
    axisHeadScale?: number;
    labelColor?: string;
    hideNegativeAxes?: boolean;
    hideAxisHeads?: boolean;
    disabled?: boolean;
    font?: string;
    onClick?: (e: Event) => null;
};
export declare const GizmoViewport: ({ hideNegativeAxes, hideAxisHeads, disabled, font, axisColors, axisHeadScale, axisScale, labels, labelColor, onClick, ...props }: GizmoViewportProps) => JSX.Element;
export {};
