import Block from '../../core/Block';
import NodeElement from './chat.hbs?raw';

export class ChatPage extends Block {
  protected render(): string {
    return NodeElement;
    return '<p>chat page</p>';
  }
}
