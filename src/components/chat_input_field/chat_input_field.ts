import Block, { IProps } from '../../core/Block';
import NodeElement from './chat_input_field.hbs?raw';
import { Input } from '../input';

interface ChatInputFieldProps extends IProps {
  value: string;
  onBlur: () => boolean;
  onChange: (e: Event) => void;
}

export class ChatInputField extends Block<
  ChatInputFieldProps,
  {
    input: Input;
  }
> {
  constructor(props: ChatInputFieldProps) {
    super({
      ...props,
      onBlur: () => this.validate(),
      onChange: (e) => this.setValue(e),
      value: '',
    });
  }

  public getValue() {
    if (!this.validate()) {
      return null;
    }
    return this.props.value;
  }

  public setValue(e: Event) {
    const target = e.target as HTMLInputElement;
    this.props.value = target.value;
  }

  private validate(): boolean {
    const value = this.props.value;

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
