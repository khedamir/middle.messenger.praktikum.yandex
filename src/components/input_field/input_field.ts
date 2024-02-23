import Block, { IProps } from '../../core/Block';
import NodeElement from './input_field.hbs?raw';
import { Input } from '../input';
import { ErrorLine } from '../error_line';

interface InputFieldProps extends IProps {
  value: string;
  error: string;
  name: string;
  label: string;
  onChange: (e: Event) => void;
}

export class InputField extends Block<
  InputFieldProps,
  {
    input: Input;
    errorLine: ErrorLine;
  }
> {
  constructor(props: InputFieldProps) {
    super({
      ...props,
      onChange: () => {
        this.validate();
      },
      error: '',
      value: props.value ? props.value : '',
    });
  }

  public getValue() {
    if (!this.validate()) {
      return null;
    }
    return this.refs.input.element.value;
  }

  public clearValue() {
    this.refs.input.element.value = '';
  }

  private validate(): boolean {
    const value = this.refs.input.element.value;

    const error = this.props.validate?.(value);
    if (error) {
      this.refs.input.element.style.color = '#ce5a57';
      this.refs.errorLine.setProps({ error_message: error });
      return false;
    }
    this.refs.input.element.style.color = '#393939';
    this.refs.errorLine.setProps({ error_message: '' });
    return true;
  }
  protected render(): string {
    return NodeElement;
  }
}
