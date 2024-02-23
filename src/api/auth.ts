import { HTTPTransport } from './../utils/HTTPTransport';
import { CreateUser, LoginRequestData } from './type';

const authApi = new HTTPTransport('/auth');

export default class AuthApi {
  async create(data: CreateUser) {
    const result = await authApi.post('/signup', { data });
    return result.response;
  }

  async login(data: LoginRequestData) {
    const result = await authApi.post('/signin', { data });
    return result.response;
  }

  async me() {
    const result = await authApi.get('/user');
    return result.response;
  }

  async logout() {
    const result = await authApi.post('/logout');
    return result.response;
  }
}
