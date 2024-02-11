import Block from '../../core/Block';
import { navigate } from '../../core/navigate';
import LoginComponent from './login.hbs?raw';
import * as validators from '../../utils/validators';
import { InputField } from '../../components';

export class LoginPage extends Block<
  object,
  {
    login: InputField;
    password: InputField;
  }
> {
  constructor() {
    super({
      validate: {
        login: validators.login,
        password: validators.password,
      },
      onLogin: (event: MouseEvent) => {
        event.preventDefault();
        const login = this.refs.login.getValue();
        const password = this.refs.password.getValue();
        if (!login || !password) {
          console.log(!login && !password);
          return;
        }
        console.log(login, password);
        navigate('chat');
      },
      toRegister: () => {
        navigate('register');
      },
    });
  }

  protected render() {
    return LoginComponent;
  }
}
