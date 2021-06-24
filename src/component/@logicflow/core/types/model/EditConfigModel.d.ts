export interface EditConfigInterface {
    stopZoomGraph?: boolean;
    stopScrollGraph?: boolean;
    stopMoveGraph?: boolean;
    adjustEdge?: boolean;
    adjustNodePosition?: boolean;
    hideAnchors?: boolean;
    nodeTextEdit?: boolean;
    edgeTextEdit?: boolean;
    nodeTextDraggable?: boolean;
    edgeTextDraggable?: boolean;
    extraConf?: Record<string, string | number | object | boolean>;
}
/**
 * 页面编辑配置
 */
export default class EditConfigModel {
    stopZoomGraph: boolean;
    stopScrollGraph: boolean;
    stopMoveGraph: boolean;
    adjustEdge: boolean;
    adjustNodePosition: boolean;
    hideAnchors: boolean;
    hoverOutline: boolean;
    nodeTextEdit: boolean;
    edgeTextEdit: boolean;
    nodeTextDraggable: boolean;
    edgeTextDraggable: boolean;
    metaKeyMultipleSelected: boolean;
    extraConf: {};
    keys: string[];
    constructor(data: any);
    updateEditConfig(config: any): void;
    getConfig(): Partial<this>;
}
export { EditConfigModel };
