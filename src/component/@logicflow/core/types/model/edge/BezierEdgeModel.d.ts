import BaseEdgeModel from './BaseEdgeModel';
import { Point } from '../../type';
import { ModelType } from '../../constant/constant';
export { BezierEdgeModel };
export default class BezierEdgeModel extends BaseEdgeModel {
    modelType: ModelType;
    offset: number;
    path: string;
    constructor(data: any, graphModel: any);
    get textPosition(): Point;
    getData(): {
        pointsList: {
            x: any;
            y: any;
        }[];
        id: string;
        type: string;
        sourceNodeId: string;
        startPoint: Point;
        targetNodeId: string;
        endPoint: Point;
        text?: import("../../type").TextConfig;
        properties: Record<string, unknown>;
    };
    private getControls;
    private getPath;
    initPoints(): void;
    updatePoints(): void;
    updateStartPoint(anchor: any): void;
    updateEndPoint(anchor: any): void;
    updateAdjustAnchor(anchor: Point, type: string): void;
}
