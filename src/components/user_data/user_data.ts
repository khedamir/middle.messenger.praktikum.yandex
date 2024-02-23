import { ErrorLine, InputField } from '..';
import Block, { IProps } from '../../core/Block';
import NodeElement from './user_data.hbs?raw';
import router from '../../core/navigate';
import { logout } from '../../services/auth';
import { connect } from '../../utils/connect';
import { UpdateUser, UserDTO } from '../../api/type';
import { updateAvatar, updateUser } from '../../services/user';
import * as validators from '../../utils/validators';

interface FileInputChangeEvent extends Event {
  target: HTMLInputElement & {
    files: FileList;
  };
}

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
  updateAvatar: (event: FileInputChangeEvent) => void;
  logout: () => void;
  toPasswordChange: () => void;
  onSubmit: (event: Event) => void;
}

class UserData extends Block<Props, Refs> {
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
      updateAvatar: (event: FileInputChangeEvent) => {
        const file = event.target?.files[0];
        updateAvatar(file).catch((error) => {
          this.refs.errorLine.setProps({ error_message: error });
          console.log('Update user avatar error', error);
        });
      },
      onSubmit: (event: Event) => {
        console.log('yes');
        event.preventDefault();
        this.submit();
      },
      logout: () => {
        logout();
      },
      toPasswordChange: () => {
        router.go('/change-password');
      },
    });
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

export default connect(({ user }) => ({ user }))(UserData);
