import Block from '../../core/Block';
import NodeElement from './chat_item.hbs?raw';

export class ChatItem extends Block {
  protected render(): string {
    return NodeElement;
  }
}
