import Block, { RefType } from '../../core/Block';
import NodeElement from './password.hbs?raw';

export class PasswordPage extends Block<object, RefType> {
  protected render(): string {
    return NodeElement;
  }
}
