import Block, { RefType } from '../../core/Block';
import NodeElement from './chat.hbs?raw';

export class ChatPage extends Block<object, RefType> {
  protected render(): string {
    return NodeElement;
  }
}
