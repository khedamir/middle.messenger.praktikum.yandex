import Block, { RefType } from '../../core/Block';
import NodeElement from './search.hbs?raw';

export class Search extends Block<object, RefType> {
  protected render(): string {
    return NodeElement;
  }
}
