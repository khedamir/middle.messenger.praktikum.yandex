import { HTTPTransport } from './../utils/HTTPTransport';
import { APIError, UpdatePassword, UpdateUser, UserDTO } from './type';

const userApi = new HTTPTransport('/user');

export default class UserApi {
  async profile(data: UpdateUser): Promise<UserDTO | APIError> {
    return userApi.put<UserDTO | APIError>('/profile', { data });
  }

  async avatar(file: File): Promise<UserDTO | APIError> {
    const data = new FormData();
    data.append('avatar', file);
    return userApi.put<UserDTO | APIError>('/profile/avatar', { data });
  }

  async password(data: UpdatePassword): Promise<void | APIError> {
    return userApi.put<void | APIError>('/password', { data });
  }

  async search(data: { login: string }): Promise<UserDTO[] | APIError> {
    return userApi.post<UserDTO[] | APIError>('/search', { data });
  }
}
