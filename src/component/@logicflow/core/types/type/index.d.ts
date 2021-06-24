import { h } from 'preact';
import LogicFlow from '../LogicFlow';
import BaseEdge from '../view/edge/BaseEdge';
import BaseEdgeModel from '../model/edge/BaseEdgeModel';
import BaseNode from '../view/node/BaseNode';
import BaseNodeModel from '../model/node/BaseNodeModel';
import RectNodeModel from '../model/node/RectNodeModel';
import RectNode from '../view/node/RectNode';
import CircleNode from '../view/node/CircleNode';
import CircleNodeModel from '../model/node/CircleNodeModel';
import DiamondNode from '../view/node/DiamondNode';
import DiamondNodeModel from '../model/node/DiamondNodeModel';
import PolygonNode from '../view/node/PolygonNode';
import PolygonNodeModel from '../model/node/PolygonNodeModel';
import TextNodeModel from '../model/node/TextNodeModel';
import TextNode from '../view/node/TextNode';
import LineEdge from '../view/edge/LineEdge';
import LineEdgeModel from '../model/edge/LineEdgeModel';
import PolylineEdge from '../view/edge/PolylineEdge';
import PolylineEdgeModel from '../model/edge/PolylineEdgeModel';
import EllipseNode from '../view/node/EllipseNode';
import EllipseNodeModel from '../model/node/EllipseNodeModel';
import * as Options from '../options';
export declare type PointTuple = [number, number];
export declare type Point = {
    x: number;
    y: number;
    [key: string]: unknown;
};
export declare type Size = {
    width: number;
    height: number;
};
export declare type TextConfig = {
    value: string;
} & Point;
export declare type GraphConfigData = {
    nodes: NodeConfig[];
    edges: EdgeConfig[];
};
export declare type NodeConfig = {
    id?: string;
    type: string;
    x: number;
    y: number;
    text?: TextConfig | string;
    properties?: Record<string, unknown>;
};
export declare type NodeData = {
    id: string;
    type: string;
    x: number;
    y: number;
    rx?: number;
    ry?: number;
    text?: TextConfig;
    properties: Record<string, unknown>;
};
export declare type NodeAttribute = {
    id: string;
    type?: string;
    x?: number;
    y?: number;
    text?: TextConfig;
    properties?: Record<string, unknown>;
};
export declare type MenuConfig = {
    text?: string;
    className?: string;
    icon?: boolean;
    callback: (id: any) => void;
};
export declare type AdditionData = Record<string, unknown>;
export declare type EdgeData = {
    id: string;
    type: string;
    sourceNodeId: string;
    startPoint: Point;
    targetNodeId: string;
    endPoint: Point;
    text?: TextConfig;
    properties: Record<string, unknown>;
    pointsList?: Point[];
};
export declare type EdgeAttribute = {
    id: string;
    type?: string;
    sourceNodeId?: string;
    startPoint?: Point;
    targetNodeId?: string;
    endPoint?: Point;
    text?: TextConfig;
    properties?: Record<string, unknown>;
};
export declare type EdgeFilter = {
    id?: string;
    sourceNodeId?: string;
    targetNodeId?: string;
};
export declare type EdgeConfig = {
    id?: string;
    type: string;
    sourceNodeId: string;
    targetNodeId: string;
    startPoint?: {
        x: number;
        y: number;
    };
    endPoint?: {
        x: number;
        y: number;
    };
    text?: {
        x: number;
        y: number;
        value: string;
    };
    pointsList?: Point[];
    properties?: Record<string, unknown>;
};
export declare type CommonStyle = {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    fillOpacity?: number;
    strokeOpacity?: number;
    opacity?: number;
    outlineColor?: string;
    hoverOutlineColor?: string;
    outlineStrokeDashArray?: string;
    hoverOutlineStrokeDashArray?: string;
};
export declare type RectStyle = CommonStyle & {
    width?: number;
    height?: number;
    radius?: number;
};
export declare type CircleStyle = CommonStyle & {
    r?: number;
};
export declare type EllipseStyle = CommonStyle & {
    rx?: number;
    ry?: number;
};
export declare type DiamondStyle = CommonStyle;
export declare type PolygonStyle = CommonStyle;
export declare type AnchorStyle = CommonStyle & {
    stroke?: string;
    strokeWidth?: number;
    r?: number;
};
export declare type AnchorLineStyle = {
    stroke?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
};
export declare type AnchorHoverStyle = {
    fill?: string;
    fillOpacity?: number;
    stroke?: string;
    strokeWidth?: number;
    r?: number;
};
export declare type EdgeStyle = {
    stroke?: string;
    strokeWidth?: number;
    strokeDashArray?: string;
    hoverStroke?: string;
    selectedStroke?: string;
    outlineColor?: string;
    outlineStrokeDashArray?: string;
};
export declare type LineStyle = EdgeStyle;
export declare type PolylineStyle = EdgeStyle & {
    offset?: number;
};
export declare type BezierStyle = EdgeStyle & {
    offset?: number;
    adjustLineColor?: string;
    adjustAnchorStroke?: string;
    adjustAnchorFill?: string;
    adjustAnchorFillOpacity?: number;
};
export declare type TextStyle = {
    color?: string;
    fontSize?: number;
    fontWeight?: string;
    fontFamily?: string;
};
export declare type NodeTextStyle = TextStyle;
export declare type EdgeTextStyle = TextStyle & {
    background?: {
        fill?: string;
        stroke?: string;
        radius?: number;
    };
    hoverBackground?: {
        fill?: string;
        stroke?: string;
        radius?: number;
    };
};
export declare type ArrowStyle = {
    offset?: number;
    verticalLength?: number;
};
export declare type Style = {
    rect?: RectStyle;
    circle?: CircleStyle;
    ellipse?: EllipseStyle;
    diamond?: DiamondStyle;
    polygon?: PolygonStyle;
    anchor?: AnchorStyle;
    text?: TextStyle;
    nodeText?: NodeTextStyle;
    edgeText?: EdgeTextStyle;
    line?: LineStyle;
    polyline?: PolylineStyle;
    bezier?: BezierStyle;
    arrow?: ArrowStyle;
    anchorLine?: AnchorLineStyle;
    anchorHover?: AnchorHoverStyle;
};
export declare type GraphTransform = {
    transform: string;
    transformOrigin: string;
};
export declare type EventArgs = Record<string, number | object | string>;
export declare type FocusOnArgs = {
    id?: string;
    coordinate?: {
        x: number;
        y: number;
    };
};
export declare type ComponentRender = (lf: LogicFlow, container: HTMLElement) => void;
export interface Extension {
    name: string;
    install?: (lf: LogicFlow, LogicFlow: LogicFlowContractor) => void;
    render?: ComponentRender;
    destroy?: () => void;
    [props: string]: any;
}
export declare type Direction = 'vertical' | 'horizontal';
export declare type AppendInfo = {
    start: Point;
    end: Point;
    startIndex?: number;
    endIndex?: number;
    direction?: string;
};
export declare type ArrowInfo = {
    start: Point;
    end: Point;
    hover: Boolean;
    isSelected: Boolean;
};
export declare type IEdgeState = {
    hover: boolean;
};
export interface ModelContractor {
    new (data: any, graphModel: any): unknown;
}
export interface LogicFlowContractor {
    new (option: Options.Definition): LogicFlow;
}
export interface ExtensionContractor {
    new ({ lf: LogicFlow, LogicFlow: LogicFlowContractor, }: {
        lf: any;
        LogicFlow: any;
    }): any;
    render?: Function;
}
export declare type RegisterBack = {
    view: Function;
    model: Function;
};
export interface RegisterParam {
    h: typeof h;
    BaseEdge: typeof BaseEdge;
    BaseEdgeModel: typeof BaseEdgeModel;
    BaseNode: typeof BaseNode;
    BaseNodeModel: typeof BaseNodeModel;
    RectNode: typeof RectNode;
    RectNodeModel: typeof RectNodeModel;
    CircleNode: typeof CircleNode;
    CircleNodeModel: typeof CircleNodeModel;
    DiamondNode: typeof DiamondNode;
    DiamondNodeModel: typeof DiamondNodeModel;
    PolygonNode: typeof PolygonNode;
    PolygonNodeModel: typeof PolygonNodeModel;
    TextNode: typeof TextNode;
    TextNodeModel: typeof TextNodeModel;
    LineEdge: typeof LineEdge;
    LineEdgeModel: typeof LineEdgeModel;
    PolylineEdge: typeof PolylineEdge;
    PolylineEdgeModel: typeof PolylineEdgeModel;
    EllipseNode: typeof EllipseNode;
    EllipseNodeModel: typeof EllipseNodeModel;
    [key: string]: unknown;
}
export declare type RegisterElementFn = (params: RegisterParam) => RegisterBack;
export declare type RegisterConfig = {
    type: string;
    view: any;
    model: any;
    isObserverView?: boolean;
};
