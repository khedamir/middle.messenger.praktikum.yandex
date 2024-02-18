import { ErrorLine, InputField } from '..';
import { UpdateUser, UserDTO } from '../../api/type';
import Block, { IProps } from '../../core/Block';
import { updateUser } from '../../services/user';
import NodeElement from './user_data_form.hbs?raw';
import * as validators from '../../utils/validators';

type Refs = {
  first_name: InputField;
  second_name: InputField;
  phone: InputField;
  email: InputField;
  login: InputField;
  display_name: InputField;
  errorLine: ErrorLine;
};

interface Props extends IProps {
  user: UserDTO;
  validate: object;
  onSave: (event: MouseEvent) => void;
  onSubmit: (event: Event) => void;
}

export class UserDataForm extends Block<Props, Refs> {
  constructor(props: Props) {
    super({
      ...props,
      validate: {
        first_name: validators.name,
        second_name: validators.name,
        phone: validators.phone,
        email: validators.email,
        login: validators.login,
        display_name: validators.name,
      },

      onSubmit: (event: Event) => {
        event.preventDefault();
        this.submit();
      },
    });
  }

  protected init(): void {
    if (this.props.onSubmit) {
      this.props.events = {
        onsubmit: this.props.onSubmit,
      };
    }
  }

  public submit() {
    const userData: UpdateUser = {
      first_name: this.refs.first_name.getValue()!,
      second_name: this.refs.second_name.getValue()!,
      phone: this.refs.phone.getValue()!,
      email: this.refs.email.getValue()!,
      login: this.refs.login.getValue()!,
      display_name: this.refs.display_name.getValue()!,
    };

    updateUser(userData).catch((error) => {
      this.refs.errorLine.setProps({ error_message: error });
      console.log('Update user data error', error);
    });
  }
  protected render(): string {
    return NodeElement;
  }
}
