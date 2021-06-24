import { h, Component } from 'preact';
import GraphModel from '../../model/GraphModel';
import BaseNodeModel from '../../model/node/BaseNodeModel';
import EventEmitter from '../../event/eventEmitter';
import { StepDrag } from '../../util/drag';
declare type IProps = {
    model: BaseNodeModel;
    graphModel: GraphModel;
    eventCenter: EventEmitter;
};
declare type Istate = {
    isDraging: boolean;
    isHovered: boolean;
};
export default abstract class BaseNode extends Component<IProps, Istate> {
    static getModel(defaultModel: any): any;
    stepDrag: StepDrag;
    contextMenuTime: number;
    startTime: number;
    clickTimer: number;
    constructor(props: any);
    abstract getShape(): any;
    getShapeStyle(): {
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
    getProperties(): Record<string, any>;
    getAnchorStyle(): Record<string, any>;
    getAnchorHoverStyle(): Record<string, any>;
    getNewEdgeStyle(): Record<string, any>;
    getAnchors(): h.JSX.Element[];
    getTextStyle(): any;
    getText(): "" | h.JSX.Element;
    getStateClassName(): string;
    onDragStart: () => void;
    onDraging: ({ deltaX, deltaY }: {
        deltaX: any;
        deltaY: any;
    }) => void;
    onDragEnd: () => void;
    handleClick: (e: MouseEvent) => void;
    handleContextMenu: (ev: MouseEvent) => void;
    handleMouseDown: (ev: MouseEvent) => void;
    setHoverON: (ev: any) => void;
    setHoverOFF: (ev: any) => void;
    onMouseOut: (ev: any) => void;
    render(): any;
}
export {};
