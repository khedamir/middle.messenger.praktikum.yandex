import Block from '../../core/Block';
import NodeElement from './chat_input.hbs?raw';
import * as validators from '../../utils/validators';
import { ChatInputField } from '..';

export class ChatInput extends Block<
  object,
  {
    message: ChatInputField;
  }
> {
  constructor() {
    super({
      validate: {
        message: validators.message,
      },
      send: (event: MouseEvent) => {
        event.preventDefault();
        const message = this.refs.message.getValue();
        if (message) {
          console.log('Текст сообщения:', message);
        }
      },
      value: '',
    });
  }

  protected render(): string {
    return NodeElement;
  }
}
