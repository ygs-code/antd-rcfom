import BaseEdgeModel from './BaseEdgeModel';
import { Point } from '../../type';
import { ModelType } from '../../constant/constant';
export { LineEdgeModel };
export default class LineEdgeModel extends BaseEdgeModel {
    modelType: ModelType;
    constructor(data: any, graphModel: any);
    get textPosition(): Point;
}
