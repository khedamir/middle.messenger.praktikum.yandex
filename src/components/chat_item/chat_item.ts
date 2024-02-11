import Block, { RefType } from '../../core/Block';
import NodeElement from './chat_item.hbs?raw';

export class ChatItem extends Block<object, RefType> {
  protected render(): string {
    return NodeElement;
  }
}
