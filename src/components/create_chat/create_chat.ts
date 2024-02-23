import { ChatInputField } from '..';
import Block, { IProps } from '../../core/Block';
import { createChat } from '../../services/chat';
import NodeElement from './create_chat.hbs?raw';
import * as validators from '../../utils/validators';

interface Props extends IProps {
  value: string;
  onClick: (e: MouseEvent) => void;
}

type Refs = {
  chatName: ChatInputField;
};

export class CreateChat extends Block<Props, Refs> {
  constructor(props: Props) {
    super({
      ...props,
      validate: {
        message: validators.message,
      },
      onClick: (e: MouseEvent) => {
        e.preventDefault();
        const name = this.refs.chatName.getValue()!;
        console.log('value:', name);
        createChat(name).catch((error) => {
          alert(`Error :( \n ${error}`);
        });
      },
      value: '',
    });
  }

  protected render(): string {
    return NodeElement;
  }
}
