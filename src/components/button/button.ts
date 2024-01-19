import Block from '../../core/Block';

interface IProps {
  type: 'green' | 'light';
  label: string;
  page: string;
  onClick?: (e: Event) => void;
}

export class Button extends Block {
  constructor(props: IProps) {
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
    const { type, label, page } = this.props;
    return `
            <button type="button" class="button button__${type}" ${
              page ? `page="${page}"` : ''
            }>
                ${label}
            </button>
        `;
  }
}
