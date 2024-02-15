import { HTTPTransport } from '../utils/HTTPTransport';
import {
  APIError,
  ChangeChatUsers,
  ChatDTO,
  ChatUser,
  CreateChat,
} from './type';

const chatApi = new HTTPTransport('/chats');

export default class ChatApi {
  async create(data: CreateChat): Promise<void | APIError> {
    return chatApi.post<void>('/', { data });
  }
  async createToken(data: {
    id: number;
  }): Promise<{ token: string } | APIError> {
    return chatApi.post<{ token: string }>(`/token/${data.id}`);
  }
  async getChats(): Promise<ChatDTO[] | APIError> {
    return chatApi.get<ChatDTO[]>('');
  }

  async addUsers(data: ChangeChatUsers): Promise<void | APIError> {
    return chatApi.put<void>('/users', { data });
  }
  async deleteUsers(data: ChangeChatUsers): Promise<void | APIError> {
    return chatApi.delete<void>('/users', { data });
  }
  async deleteChat(data: { chatId: number }): Promise<void | APIError> {
    return chatApi.delete<void>('/', { data });
  }
  async getUsers(id: number): Promise<ChatUser[] | APIError> {
    return chatApi.get<ChatUser[]>(`/${id}/users`);
  }
}
