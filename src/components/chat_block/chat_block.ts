import Block from '../../core/Block';
import NodeElement from './chat_block.hbs?raw';

export class ChatBlock extends Block {
  protected render(): string {
    return NodeElement;
  }
}
