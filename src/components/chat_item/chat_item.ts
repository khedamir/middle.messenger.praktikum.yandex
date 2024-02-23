import { ChatDTO } from '../../api/type';
import Block, { IProps, RefType } from '../../core/Block';
import { getChatUsers } from '../../services/chat';
import { createWS } from '../../services/ws';
import { connect } from '../../utils/connect';
import { formatDate } from '../../utils/formatDate';
import NodeElement from './chat_item.hbs?raw';

interface Props extends IProps {
  chat: ChatDTO;
  setChat: () => void;
}

class ChatItem extends Block<Props, RefType> {
  constructor(props: Props) {
    super({
      ...props,
      chat: {
        ...props.chat,
        last_message: props.chat.last_message
          ? {
              ...props.chat.last_message,
              time: formatDate(props.chat.last_message.time),
            }
          : null,
      },
      setChat: () => {
        window.store.set({ openDialogChat: props.chat });
        window.store.set({ messages: [] });
        getChatUsers(props.chat.id).catch((error) => {
          alert(`Error :( \n ${error}`);
        });
        createWS(props.chat.id);
      },
    });
  }
  protected init(): void {
    if (this.props.setChat) {
      this.props.events = {
        click: this.props.setChat,
      };
    }
  }

  protected render(): string {
    return NodeElement;
  }
}

export default connect(({ openDialogChat }) => ({ openDialogChat }))(ChatItem);
