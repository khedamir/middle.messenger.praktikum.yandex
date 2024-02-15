import { UpdatePassword, UpdateUser, UserDTO } from '../api/type';
import UserApi from '../api/user';
import { apiHasError } from '../utils/apiHasError';

const userApi = new UserApi();

const updateUser = async (data: UpdateUser) => {
  const responseProfile = await userApi.profile(data);
  if (apiHasError(responseProfile)) {
    throw Error(responseProfile.reason);
  }

  console.log('responseProfile', responseProfile);
  return responseProfile as UserDTO;
};

const updateAvatar = async (data: File) => {
  const responseProfile = await userApi.avatar(data);
  if (apiHasError(responseProfile)) {
    throw Error(responseProfile.reason);
  }

  console.log('responseProfile', responseProfile);
  return responseProfile as UserDTO;
};

const updatePassword = async (data: UpdatePassword) => {
  const responsePassword = await userApi.password(data);
  if (apiHasError(responsePassword)) {
    throw Error(responsePassword.reason);
  }

  console.log('responsePassword', responsePassword);
  return responsePassword;
};

const searchUsers = async (data: { login: string }) => {
  const responseProfile = await userApi.search(data);
  if (apiHasError(responseProfile)) {
    throw Error(responseProfile.reason);
  }

  console.log('responseProfile', responseProfile);
  return responseProfile as UserDTO[];
};

export { updateUser, updatePassword, updateAvatar, searchUsers };
