import { Modal } from '..';
import Block from '../../core/Block';
import { deleteChat } from '../../services/chat';
import NodeElement from './chat_settings.hbs?raw';

interface Props {
  active: boolean;
  onClick: () => void;
  openChatUsers: () => void;
  deleteChat: () => void;
}

type Refs = {
  modal: Modal;
};

export class ChatSettings extends Block<Props, Refs> {
  constructor(props: Props) {
    super({
      ...props,
      active: false,
      onClick: () => this.setActive(),
      openChatUsers: () => {
        this.refs.modal.openModal();
      },
      deleteChat: () => {
        const data: { chatId: number } = {
          chatId: window.store.getState().openDialogChat!.id,
        };
        deleteChat(data).catch((error) => {
          alert(`Error :( \n ${error}`);
        });
      },
    });
  }

  public setActive() {
    this.props.active = !this.props.active;
  }
  protected render(): string {
    return NodeElement;
  }
}
