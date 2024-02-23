import { ErrorLine, InputField } from '..';
import Block from '../../core/Block';
import NodeElement from './password_change.hbs?raw';
import * as validators from '../../utils/validators';
import { updatePassword } from '../../services/user';

export class PasswordChange extends Block<
  object,
  {
    oldPassword: InputField;
    newPassword: InputField;
    errorLine: ErrorLine;
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

        updatePassword({ oldPassword, newPassword })
          .then(() => {
            this.refs.oldPassword.clearValue();
            this.refs.newPassword.clearValue();
          })
          .catch((error) => {
            this.refs.errorLine.setProps({ error_message: error });
            console.log('change password error', error);
          });
      },
    });
  }
  protected render(): string {
    return NodeElement;
  }
}
