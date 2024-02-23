import { ChatDTO } from '../../api/type';
import Block, { RefType } from '../../core/Block';
import { connect } from '../../utils/connect';
import NodeElement from './chat_block.hbs?raw';

interface Props {
  openDialogChat: ChatDTO;
}

class ChatBlock extends Block<Props, RefType> {
  constructor(props: Props) {
    super(props);
  }
  protected render(): string {
    return NodeElement;
  }
}

export default connect(({ openDialogChat }) => ({ openDialogChat }))(ChatBlock);
