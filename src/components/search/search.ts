import Block from '../../core/Block';
import NodeElement from './search.hbs?raw';

export class Search extends Block {
  protected render(): string {
    return NodeElement;
  }
}
