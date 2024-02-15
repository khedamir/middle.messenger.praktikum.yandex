import AuthApi from '../api/auth';
import { CreateUser, LoginRequestData, UserDTO } from '../api/type';
import router from '../core/navigate';
import { apiHasError } from '../utils/apiHasError';

const authApi = new AuthApi();

const getUser = async () => {
  const responseUser = await authApi.me();
  if (apiHasError(responseUser)) {
    throw Error(responseUser.reason);
  }

  console.log('responseUser', responseUser);
  return responseUser as UserDTO;
};

const signin = async (data: LoginRequestData) => {
  const response = await authApi.login(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const me = await getUser();

  window.store.set({ user: me });
  router.go('/messenger');
};

const signup = async (data: CreateUser) => {
  const response = await authApi.create(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  console.log('response', response);
  const me = await getUser();
  window.store.set({ user: me });
  router.go('/messenger');
};

const logout = async () => {
  await authApi.logout();
  window.store.set({ user: null, chats: [] });
  router.go('/');
};

export { signin, signup, logout, getUser };
