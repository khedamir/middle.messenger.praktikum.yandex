import Block, { IProps } from '../../core/Block';
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

interface Props extends IProps {
  onLogin: (e: Event) => void;
}

export class LoginPage extends Block<Props, Refs> {
  constructor() {
    super({
      validate: {
        login: validators.login,
        password: validators.password,
      },
      onLogin: (event: Event) => {
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

  // componentDidMount(): void {
  //   const form = document.querySelector('form');
  //   form?.addEventListener('submit', () => this.props.onLogin);
  // }

  protected render() {
    return LoginComponent;
  }
}
