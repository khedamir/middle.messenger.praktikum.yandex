import Block from '../../core/Block';
import NodeElement from './message.hbs?raw';

export class Message extends Block {
  protected render(): string {
    return NodeElement;
  }
}
