import { InputField } from '..';
import Block from '../../core/Block';
import NodeElement from './user_data.hbs?raw';
import * as validators from '../../utils/validators';
import router from '../../core/navigate';
import { logout } from '../../services/auth';
import { connect } from '../../utils/connect';
import { UpdateUser, UserDTO } from '../../api/type';
import { updateAvatar, updateUser } from '../../services/user';

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
};

interface Props {
  user: UserDTO;
  validate: object;
  onSave: (event: MouseEvent) => void;
  updateAvatar: (event: FileInputChangeEvent) => void;
  logout: () => void;
  toPasswordChange: () => void;
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
      onSave: (event: MouseEvent) => {
        event.preventDefault();
        const userData: UpdateUser = {
          first_name: this.refs.first_name.getValue()!,
          second_name: this.refs.second_name.getValue()!,
          phone: this.refs.phone.getValue()!,
          email: this.refs.email.getValue()!,
          login: this.refs.login.getValue()!,
          display_name: this.refs.display_name.getValue()!,
        };

        updateUser(userData);
      },
      updateAvatar: (event: FileInputChangeEvent) => {
        const file = event.target?.files[0];
        updateAvatar(file).then((result) => {
          window.store.set({ user: result });
        });
      },
      logout: () => {
        logout();
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

export default connect(({ user }) => ({ user }))(UserData);
