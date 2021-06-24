import { Point } from '../../type';
import BaseNodeModel from './BaseNodeModel';
import { ModelType } from '../../constant/constant';
import GraphModel from '../GraphModel';
declare class CircleNodeModel extends BaseNodeModel {
    modelType: ModelType;
    r: number;
    constructor(data: any, graphModel: GraphModel);
    get width(): number;
    get height(): number;
    get anchors(): Point[];
}
export { CircleNodeModel };
export default CircleNodeModel;
