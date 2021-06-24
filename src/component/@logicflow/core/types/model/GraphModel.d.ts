import BaseNodeModel from './node/BaseNodeModel';
import BaseEdgeModel from './edge/BaseEdgeModel';
import EditConfigModel from './EditConfigModel';
import TransfromModel from './TransformModel';
import { IBaseModel } from './BaseModel';
import { ElementState, ModelType, ElementType } from '../constant/constant';
import { AdditionData, Point, NodeConfig, EdgeConfig, Style } from '../type';
import EventEmitter from '../event/eventEmitter';
declare type BaseNodeModelId = string;
declare type ElementModeId = string;
declare class GraphModel {
    readonly BaseType = ElementType.GRAPH;
    modelType: ModelType;
    rootEl: HTMLElement;
    theme: any;
    eventCenter: EventEmitter;
    modelMap: Map<any, any>;
    width: number;
    height: number;
    topElement: BaseNodeModel | BaseEdgeModel;
    selectElement: BaseNodeModel | BaseEdgeModel;
    selectElements: Map<string, BaseNodeModel | BaseEdgeModel>;
    selectElementSize: number;
    edgeType: string;
    nodes: BaseNodeModel[];
    activeElement: IBaseModel;
    activeElementState: ElementState;
    state: ElementState;
    additionStateData: AdditionData;
    edges: BaseEdgeModel[];
    isSlient: boolean;
    plugins: any[];
    tools: any[];
    background: any;
    transformMatrix: TransfromModel;
    editConfig: EditConfigModel;
    gridSize: number;
    partial: boolean;
    fakerNode: BaseNodeModel;
    constructor(config: any);
    get nodesMap(): {
        [key: string]: {
            index: number;
            model: BaseNodeModel;
        };
    };
    get edgesMap(): {
        [key: string]: {
            index: number;
            model: BaseEdgeModel;
        };
    };
    get sortElements(): any[];
    /**
     * 当前编辑的元素，低频操作，先循环找吧。
     */
    get textEditElement(): BaseNodeModel | BaseEdgeModel;
    /**
     * 获取指定区域内的所有元素
     */
    getAreaElement(leftTopPoint: any, rightBottomPoint: any): any[];
    getModel(type: string): any;
    getNodeModel(nodeId: BaseNodeModelId): BaseNodeModel;
    /**
     * 因为流程图所在的位置可以是页面任何地方
     * 当内部事件需要获取触发事件时，其相对于画布左上角的位置
     * 需要事件触发位置减去画布相对于client的位置
     */
    getPointByClient({ x: x1, y: y1 }: Point): {
        domOverlayPosition: {
            x: number;
            y: number;
        };
        canvasOverlayPosition: {
            x: number;
            y: number;
        };
    };
    /**
     * 判断一个元素是否在指定矩形区域内。
     * @param element 节点或者连线
     * @param lt 左上角点
     * @param rb 右下角点
     */
    isElementInArea(element: any, lt: any, rb: any, wholeEdge?: boolean): boolean;
    graphDataToModel(graphData: any): void;
    modelToGraphData(): {
        nodes: import("../type").NodeData[];
        edges: import("../type").EdgeData[];
    };
    getEdgeModel(edgeId: string): BaseEdgeModel;
    getElement(id: string): IBaseModel | undefined;
    getNodeEdges(nodeId: any): BaseEdgeModel[];
    /**
     * 获取选中的元素数据
     * @param isIgnoreCheck 是否包括sourceNode和targetNode没有被选中的连线,默认包括。
     * 复制的时候不能包括此类连线, 因为复制的时候不允许悬空的连线
     */
    getSelectElements(isIgnoreCheck?: boolean): {
        nodes: any[];
        edges: any[];
    };
    updateAttributes(id: string, attributes: object): void;
    setFakerNode(nodeModel: BaseNodeModel): void;
    removeFakerNode(): void;
    setModel(type: string, ModelClass: any): Map<any, any>;
    updateEdgeByIndex(index: any, data: any): void;
    toFront(id: any): void;
    deleteNode(id: any): void;
    addNode(nodeConfig: NodeConfig): any;
    /**
    * 克隆节点
    * @param nodeId 节点Id
    */
    cloneNode(nodeId: string): BaseNodeModel;
    /**
     * 移动节点
     * @param nodeModel 节点Id
     * @param deltaX X轴移动距离
     * @param deltaY Y轴移动距离
     */
    moveNode(nodeId: BaseNodeModelId, deltaX: number, deltaY: number): void;
    setTextEditable(id: ElementModeId): void;
    createEdge(edgeConfig: EdgeConfig): EdgeConfig;
    moveEdge(nodeId: BaseNodeModelId, deltaX: number, deltaY: number): void;
    removeEdge(sourceNodeId: any, targetNodeId: any): void;
    removeEdgeById(id: any): void;
    removeEdgeBySource(sourceNodeId: any): void;
    removeEdgeByTarget(targetNodeId: any): void;
    setElementState(state: ElementState, additionStateData?: AdditionData): void;
    setElementStateById(id: ElementModeId, state: ElementState, additionStateData?: AdditionData): void;
    setElementTextById(id: ElementModeId, value: string): void;
    resetElementState(): void;
    selectNodeById(id: string, multiple?: boolean): void;
    selectEdgeById(id: string, multiple?: boolean): void;
    selectElementById(id: string, multiple?: boolean): void;
    clearSelectElements(): void;
    /**
     * 批量移动元素
     */
    moveElements(elements: {
        nodes: NodeConfig[];
    }, deltaX: number, deltaY: number): void;
    changeEdgeType(type: string): void;
    changeNodeType(id: any, type: string): void;
    setTheme(style: Style): void;
    clearData(): void;
}
export { GraphModel };
export default GraphModel;
