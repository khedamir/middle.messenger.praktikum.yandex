import { HTTPTransport } from './../utils/HTTPTransport';
import { UpdatePassword, UpdateUser } from './type';

const userApi = new HTTPTransport('/user');

export default class UserApi {
  async profile(data: UpdateUser) {
    const result = await userApi.put('/profile', { data });
    return result.response;
  }

  async avatar(file: File) {
    const data = new FormData();
    data.append('avatar', file);
    const result = await userApi.put('/profile/avatar', { data });
    return result.response;
  }

  async password(data: UpdatePassword) {
    const result = await userApi.put('/password', { data });
    return result.response;
  }

  async search(data: { login: string }) {
    const result = await userApi.post('/search', { data });
    return result.response;
  }
}
