import BaseNodeModel from './BaseNodeModel';
import { ModelType } from '../../constant/constant';
import GraphModel from '../GraphModel';
declare class TextNodeModel extends BaseNodeModel {
    modelType: ModelType;
    fontSize: number;
    fontFamily: string;
    fontWeight: string;
    constructor(data: any, graphModel: GraphModel);
    get width(): number;
    get height(): number;
}
export { TextNodeModel };
export default TextNodeModel;
