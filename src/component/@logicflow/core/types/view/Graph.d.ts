import { Component, h } from 'preact';
import GraphModel from '../model/GraphModel';
import Tool from '../tool';
import * as Options from '../options';
import EventEmitter from '../event/eventEmitter';
import DnD from './behavior/DnD';
import BaseEdgeModel from '../model/edge/BaseEdgeModel';
import BaseNodeModel from '../model/node/BaseNodeModel';
import SnaplineModel from '../model/SnaplineModel';
declare type IProps = {
    getView: (type: string) => typeof Component;
    tool: Tool;
    options: Options.Definition;
    eventCenter: EventEmitter;
    dnd: DnD;
    snaplineModel: SnaplineModel;
    components: any;
};
declare type InjectedProps = IProps & {
    graphModel: GraphModel;
};
declare class Graph extends Component<IProps> {
    get InjectedProps(): InjectedProps;
    getComponent(model: BaseEdgeModel | BaseNodeModel, graphModel: GraphModel, eventCenter: EventEmitter, overlay?: string): h.JSX.Element;
    render(): h.JSX.Element;
}
export default Graph;
