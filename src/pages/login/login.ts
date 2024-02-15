import Block from '../../core/Block';
import router from '../../core/navigate';
import LoginComponent from './login.hbs?raw';
import * as validators from '../../utils/validators';
import { ErrorLine, InputField } from '../../components';
import { signin } from '../../services/auth';

type Refs = {
  login: InputField;
  password: InputField;
  errorLine: ErrorLine;
};

export class LoginPage extends Block<object, Refs> {
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
          return;
        }
        signin({
          login,
          password,
        }).catch((error) => {
          this.refs.errorLine.setProps({ error_message: error });
          console.log('login error', error);
        });
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
