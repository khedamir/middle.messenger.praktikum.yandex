import { Modal } from '..';
import { ChatDTO } from '../../api/type';
import Block from '../../core/Block';
import router from '../../core/navigate';
import { connect } from '../../utils/connect';
import NodeElement from './chats.hbs?raw';

interface Props {
  chats: ChatDTO[];
  searchChats: ChatDTO[];
  openDialogChat: ChatDTO;
  toProfile: () => void;
  createChat: () => void;
  search: (v: string) => void;
  isSearched: boolean;
}

type Refs = {
  modal: Modal;
};

class Chats extends Block<Props, Refs> {
  constructor(props: Props) {
    super({
      ...props,
      searchChats: [],
      isSearched: false,
      toProfile: () => {
        router.go('/settings');
      },
      createChat: () => {
        this.refs.modal.openModal();
      },
      search: (v: string) => {
        this.searchInChats(v);
      },
    });
  }

  public searchInChats(value: string) {
    if (!value) {
      this.props.searchChats = [];
      this.props.isSearched = false;
      return;
    }
    const result = this.props.chats.filter((item) =>
      item.title.includes(value),
    );
    this.props.searchChats = result;
    this.props.isSearched = result.length > 0;
  }
  protected render(): string {
    return NodeElement;
  }
}

export default connect(({ chats }) => ({ chats }))(Chats);
