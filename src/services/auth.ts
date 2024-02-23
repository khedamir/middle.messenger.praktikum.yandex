import AuthApi from '../api/auth';
import { CreateUser, LoginRequestData, UserDTO } from '../api/type';
import router from '../core/navigate';
import { initState } from '../main';
import { apiHasError } from '../utils/apiHasError';

const authApi = new AuthApi();

const getUser = async () => {
  const response = await authApi.me();
  const responseJson = JSON.parse(response);
  if (apiHasError(responseJson)) {
    throw Error(responseJson.reason);
  }

  window.store.set({ user: responseJson as UserDTO });
};

const signin = async (data: LoginRequestData) => {
  const response = await authApi.login(data);
  if (response !== 'OK') {
    const responseJson = JSON.parse(response);
    if (apiHasError(responseJson)) {
      throw Error(responseJson.reason);
    }
  }
  await getUser();
  router.go('/messenger');
};

const signup = async (data: CreateUser) => {
  const response = await authApi.create(data);
  const responseJson = JSON.parse(response);
  if (apiHasError(responseJson)) {
    throw Error(responseJson.reason);
  }
  await getUser();
  router.go('/messenger');
};

const logout = async () => {
  await authApi.logout();
  window.store.set(initState);
  router.go('/');
};

export { signin, signup, logout, getUser };
