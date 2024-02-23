import Block, { IProps, RefType } from '../../core/Block';
import NodeElement from './button.hbs?raw';

interface ButtonProps extends IProps {
  classes: string;
  label: string;
  type?: string;
  onClick?: (e: Event) => void;
}

export class Button extends Block<ButtonProps, RefType> {
  constructor(props: ButtonProps) {
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
