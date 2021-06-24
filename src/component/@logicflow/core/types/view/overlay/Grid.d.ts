import { h, Component } from 'preact';
import GraphModel from '../../model/GraphModel';
export declare type GridOptions = {
    size?: number;
    visible?: boolean;
    graphModel?: GraphModel;
    type?: string;
    config?: {
        color: string;
        thickness?: number;
    };
};
declare type IProps = GridOptions;
export default class Grid extends Component<IProps> {
    readonly id: string;
    renderDot(): h.JSX.Element;
    renderMesh(): h.JSX.Element;
    render(): h.JSX.Element;
}
export {};
