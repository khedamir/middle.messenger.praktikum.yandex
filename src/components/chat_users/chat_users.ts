import { UserDTO } from '../../api/type';
import Block, { IProps } from '../../core/Block';
import { searchUsers } from '../../services/user';
import { connect } from '../../utils/connect';
import NodeElement from './chat_users.hbs?raw';
import * as validators from '../../utils/validators';
import { ChatInputField } from '..';

interface Props extends IProps {
  openDialogUsers: ChatUsers[];
  onCLick: (e: MouseEvent) => void;
  value: string;
  searchUsers: UserDTO[];
}

type Refs = {
  userName: ChatInputField;
};

class ChatUsers extends Block<Props, Refs> {
  constructor(props: Props) {
    super({
      ...props,
      validate: {
        message: validators.message,
      },
      onClick: (e: MouseEvent) => {
        e.preventDefault();
        const login = this.refs.userName.getValue()!;
        searchUsers({ login }).then((result) => this.setUsers(result));
      },
      searchUsers: [],
      value: '',
    });
  }

  public setUsers(users: UserDTO[]) {
    this.props.searchUsers = users;
  }

  protected render(): string {
    return NodeElement;
  }
}

export default connect(({ openDialogUsers }) => ({ openDialogUsers }))(
  ChatUsers,
);
