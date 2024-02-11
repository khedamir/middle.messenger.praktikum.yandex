import Block, { IProps, RefType } from '../../core/Block';

interface ErrorLineProps extends IProps {
  error_message: string;
}

export class ErrorLine extends Block<ErrorLineProps, RefType, HTMLElement> {
  constructor(props: ErrorLineProps) {
    super({
      ...props,
      error_message: '',
    });
  }
  protected render(): string {
    return `
    <div class='input__text-error'>{{error_message}}</div>
        `;
  }
}
