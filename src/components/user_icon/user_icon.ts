import Block from '../../core/Block';
import NodeElement from './user_icon.hbs?raw';

export class UserIcon extends Block {
  protected render(): string {
    return NodeElement;
  }
}
