import { h } from 'preact';
import BaseEdge from './BaseEdge';
import { ArrowInfo } from '../../type/index';
export default class BezierEdge extends BaseEdge {
    getAttributes(): {
        path: string;
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
    getArrowInfo(): ArrowInfo;
}
