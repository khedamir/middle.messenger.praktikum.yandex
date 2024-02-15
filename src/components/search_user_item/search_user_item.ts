import { ChangeChatUsers, UserDTO } from '../../api/type';
import Block, { IProps, RefType } from '../../core/Block';
import { addUsers } from '../../services/chat';
import NodeElement from './search_user_item.hbs?raw';

interface Props extends IProps {
  user: UserDTO;
  isNotAdded: boolean;
  addUser: () => void;
}

export class SearchUserItem extends Block<Props, RefType> {
  constructor(props: Props) {
    super({
      ...props,
      isNotAdded: false,
      addUser: () => {
        const data: ChangeChatUsers = {
          users: [props.user.id],
          chatId: window.store.getState().openDialogChat!.id,
        };
        addUsers(data).then(() => {
          const users = window.store.getState().openDialogUsers;
          window.store.set({
            openDialogUsers: [{ ...props.user, role: 'regular' }, ...users],
          });
        });
      },
    });
  }

  protected init(): void {
    this.props.isNotAdded = this.userIsAdded();
  }

  public userIsAdded(): boolean {
    const addedUsers = window.store.getState().openDialogUsers;
    const searchUser = addedUsers.find(
      (item) => item.id === this.props.user.id,
    );

    return searchUser ? false : true;
  }

  protected render(): string {
    return NodeElement;
  }
}
