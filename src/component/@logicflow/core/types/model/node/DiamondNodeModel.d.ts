import { NodeData, Point, PointTuple } from '../../type';
import BaseNodeModel from './BaseNodeModel';
import { ModelType } from '../../constant/constant';
import GraphModel from '../GraphModel';
declare class DiamondNodeModel extends BaseNodeModel {
    modelType: ModelType;
    rx: number;
    ry: number;
    constructor(data: any, graphModel: GraphModel);
    getData(): NodeData;
    get points(): PointTuple[];
    get pointsPosition(): Point[];
    get width(): number;
    get height(): number;
    get anchors(): Point[];
}
export { DiamondNodeModel };
export default DiamondNodeModel;
