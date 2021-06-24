import { ModelType } from '../../constant/constant';
import { Point } from '../../type';
import BaseEdgeModel from './BaseEdgeModel';
import GraphModel from '../GraphModel';
export { PolylineEdgeModel };
export default class PolylineEdgeModel extends BaseEdgeModel {
    modelType: ModelType;
    offset: number;
    draginngPointList: any;
    dbClickPosition: Point;
    constructor(data: any, graphModel: GraphModel);
    get textPosition(): Point;
    getAfterAnchor(direction: any, position: any, anchorList: any): any;
    getCorssPoint(direction: any, start: any, end: any): any;
    removeCrossPoints(startIndex: any, endIndex: any, pointList: any): any;
    getDragingPoints(direction: any, positioType: any, position: any, anchorList: any, draginngPointList: any): any;
    updateCrossPoints(pointList: any): any;
    getData(): import("../../type").EdgeData & {
        pointsList: {
            x: any;
            y: any;
        }[];
    };
    initPoints(): void;
    updatePoints(): void;
    updateStartPoint(anchor: any): void;
    updateEndPoint(anchor: any): void;
    dragAppendStart(): void;
    dragAppend(appendInfo: any, dragInfo: any): {
        start: any;
        end: any;
        startIndex: any;
        endIndex: any;
        direction: any;
    };
    dragAppendEnd(): void;
    updatePointsAfterDrage(pointsList: any): void;
}
