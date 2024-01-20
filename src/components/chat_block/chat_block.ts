import Block, { RefType } from '../../core/Block';
import NodeElement from './chat_block.hbs?raw';

export class ChatBlock extends Block<object, RefType> {
  protected render(): string {
    return NodeElement;
  }
}
