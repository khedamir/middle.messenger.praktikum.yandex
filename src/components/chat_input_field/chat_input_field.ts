import Block, { IProps } from '../../core/Block';
import NodeElement from './chat_input_field.hbs?raw';
import { Input } from '../input';

interface Props extends IProps {
  value: string;
  name: string;
  placeholder: string;
  onChange: (e: Event) => void;
}

export class ChatInputField extends Block<
  Props,
  {
    message: Input;
  }
> {
  constructor(props: Props) {
    super({
      ...props,
      onChange: () => {
        this.validate();
      },
      value: '',
    });
  }

  public getValue() {
    return this.refs.message.element.value;
  }

  public clearValue() {
    this.refs.message.element.value = '';
  }

  private validate(): boolean {
    const value = this.refs.message.element.value;

    const error = this.props.validate?.(value);
    if (error) {
      return false;
    }
    return true;
  }
  protected render(): string {
    return NodeElement;
  }
}
