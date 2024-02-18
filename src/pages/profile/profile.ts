import Block, { RefType } from '../../core/Block';
import router from '../../core/navigate';
import NodeElement from './profile.hbs?raw';

export class ProfilePage extends Block<object, RefType> {
  constructor() {
    super({
      back: () => {
        router.go('/messenger');
      },
    });
  }
  protected render(): string {
    return NodeElement;
  }
}
