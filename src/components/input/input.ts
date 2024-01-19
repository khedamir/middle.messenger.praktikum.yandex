import Block, { RefType } from '../../core/Block';

interface IProps {
  ref: string;
  name: string;
  classes: string;
  placeholder: string;
  onBlur: (e: Event) => void;
}

export class Input extends Block<IProps, RefType> {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
      },
    });
  }

  protected render(): string {
    const { classes, placeholder, ref, name } = this.props;
    return `
            <input
                class="${classes}"
                placeholder="${placeholder || ''}"
                ref="${ref}"
                name="${name}"
            />
        `;
  }
}
