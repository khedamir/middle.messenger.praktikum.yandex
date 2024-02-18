import Block, { IProps, RefType } from '../../core/Block';
import NodeElement from './profile_back_button.hbs?raw';

interface ProfileBackButtonProps extends IProps {
  onClick?: (e: Event) => void;
}

export class ProfileBackButton extends Block<ProfileBackButtonProps, RefType> {
  constructor(props: ProfileBackButtonProps) {
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
