import { h, Component } from 'preact';
import BaseNodeModel, { ConnectRuleResult } from '../model/node/BaseNodeModel';
import GraphModel from '../model/GraphModel';
import EventEmitter from '../event/eventEmitter';
declare type TargetNodeId = string;
interface IProps {
    x: number;
    y: number;
    style?: Record<string, any>;
    hoverStyle?: Record<string, any>;
    edgeStyle?: Record<string, any>;
    anchorIndex: number;
    eventCenter: EventEmitter;
    graphModel: GraphModel;
    nodeModel: BaseNodeModel;
    nodeDraging: boolean;
    setHoverOFF: Function;
}
interface IState {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    draging: boolean;
}
declare class Anchor extends Component<IProps, IState> {
    preTargetNode: BaseNodeModel;
    dragHandler: Function;
    sourceRuleResults: Map<TargetNodeId, ConnectRuleResult>;
    targetRuleResults: Map<TargetNodeId, ConnectRuleResult>;
    constructor();
    onDragStart: () => void;
    onDraging: ({ deltaX, deltaY }: {
        deltaX: any;
        deltaY: any;
    }) => void;
    onDragEnd: () => void;
    onDblClick: () => void;
    checkEnd: () => void;
    isShowLine(): boolean;
    render(): h.JSX.Element;
}
export default Anchor;
