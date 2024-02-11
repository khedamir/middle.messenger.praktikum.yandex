import Block, { IProps, RefType } from '../../core/Block';
import NodeElement from './chat_input_button.hbs?raw';

interface ChatInputButtonProps extends IProps {
  onClick?: (e: Event) => void;
}

export class ChatInputButton extends Block<ChatInputButtonProps, RefType> {
  constructor(props: ChatInputButtonProps) {
    super(props);
  }

  protected init(): void {
    if (this.props.onClick) {
      this.props.events = {
        click: this.props.onClick,
      };
    }
  }

  protected render(): string {
    return NodeElement;
  }
}
