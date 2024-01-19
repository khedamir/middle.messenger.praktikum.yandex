import Block from '../../core/Block';
import NodeElement from './chat_header.hbs?raw';

export class ChatHeader extends Block {
  protected render(): string {
    return NodeElement;
  }
}
