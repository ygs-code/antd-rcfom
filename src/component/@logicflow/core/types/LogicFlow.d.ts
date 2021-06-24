import GraphModel from './model/GraphModel';
import Dnd from './view/behavior/DnD';
import * as Options from './options';
import * as _Model from './model';
import History from './history/History';
import Tool from './tool';
import EventEmitter, { CallbackType } from './event/eventEmitter';
import Keyboard from './keyboard';
import { EdgeConfig, EdgeFilter, NodeConfig, NodeAttribute, Extension, ComponentRender, FocusOnArgs, EdgeAttribute, EdgeData, GraphConfigData, RegisterElementFn, RegisterConfig } from './type';
import SnaplineModel from './model/SnaplineModel';
import { EditConfigInterface } from './model/EditConfigModel';
declare type GraphConfigModel = {
    nodes: _Model.BaseNodeModel[];
    edges: _Model.BaseEdgeModel[];
};
export default class LogicFlow {
    container: HTMLElement;
    width: number;
    height: number;
    graphModel: GraphModel;
    history: History;
    viewMap: Map<any, any>;
    tool: Tool;
    keyboard: Keyboard;
    dnd: Dnd;
    options: Options.Definition;
    getSnapshot: () => void;
    eventCenter: EventEmitter;
    snaplineModel: SnaplineModel;
    static extensions: Map<string, Extension>;
    components: ComponentRender[];
    adapterIn: (data: unknown) => GraphConfigData;
    adapterOut: (data: GraphConfigData) => unknown;
    [propName: string]: any;
    constructor(options: Options.Definition);
    on(evt: string, callback: CallbackType): void;
    off(evt: string, callback: CallbackType): void;
    emit(evt: string, arg: Record<string, string | number | object>): void;
    /**
     * 添加扩展, 待讨论，这里是不是静态方法好一些？
     * 重复添加插件的时候，把上一次添加的插件的销毁。
     * @param plugin 插件
     */
    static use(extension: Extension): void;
    installPlugins(disabledPlugins?: any[]): void;
    __installPlugin(extension: any): void;
    register(type: string | RegisterConfig, fn?: RegisterElementFn, isObserverView?: boolean): void;
    _registerElement(config: any): void;
    defaultRegister(): void;
    undo(): void;
    redo(): void;
    /**
     * 放大缩小图形
     * isZoomIn 是否放大，默认false, 表示缩小。
     * @returns {string} -放大缩小的比例
     */
    zoom(isZoomIn?: boolean): string;
    /**
     * 还原图形
     */
    resetZoom(): void;
    /**
     * 设置图形缩小时，能缩放到的最小倍数。参数为0-1自己。默认0.2
     * @param size 图形缩小的最小值
     */
    setZoomMiniSize(size: number): void;
    /**
     * 设置图形放大时，能放大到的最大倍数，默认16
     * @param size 图形放大的最大值
     */
    setZoomMaxSize(size: number): void;
    /**
     * 获取缩放的值和平移的值。
     */
    getTransform(): {
        SCALE_X: number;
        SCALE_Y: number;
        TRANSLATE_X: number;
        TRANSLATE_Y: number;
    };
    /**
     * 平移图形
     * @param x 向x轴移动距离
     * @param y 向y轴移动距离
     */
    translate(x: number, y: number): void;
    /**
     * 还原图形为初始位置
     */
    resetTranslate(): void;
    /**
     * 将图形选中
     * @param id 选择元素ID
     * @param multiple 是否允许多选，如果为true，不会将上一个选中的元素重置
     */
    select(id: string, multiple?: boolean): void;
    /**
     * 将图形定位到画布中心
     * @param focusOnArgs 支持用户传入图形当前的坐标或id，可以通过type来区分是节点还是连线的id，也可以不传（兜底）
     */
    focusOn(focusOnArgs: FocusOnArgs): void;
    setTheme(style: any): void;
    /**
     * 设置默认的连线类型
     * @param type Options.EdgeType
     */
    setDefaultEdgeType(type: Options.EdgeType): void;
    /**
     * 更新节点或连线文案
     * @param id 节点或者连线id
     * @param value 文案内容
     */
    updateText(id: string, value: string): void;
    /**
     * 修改指定节点类型
     * @param id 节点id
     * @param type 节点类型
     */
    changeNodeType(id: string, type: string): void;
    /**
     * 获取节点所有连线的model
     * @param nodeId 节点ID
     * @returns model数组
     */
    getNodeEdges(nodeId: any): _Model.BaseEdgeModel[];
    /**
     * 添加节点
     * @param nodeConfig 节点配置
     */
    addNode(nodeConfig: NodeConfig): _Model.BaseNodeModel;
    /**
     * 删除节点
     * @param {string} nodeId 节点Id
     */
    deleteNode(nodeId: string): void;
    /**
     * 显示节点文本编辑框
     * @param nodeId 节点id
     */
    editNodeText(nodeId: string): void;
    /**
     * 克隆节点
     * @param nodeId 节点Id
     */
    cloneNode(nodeId: string): _Model.BaseNodeModel;
    createEdge(edgeConfig: EdgeConfig): void;
    /**
     * 删除边
     * @param {string} edgeId 边Id
     */
    deleteEdge(edgeId: string): void;
    removeEdge(config: {
        sourceNodeId: string;
        targetNodeId: string;
    }): void;
    getEdge(config: EdgeFilter): _Model.BaseEdgeModel[];
    /**
     * 获取节点对象
     * @param nodeId 节点Id
     */
    getNodeModel(nodeId: string): _Model.BaseNodeModel;
    getNodeData(nodeId: string): NodeAttribute;
    setNodeData(nodeAttribute: NodeAttribute): void;
    getEdgeData(edgeId: string): EdgeData;
    setEdgeData(edgeAttribute: EdgeAttribute): void;
    /**
     * 获取流程绘图数据
     */
    getGraphData(): GraphConfigData | any;
    /**
     * 获取流程绘图原始数据
     * 在存在adapter时，可以使用getGraphRawData获取图原始数据
     */
    getGraphRawData(): {
        nodes: import("./type").NodeData[];
        edges: EdgeData[];
    };
    /**
     * 设置元素的自定义属性
     * @param id 元素的id
     * @param properties 自定义属性
     */
    setProperties(id: string, properties: Object): void;
    /**
     * 获取元素的自定义属性
     * @param id 元素的id
     * @returns 自定义属性
     */
    getProperties(id: string): Object;
    /**
     * 更新流程图编辑相关设置
     */
    updateEditConfig(config: EditConfigInterface): void;
    /**
     * 获取流程图编辑相关设置
     */
    getEditConfig(): Partial<_Model.EditConfigModel>;
    /**
     * 获取事件位置相对于画布左上角的坐标
     * @param {number} x 事件x坐标
     * @param {number} y 事件y坐标
     * @returns {object} Point 事件位置的坐标
     * @returns {object} Point.domOverlayPosition HTML层上的坐标
     * @returns {object} Point.canvasOverlayPosition SVG层上的坐标
     */
    getPointByClient(x: number, y: number): {
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
     * 获取选中的元素数据
     * @param isIgnoreCheck 是否包括sourceNode和targetNode没有被选中的连线,默认包括。
     * 复制的时候不能包括此类连线, 因为复制的时候不允许悬空的连线。
     */
    getSelectElements(isIgnoreCheck?: boolean): void;
    /**
     * 动态修改 id 对应元素 model 中的属性
     * @param {string} id 元素id
     * @param {object} attributes 需要更新的属性
     */
    updateAttributes(id: string, attributes: object): void;
    /**
     * 添加多个元素, 包括连线和节点。
     */
    addElements({ nodes, edges }: GraphConfigData): GraphConfigModel;
    clearSelectElements(): void;
    createFakerNode(nodeConfig: any): any;
    removeFakerNode(): void;
    setNodeSnapLine(data: any): void;
    /**
     * 获取指定区域坐标，此区域必须是DOM层，也就是可视区域。
     * @param leftTopPoint 区域左上角坐标, dom层坐标
     * @param rightBottomPoint 区域右下角坐标，dom层坐标
     */
    getAreaElement(leftTopPoint: any, rightBottomPoint: any): any[];
    removeNodeSnapLine(): void;
    clearData(): void;
    /**
     * 获取边的model
     * @param edgeId 边的Id
     */
    getEdgeModelById(edgeId: string): _Model.BaseEdgeModel;
    setView(type: string, component: any): void;
    getView: (type: string) => any;
    render(graphData?: {}): void;
}
export {};
