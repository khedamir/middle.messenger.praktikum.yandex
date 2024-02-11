import Block from '../../core/Block';
import router from '../../core/navigate';
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
        router.go('/messenger');
      },
      toRegister: () => {
        router.go('/sign-up');
      },
    });
  }

  protected render() {
    return LoginComponent;
  }
}
