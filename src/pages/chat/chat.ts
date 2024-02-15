import Block, { RefType } from '../../core/Block';
import { initChatPage } from '../../services/initApp';
import NodeElement from './chat.hbs?raw';

export class ChatPage extends Block<object, RefType> {
  constructor() {
    super();
    initChatPage();
  }
  protected render(): string {
    return NodeElement;
  }
}
