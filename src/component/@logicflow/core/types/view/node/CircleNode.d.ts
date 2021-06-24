import { h } from 'preact';
import BaseNode from './BaseNode';
export default class CircleNode extends BaseNode {
    getShapeStyle(): {
        r: number;
        width: number;
        height: number;
        fill: string;
        fillOpacity: number;
        strokeWidth: number;
        stroke: string;
        strokeOpacity: number;
        opacity: number;
        outlineColor: string;
    };
    getAttributes(): {
        r: number;
        width: number;
        height: number;
        fill: string;
        fillOpacity: number;
        strokeWidth: number;
        stroke: string;
        strokeOpacity: number;
        opacity: number;
        outlineColor: string;
        id: string;
        properties: {
            [x: string]: any;
        };
        type: string;
        x: number;
        y: number;
        isSelected: boolean;
        isHovered: boolean;
        text: {
            value: string;
            x: number;
            y: number;
            draggable: boolean;
            editable: boolean;
        };
    };
    getShape(): h.JSX.Element;
}
