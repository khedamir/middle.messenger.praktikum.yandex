import { MessageDTO } from '../../api/type';
import Block, { IProps, RefType } from '../../core/Block';
import { connect } from '../../utils/connect';
import NodeElement from './messages.hbs?raw';

interface Props extends IProps {
  messages: MessageDTO[];
}

class Messages extends Block<Props, RefType> {
  constructor(props: Props) {
    super(props);
  }
  protected render(): string {
    return NodeElement;
  }
}

export default connect(({ messages }) => ({ messages }))(Messages);
