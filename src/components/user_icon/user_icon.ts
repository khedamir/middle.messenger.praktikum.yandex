import Block, { RefType } from '../../core/Block';
import NodeElement from './user_icon.hbs?raw';

export class UserIcon extends Block<object, RefType> {
  protected render(): string {
    return NodeElement;
  }
}
