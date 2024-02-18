import { UpdatePassword, UpdateUser, UserDTO } from '../api/type';
import UserApi from '../api/user';
import { apiHasError } from '../utils/apiHasError';

const userApi = new UserApi();

const updateUser = async (data: UpdateUser) => {
  const response = await userApi.profile(data);
  const responseJson = JSON.parse(response);
  if (apiHasError(responseJson)) {
    throw Error(responseJson.reason);
  }
  window.store.set({ user: responseJson as UserDTO });
};

const updateAvatar = async (data: File) => {
  const response = await userApi.avatar(data);
  const responseJson = JSON.parse(response);
  if (apiHasError(responseJson)) {
    throw Error(responseJson.reason);
  }
  window.store.set({ user: responseJson as UserDTO });
};

const updatePassword = async (data: UpdatePassword) => {
  const response = await userApi.password(data);
  if (response !== 'OK') {
    const responseJson = JSON.parse(response);
    if (apiHasError(responseJson)) {
      throw Error(responseJson.reason);
    }
  }
  return response;
};

const searchUsers = async (data: { login: string }) => {
  const response = await userApi.search(data);
  const responseJson = JSON.parse(response);
  if (apiHasError(responseJson)) {
    throw Error(responseJson.reason);
  }
  return responseJson as UserDTO[];
};

export { updateUser, updatePassword, updateAvatar, searchUsers };
