import { InputField } from '../../components';
import Block from '../../core/Block';
import NodeElement from './register.hbs?raw';
import * as validators from '../../utils/validators';
import router from '../../core/navigate';

type Refs = {
  email: InputField;
  login: InputField;
  first_name: InputField;
  second_name: InputField;
  phone: InputField;
  password: InputField;
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
        const email = this.refs.email.getValue();
        const login = this.refs.login.getValue();
        const first_name = this.refs.first_name.getValue();
        const second_name = this.refs.second_name.getValue();
        const phone = this.refs.phone.getValue();
        const password = this.refs.password.getValue();
        if (
          !login ||
          !password ||
          !email ||
          !first_name ||
          !second_name ||
          !phone
        ) {
          return;
        }
        console.log(login, password, email, first_name, second_name, phone);
        router.go('/');
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
