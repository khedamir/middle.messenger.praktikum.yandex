import Block from '../../core/Block';
import NodeElement from './messages.hbs?raw';

export class Messages extends Block {
  protected render(): string {
    return NodeElement;
  }
}
