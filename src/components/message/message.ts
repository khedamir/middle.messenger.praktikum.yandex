import { MessageDTO } from '../../api/type';
import Block, { IProps, RefType } from '../../core/Block';
import { formatDate } from '../../utils/formatDate';
import NodeElement from './message.hbs?raw';

interface Props extends IProps {
  message: MessageDTO;
}

export class Message extends Block<Props, RefType> {
  constructor(props: Props) {
    super({
      message: {
        ...props.message,
        time: formatDate(props.message.time),
      },
    });
  }
  protected render(): string {
    return NodeElement;
  }
}
