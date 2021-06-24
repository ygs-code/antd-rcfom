import { h, Component } from 'preact';
import BaseEdgeModel from '../../model/edge/BaseEdgeModel';
import GraphModel from '../../model/GraphModel';
import EventEmitter from '../../event/eventEmitter';
import { ArrowInfo } from '../../type/index';
declare type IProps = {
    model: BaseEdgeModel;
    graphModel: GraphModel;
    eventCenter: EventEmitter;
};
export default class BaseEdge extends Component<IProps> {
    startTime: number;
    preStartTime: number;
    contextMenuTime: number;
    clickTimer: number;
    getAttributes(): {
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
    getShape(): void;
    getTextStyle(): void;
    getText(): "" | h.JSX.Element;
    getArrowInfo(): ArrowInfo;
    getArrowStyle(): {
        stroke: string;
        strokeWidth: number;
        fill: string;
        offset: any;
        verticalLength: any;
    };
    getArrow(): h.JSX.Element;
    getAppendWidth(): h.JSX.Element;
    getAppend(): h.JSX.Element;
    handleHover: (hovered: any, ev: any) => void;
    setHoverON: (ev: any) => void;
    setHoverOFF: (ev: any) => void;
    handleContextMenu: (ev: MouseEvent) => void;
    handleMouseDown: (e: any) => void;
    handleMouseUp: (e: MouseEvent) => void;
    render(): h.JSX.Element;
}
export {};
