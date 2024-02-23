import * as Pages from '../pages';
import Router from './Router';

const pages = {
  login: Pages.LoginPage,
  register: Pages.RegisterPage,
  chat: Pages.ChatPage,
  profile: Pages.ProfilePage,
  password: Pages.PasswordPage,
  error: Pages.ErrorPage,
};

const router = new Router('#app');
router
  .use('/', pages.login)
  .use('/sign-up', pages.register)
  .use('/messenger', pages.chat)
  .use('/settings', pages.profile)
  .use('/change-password', pages.password)
  .use('/error', pages.error)
  .start();

export default router;
