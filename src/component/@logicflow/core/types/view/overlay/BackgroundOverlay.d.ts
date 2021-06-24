import { h, Component } from 'preact';
export declare type BackgroundConfig = {
    image?: string;
    color?: string;
    repeat?: string;
    position?: string;
    size?: string;
    opacity?: number;
};
declare type IProps = {
    background: BackgroundConfig;
};
export default class BackgroundOverlay extends Component<IProps> {
    getAttributes(): {
        color: string;
        opacity: number;
        image: string;
        repeat?: undefined;
        position?: undefined;
        size?: undefined;
    } | {
        image: string;
        repeat: string;
        position: string;
        size: string;
        opacity: number;
        color?: undefined;
    } | {
        color?: undefined;
        opacity?: undefined;
        image?: undefined;
        repeat?: undefined;
        position?: undefined;
        size?: undefined;
    };
    getShape(): h.JSX.Element;
    render(): h.JSX.Element;
}
export {};
