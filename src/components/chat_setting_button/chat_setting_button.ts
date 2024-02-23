import Block, { IProps, RefType } from '../../core/Block';

interface Props extends IProps {
  onClick?: (e: Event) => void;
}

export class ChatSettingButton extends Block<Props, RefType> {
  constructor(props: Props) {
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
    return `
    <div class='settings-button'>
        <img src='./svg/settings-icon.svg' alt='chat-settings' />
    </div>
    `;
  }
}
