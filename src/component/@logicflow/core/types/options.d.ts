import { DndOptions } from './view/behavior/DnD';
import { GridOptions } from './view/overlay/Grid';
import { BackgroundConfig } from './view/overlay/BackgroundOverlay';
import { Style, NodeData, EdgeData, GraphConfigData } from './type';
import { KeyboardDef } from './keyboard';
export declare type EdgeType = 'line' | 'polyline' | 'bezier' | any;
export declare type Definition = {
    container: HTMLElement;
    width?: number;
    height?: number;
    background?: false | BackgroundConfig;
    grid?: boolean | GridOptions;
    textEdit?: boolean;
    keyboard?: KeyboardDef;
    style?: Style;
    dndOptions?: DndOptions;
    isSilentMode?: boolean;
    disabledPlugins?: string[];
    edgeType?: EdgeType;
    snapline?: boolean;
    history?: boolean;
    partial?: boolean;
    stopScrollGraph?: boolean;
    stopZoomGraph?: boolean;
    stopMoveGraph?: boolean;
    guards?: GuardsTypes;
    hideAnchors?: boolean;
    hoverOutline?: boolean;
};
export interface GuardsTypes {
    beforeClone?: (data: NodeData | GraphConfigData) => boolean;
    beforeDelete?: (data: NodeData | EdgeData) => boolean;
}
export declare function get(options: Definition): {
    background: boolean;
    grid: boolean;
    textEdit: boolean;
} & Definition;
export declare const defaults: {
    background: boolean;
    grid: boolean;
    textEdit: boolean;
};
