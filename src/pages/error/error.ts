import Block from '../../core/Block';
import NodeElement from './error.hbs?raw';

export class ErrorPage extends Block {
  protected render(): string {
    return '<p>error page/p>';
    // return LoginComponent;
  }
}
