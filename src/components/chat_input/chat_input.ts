import Block from '../../core/Block';
import NodeElement from './chat_input.hbs?raw';

export class ChatInput extends Block {
  protected render(): string {
    return NodeElement;
  }
}
