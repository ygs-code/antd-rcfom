import { h } from 'preact';
import BaseNode from './BaseNode';
export default class RectNode extends BaseNode {
    getShapeStyle(): {
        radius: number;
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
        radius: number;
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
