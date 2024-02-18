import { ErrorLine, InputField } from '..';
import Block from '../../core/Block';
import NodeElement from './user_data.hbs?raw';
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
  errorLine: ErrorLine;
};

interface Props {
  user: UserDTO;
  updateAvatar: (event: FileInputChangeEvent) => void;
  logout: () => void;
  toPasswordChange: () => void;
}

class UserData extends Block<Props, Refs> {
  constructor(props: Props) {
    super({
      ...props,
      updateAvatar: (event: FileInputChangeEvent) => {
        const file = event.target?.files[0];
        updateAvatar(file).catch((error) => {
          this.refs.errorLine.setProps({ error_message: error });
          console.log('Update user avatar error', error);
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
