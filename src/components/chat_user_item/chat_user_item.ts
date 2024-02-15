import { ChangeChatUsers, ChatUser } from '../../api/type';
import Block, { IProps, RefType } from '../../core/Block';
import { deleteUsers } from '../../services/chat';
import NodeElement from './chat_user_item.hbs?raw';

interface Props extends IProps {
  user: ChatUser;
  deleteUser: () => void;
  isNotAdmin: boolean;
}

export class ChatUserItem extends Block<Props, RefType> {
  constructor(props: Props) {
    super({
      ...props,
      isNotAdmin: props.user.role !== 'admin',

      deleteUser: () => {
        const data: ChangeChatUsers = {
          users: [props.user.id],
          chatId: window.store.getState().openDialogChat!.id,
        };
        deleteUsers(data).then(() => {
          const users = window.store
            .getState()
            .openDialogUsers.filter((item) => item.id !== props.user.id);
          window.store.set({ openDialogUsers: users });
        });
      },
    });
  }

  protected render(): string {
    return NodeElement;
  }
}
