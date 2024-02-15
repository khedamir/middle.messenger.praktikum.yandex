import Block, { IProps, RefType } from '../../core/Block';

export interface InputProps extends IProps {
  ref: string;
  name: string;
  value: string;
  type: string;
  classes: string;
  id?: string;
  placeholder: string;
  onBlur: (e: Event) => void;
  onChange: (e: Event) => void;
}

export class Input extends Block<InputProps, RefType, HTMLInputElement> {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
        change: props.onChange,
      },
    });
  }

  protected render(): string {
    const { classes, placeholder, name, type, value, id } = this.props;
    return `
            <input
                class="${classes}"
                placeholder="${placeholder || ''}"
                name="${name}"
                type="${type}"
                value="${value}"
                id="${id}"
                autocomplete="${
                  type === 'password'
                    ? 'current-password'
                    : name === 'login'
                      ? 'username'
                      : ''
                }"
            />
        `;
  }
}
