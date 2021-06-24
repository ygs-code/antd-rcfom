/**
 * HtmlOverlay和CanvasOverlay放大，缩小，平移保持一致。
 * 但是这里是放的是HTML标签而不是SVG。
 * 目前这里可以放文本。
 * 之后可以考虑放图片，范围框等。
 */
import { h } from 'preact';
import GraphModel from '../../model/GraphModel';
import { GraphTransform } from '../../type';
declare type IProps = {
    graphModel: GraphModel;
};
declare const _default: {
    new (props?: {
        graphModel: GraphModel;
    } & IProps, context?: any): {
        getMatrixString(): GraphTransform;
        render(): h.JSX.Element;
        componentWillMount?(): void;
        componentDidMount?(): void;
        componentWillUnmount?(): void;
        getChildContext?(): object;
        componentWillReceiveProps?(nextProps: Readonly<{
            graphModel: GraphModel;
        } & IProps>, nextContext: any): void;
        shouldComponentUpdate?(nextProps: Readonly<{
            graphModel: GraphModel;
        } & IProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUpdate?(nextProps: Readonly<{
            graphModel: GraphModel;
        } & IProps>, nextState: Readonly<{}>, nextContext: any): void;
        getSnapshotBeforeUpdate?(oldProps: Readonly<{
            graphModel: GraphModel;
        } & IProps>, oldState: Readonly<{}>): any;
        componentDidUpdate?(previousProps: Readonly<{
            graphModel: GraphModel;
        } & IProps>, previousState: Readonly<{}>, snapshot: any): void;
        componentDidCatch?(error: any, errorInfo: any): void;
        state: Readonly<{}>;
        props: import("preact").RenderableProps<{
            graphModel: GraphModel;
        } & IProps, any>;
        context: any;
        base?: Element | Text;
        setState<K extends never>(state: Partial<{}> | ((prevState: Readonly<{}>, props: Readonly<{
            graphModel: GraphModel;
        } & IProps>) => Partial<{}> | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
    };
    displayName?: string;
    defaultProps?: any;
    contextType?: import("preact").Context<any>;
    getDerivedStateFromProps?(props: object, state: object): object;
    getDerivedStateFromError?(error: any): object;
};
export default _default;
