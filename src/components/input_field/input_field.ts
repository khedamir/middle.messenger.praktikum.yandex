import Block, { IProps } from '../../core/Block';
import NodeElement from './input_field.hbs?raw';
import { Input } from '../input';
import { ErrorLine } from '../error_line';

interface InputFieldProps extends IProps {
  value: string;
  error: string;
  name: string;
  label: string;
  onBlur: () => boolean;
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
      onBlur: () => this.validate(),
      onChange: (e) => this.setValue(e),
      error: '',
      value: props.value ? props.value : '',
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

  public clearValue() {
    this.props.value = '';
  }

  private validate(): boolean {
    const value = this.refs.input.element.value;

    const error = this.props.validate?.(value);
    if (error) {
      this.props.error = 'error';
      this.refs.errorLine.setProps({ error_message: error });
      return false;
    }
    this.props.error = '';
    this.refs.errorLine.setProps({ error_message: '' });
    return true;
  }
  protected render(): string {
    return NodeElement;
  }
}
