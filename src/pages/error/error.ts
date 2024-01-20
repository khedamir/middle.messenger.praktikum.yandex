import Block, { RefType } from '../../core/Block';
import NodeElement from './error.hbs?raw';

export class ErrorPage extends Block<object, RefType> {
  protected render(): string {
    return NodeElement;
  }
}
