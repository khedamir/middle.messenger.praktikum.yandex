import Block from '../../core/Block';
import NodeElement from './user_data.hbs?raw';

export class UserData extends Block {
  protected render(): string {
    return NodeElement;
  }
}
