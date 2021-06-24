import { Point } from '../../type';
import BaseNodeModel from './BaseNodeModel';
import { ModelType } from '../../constant/constant';
import GraphModel from '../GraphModel';
declare class RectNodeModel extends BaseNodeModel {
    modelType: ModelType;
    radius: number;
    constructor(data: any, graphModel: GraphModel);
    get anchors(): Point[];
}
export { RectNodeModel };
export default RectNodeModel;
