import * as Pages from '../pages';

const pages = {
  login: Pages.LoginPage,
  register: Pages.RegisterPage,
  chat: Pages.ChatPage,
  profile: Pages.ProfilePage,
  password: Pages.PasswordPage,
  error: Pages.ErrorPage,
};

export function navigate(page: keyof typeof pages) {
  const app = document.getElementById('app');

  const Component = pages[page];
  const component = new Component();
  app?.replaceChildren(component.getContent()!);
}
