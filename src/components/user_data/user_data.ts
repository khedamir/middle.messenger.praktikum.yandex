import { InputField } from '..';
import Block from '../../core/Block';
import NodeElement from './user_data.hbs?raw';
import * as validators from '../../utils/validators';
import router from '../../core/navigate';

export class UserData extends Block<
  object,
  {
    first_name: InputField;
    second_name: InputField;
    phone: InputField;
    email: InputField;
    login: InputField;
    display_name: InputField;
  }
> {
  constructor() {
    super({
      validate: {
        first_name: validators.name,
        second_name: validators.name,
        phone: validators.phone,
        email: validators.email,
        login: validators.login,
        display_name: validators.name,
      },
      onSave: (event: MouseEvent) => {
        event.preventDefault();
        const first_name = this.refs.first_name.getValue();
        const second_name = this.refs.second_name.getValue();
        const phone = this.refs.phone.getValue();
        const email = this.refs.email.getValue();
        const login = this.refs.login.getValue();
        const display_name = this.refs.display_name.getValue();
        if (
          !first_name ||
          !second_name ||
          !phone ||
          !login ||
          !email ||
          !display_name
        ) {
          return;
        }
        console.log(first_name, second_name, phone, login, email, display_name);
      },
      logout: () => {
        router.go('/');
      },
      toPasswordChange: () => {
        router.go('/change-password');
      },
    });
  }
  protected render(): string {
    return NodeElement;
  }
}
