import { h } from 'preact';
import BaseNode from './BaseNode';
export default class TextNode extends BaseNode {
    getShape(): h.JSX.Element;
}
