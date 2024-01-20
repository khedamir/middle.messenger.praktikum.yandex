import Block, { RefType } from '../../core/Block';
import NodeElement from './profile.hbs?raw';

export class ProfilePage extends Block<object, RefType> {
  protected render(): string {
    return NodeElement;
  }
}
