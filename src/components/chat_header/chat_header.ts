import Block, { RefType } from '../../core/Block';
import NodeElement from './chat_header.hbs?raw';

export class ChatHeader extends Block<object, RefType> {
  protected render(): string {
    return NodeElement;
  }
}
