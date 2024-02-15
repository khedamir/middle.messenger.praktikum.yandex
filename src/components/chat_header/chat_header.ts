import Block, { RefType } from '../../core/Block';
import NodeElement from './chat_header.hbs?raw';

interface Props {
  title: string;
  avatar: string;
}

export class ChatHeader extends Block<Props, RefType> {
  constructor(props: Props) {
    super(props);
  }
  protected render(): string {
    return NodeElement;
  }
}
