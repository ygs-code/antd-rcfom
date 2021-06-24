import { h } from 'preact';
declare type IProps = {
    d: string;
    strokeWidth: number;
    stroke: string;
    fill: string;
    strokeDasharray?: string;
};
declare function Path(props: IProps): h.JSX.Element;
declare namespace Path {
    var defaultProps: {
        strokeDasharray: string;
    };
}
export default Path;
