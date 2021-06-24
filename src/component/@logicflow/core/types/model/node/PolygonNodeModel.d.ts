import { Point, PointTuple } from '../../type';
import BaseNodeModel from './BaseNodeModel';
import { ModelType } from '../../constant/constant';
import GraphModel from '../GraphModel';
declare class PolygonNodeModel extends BaseNodeModel {
    modelType: ModelType;
    points: PointTuple[];
    constructor(data: any, graphModel: GraphModel);
    get pointsPosition(): Point[];
    get width(): number;
    get height(): number;
    get anchors(): Point[];
}
export { PolygonNodeModel };
export default PolygonNodeModel;
