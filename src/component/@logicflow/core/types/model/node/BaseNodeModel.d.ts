import { ElementState, ModelType, ElementType } from '../../constant/constant';
import { AdditionData, NodeData, NodeAttribute, NodeConfig } from '../../type';
import GraphModel from '../GraphModel';
import { IBaseModel } from '../BaseModel';
export declare type ConnectRule = {
    message: string;
    validate: (source: BaseNodeModel, target: BaseNodeModel) => boolean;
};
export declare type ConnectRuleResult = {
    isAllPass: boolean;
    msg?: string;
};
export { BaseNodeModel };
export default class BaseNodeModel implements IBaseModel {
    readonly id: string;
    readonly BaseType = ElementType.NODE;
    modelType: ModelType;
    additionStateData: AdditionData;
    [propName: string]: any;
    targetRules: ConnectRule[];
    sourceRules: ConnectRule[];
    hasSetTargetRules: boolean;
    hasSetSourceRules: boolean;
    properties: Record<string, any>;
    type: string;
    x: number;
    y: number;
    private _width;
    graphModel: GraphModel;
    get width(): number;
    set width(value: number);
    private _height;
    get height(): number;
    set height(value: number);
    fill: string;
    fillOpacity: number;
    strokeWidth: number;
    stroke: string;
    strokeOpacity: number;
    opacity: number;
    outlineColor: string;
    hoverOutlineColor: string;
    outlineStrokeDashArray: string;
    hoverOutlineStrokeDashArray: string;
    isSelected: boolean;
    isHovered: boolean;
    isHitable: boolean;
    zIndex: number;
    anchorsOffset: any[];
    state: number;
    text: {
        value: string;
        x: number;
        y: number;
        draggable: boolean;
        editable: boolean;
    };
    draggable: boolean;
    constructor(data: NodeConfig, graphModel: GraphModel, type: any);
    initNodeData(data: any): void;
    formatText(data: any): void;
    setAttributes(): void;
    /**
     * 保存时获取的数据
     */
    getData(): NodeData;
    getProperties(): Record<string, any>;
    /**
     * 在连线的时候，是否允许这个节点为source节点，连线到target节点。
     */
    isAllowConnectedAsSource(target: BaseNodeModel): ConnectRuleResult;
    /**
     * 获取当前节点作为连接的起始节点规则。
     */
    getConnectedSourceRules(): ConnectRule[];
    /**
     * 在连线的时候，是否允许这个节点未target节点
     */
    isAllowConnectedAsTarget(source: BaseNodeModel): ConnectRuleResult;
    getConnectedTargetRules(): ConnectRule[];
    getAnchorsByOffset(): {
        x: any;
        y: any;
    }[];
    get anchors(): {
        x: any;
        y: any;
    }[];
    move(deltaX: any, deltaY: any): void;
    moveTo(x: any, y: any): void;
    moveText(deltaX: any, deltaY: any): void;
    updateText(value: string): void;
    setSelected(flag?: boolean): void;
    setHovered(flag?: boolean): void;
    setHitable(flag?: boolean): void;
    setElementState(state: ElementState, additionStateData?: AdditionData): void;
    updateStroke(color: any): void;
    updateData(nodeAttribute: NodeAttribute): void;
    setProperty(key: any, val: any): void;
    setProperties(properties: any): void;
    setStyleFromTheme(type: any, graphModel: any): void;
    setZIndex(zindex?: number): void;
    updateAttributes(attributes: any): void;
}
