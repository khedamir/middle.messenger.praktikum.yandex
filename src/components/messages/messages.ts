import Block, { RefType } from '../../core/Block';
import NodeElement from './messages.hbs?raw';

export class Messages extends Block<object, RefType> {
  protected render(): string {
    return NodeElement;
  }
}
