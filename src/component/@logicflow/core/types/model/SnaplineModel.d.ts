import GraphModel from './GraphModel';
import { NodeData } from '../type/index';
import BaseNodeModel from './node/BaseNodeModel';
export declare type SnaplineInfo = {
    isShowHorizontal?: boolean;
    isShowVertical?: boolean;
    position?: SnaplinePosition;
};
export declare type SnaplinePosition = {
    x?: number;
    y?: number;
};
export default class SnaplineModel {
    graphModel: GraphModel;
    isShowHorizontal: boolean;
    isShowVertical: boolean;
    position: SnaplinePosition;
    get stroke(): string;
    get strokeWidth(): number;
    constructor(graphModel: any);
    private getCenterSnapLine;
    private getHorizontalSnapline;
    private getVerticalSnapline;
    getSnapLinePosition(dragingNode: NodeData, nodes: BaseNodeModel[]): SnaplineInfo;
    private setSnaplineInfo;
    clearSnapline(): void;
    setNodeSnapLine(nodeData: NodeData): void;
}
export { SnaplineModel };
