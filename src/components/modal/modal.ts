import Block, { IProps, RefType } from '../../core/Block';
import NodeElement from './modal.hbs?raw';

interface Props extends IProps {
  ref: string;
  title: string;
  active: boolean;
  createChat?: boolean;
  chatUsers?: boolean;
}

export class Modal extends Block<Props, RefType> {
  constructor(props: Props) {
    super({
      ...props,
      active: false,
      close: () => this.closeModal(),
    });
  }

  public closeModal() {
    this.props.active = false;
  }

  public openModal() {
    this.props.active = true;
  }

  protected render(): string {
    return NodeElement;
  }
}
