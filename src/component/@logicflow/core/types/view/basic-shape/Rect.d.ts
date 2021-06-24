import { h } from 'preact';
import * as type from '../../type';
declare type IProps = {
    className?: string;
    radius?: number;
    stroke?: string;
    strokeDasharray?: string;
} & type.Point & type.Size;
declare function Rect(props: IProps): h.JSX.Element;
declare namespace Rect {
    var defaultProps: {
        radius: number;
        stroke: string;
        strokeDasharray: string;
        className: string;
    };
}
export default Rect;
