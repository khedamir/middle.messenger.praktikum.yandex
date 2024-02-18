import { HTTPTransport } from '../utils/HTTPTransport';
import { ChangeChatUsers, CreateChat } from './type';

const chatApi = new HTTPTransport('/chats');

export default class ChatApi {
  async create(data: CreateChat) {
    const result = await chatApi.post('/', { data });
    return result.response;
  }

  async createToken(data: { id: number }) {
    const result = await chatApi.post(`/token/${data.id}`);
    return result.response;
  }

  async getChats() {
    const result = await chatApi.get('');
    return result.response;
  }

  async addUsers(data: ChangeChatUsers) {
    const result = await chatApi.put('/users', { data });
    return result.response;
  }

  async deleteUsers(data: ChangeChatUsers) {
    const result = await chatApi.delete('/users', { data });
    return result.response;
  }

  async deleteChat(data: { chatId: number }) {
    const result = await chatApi.delete('/', { data });
    return result.response;
  }

  async getUsers(id: number) {
    const result = await chatApi.get(`/${id}/users`);
    return result.response;
  }
}
