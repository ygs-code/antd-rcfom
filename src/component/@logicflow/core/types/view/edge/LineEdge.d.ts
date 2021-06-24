import { h } from 'preact';
import BaseEdge from './BaseEdge';
export default class LineEdge extends BaseEdge {
    getAttributes(): {
        startPoint: any;
        endPoint: any;
        stroke: string;
        strokeWidth: number;
        strokeOpacity: number;
        strokeDashArray: string;
        isSelected: boolean;
        isHovered: boolean;
        hoverStroke: string;
        selectedStroke: string;
        properties: {};
    };
    getEdge(): h.JSX.Element;
    getShape(): h.JSX.Element;
    getAppendWidth(): h.JSX.Element;
}
