import BaseNode from '../model/node/BaseNodeModel';
import { Point, Direction, NodeConfig } from '../type';
export declare const getAnchors: (data: any) => Point[];
declare type NodeContaint = {
    node: BaseNode;
    anchorIndex: number;
    anchorPosition: Point;
};
export declare const targetNodeInfo: (position: Point, nodes: BaseNode[]) => NodeContaint;
export declare const distance: (x1: number, y1: number, x2: number, y2: number) => number;
export declare const isInNode: (position: Point, node: BaseNode) => boolean;
export declare const isInNodeBbox: (position: Point, node: any) => boolean;
export declare type NodeBBox = {
    x: number;
    y: number;
    width: number;
    height: number;
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    centerX: number;
    centerY: number;
};
export declare const getNodeBBox: (node: BaseNode) => NodeBBox;
declare type RadiusCircle = {
    x: number;
    y: number;
    r: number;
};
export declare const getRectRadiusCircle: (node: BaseNode) => RadiusCircle[];
export declare const getClosestRadiusCenter: (point: Point, direction: Direction, node: BaseNode) => Point;
export declare const getCrossPointWithCircle: (point: Point, direction: Direction, node: BaseNode) => Point;
export declare const pointEdgeDirection: (point: Point, node: BaseNode) => Direction;
export declare const inStraightLineOfRect: (point: Point, node: BaseNode) => boolean;
export declare const getCrossPointWithEllipse: (point: Point, direction: Direction, node: BaseNode) => any;
export declare const getCrossPointWithPolyone: (point: Point, direction: Direction, node: BaseNode) => Point;
export declare const pickNodeConfig: (data: any) => NodeConfig;
/**
 * 基于节点的边，重新获取新的节点
 */
export declare const getNodeAnchorPosition: (center: any, point: any, width: any, height: any) => {
    x: any;
    y: any;
};
export {};
