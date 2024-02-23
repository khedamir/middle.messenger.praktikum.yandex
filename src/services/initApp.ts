import router from '../core/navigate';
import { getUser } from './auth';
import { getChats } from './chat';

const initApp = async () => {
  try {
    await getUser();
    const location = window.location.pathname;
    if (location === '/' || location === 'signup') {
      router.go('/messenger');
      return;
    }
    router.go(window.location.pathname);
  } catch (error) {
    router.go('/');
  }
};

const initChatPage = async () => {
  try {
    await getChats();
  } catch (error) {
    alert(`Error: ${error}`);
  }
};

export { initApp, initChatPage };
