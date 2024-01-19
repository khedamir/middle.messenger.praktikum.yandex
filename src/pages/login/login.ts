import Block from '../../core/Block';
import { navigate } from '../../core/navigate';
import LoginComponent from './login.hbs?raw';

export class LoginPage extends Block {
  constructor() {
    super({
      onLogin: (event: MouseEvent) => {
        console.log('hi');
        event.preventDefault();
        navigate('chat');
      },
    });
  }
  protected render() {
    return LoginComponent;
  }
}
