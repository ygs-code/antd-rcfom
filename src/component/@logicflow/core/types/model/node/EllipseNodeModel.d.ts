import { Point } from '../../type';
import BaseNodeModel from './BaseNodeModel';
import { ModelType } from '../../constant/constant';
import GraphModel from '../GraphModel';
declare class EllipseNodeModel extends BaseNodeModel {
    modelType: ModelType;
    rx: number;
    ry: number;
    constructor(data: any, graphModel: GraphModel);
    get width(): number;
    get height(): number;
    get anchors(): Point[];
}
export { EllipseNodeModel };
export default EllipseNodeModel;
