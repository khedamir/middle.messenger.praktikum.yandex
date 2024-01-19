import Block from '../../core/Block';
import NodeElement from './password_change.hbs?raw';

export class PasswordChange extends Block {
  protected render(): string {
    return NodeElement;
  }
}
