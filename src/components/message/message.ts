import Block, { RefType } from '../../core/Block';
import NodeElement from './message.hbs?raw';

export class Message extends Block<object, RefType> {
  protected render(): string {
    return NodeElement;
  }
}
