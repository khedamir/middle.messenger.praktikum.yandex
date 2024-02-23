import { ErrorLine, InputField } from '../../components';
import Block from '../../core/Block';
import NodeElement from './register.hbs?raw';
import * as validators from '../../utils/validators';
import router from '../../core/navigate';
import { CreateUser } from '../../api/type';
import { signup } from '../../services/auth';

type Refs = {
  email: InputField;
  login: InputField;
  first_name: InputField;
  second_name: InputField;
  phone: InputField;
  password: InputField;
  errorLine: ErrorLine;
};

export class RegisterPage extends Block<object, Refs> {
  constructor() {
    super({
      validate: {
        email: validators.email,
        login: validators.login,
        first_name: validators.name,
        second_name: validators.name,
        phone: validators.phone,
        password: validators.password,
      },
      onRegister: (event: MouseEvent) => {
        event.preventDefault();
        const newUser: CreateUser = {
          login: this.refs.login.getValue()!,
          first_name: this.refs.first_name.getValue()!,
          second_name: this.refs.second_name.getValue()!,
          email: this.refs.email.getValue()!,
          phone: this.refs.phone.getValue()!,
          password: this.refs.password.getValue()!,
        };

        signup(newUser).catch((error) => {
          this.refs.errorLine.setProps({ error_message: error });
          console.log('error', error);
        });
      },
      toLogin: () => {
        router.go('/');
      },
    });
  }
  protected render(): string {
    return NodeElement;
  }
}
