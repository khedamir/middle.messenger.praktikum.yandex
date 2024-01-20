import { InputField } from '..';
import Block from '../../core/Block';
import NodeElement from './password_change.hbs?raw';
import * as validators from '../../utils/validators';

export class PasswordChange extends Block<
  object,
  {
    oldPassword: InputField;
    newPassword: InputField;
  }
> {
  constructor() {
    super({
      validate: {
        oldPassword: validators.password,
        newPassword: validators.password,
      },
      onSave: (event: MouseEvent) => {
        event.preventDefault();
        const oldPassword = this.refs.oldPassword.getValue();
        const newPassword = this.refs.newPassword.getValue();
        if (!oldPassword || !newPassword) {
          return;
        }
        console.log(oldPassword, newPassword);
      },
    });
  }
  protected render(): string {
    return NodeElement;
  }
}
