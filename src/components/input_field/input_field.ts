import Block, { RefType } from '../../core/Block';
import NodeElement from './input_field.hbs?raw';

export class InputField extends Block<object, RefType> {
  constructor() {
    super({
      onBlur: () => this.validate(),
    });
  }

  public value() {
    if (!this.validate()) {
      return null;
    }

    return this.refs.input.element.value;
  }

  private validate() {
    const value = this.refs.input.element.value;
    const error = this.props.validate?.(value);
    if (error) {
      this.refs.errorLine.setProps({ error });
      return false;
    }
    this.refs.errorLine.setProps({ error: undefined });
    return true;
  }
  protected render(): string {
    return NodeElement;
  }
}
