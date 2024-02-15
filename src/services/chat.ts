import ChatApi from '../api/chat';
import { ChangeChatUsers } from '../api/type';
import { apiHasError } from '../utils/apiHasError';

const chatApi = new ChatApi();

const getChats = async () => {
  const responseChat = await chatApi.getChats();
  console.log(responseChat);
  if (apiHasError(responseChat)) {
    throw Error(responseChat.reason);
  }

  return responseChat;
};

const createToken = async (data: { id: number }) => {
  const response = await chatApi.createToken(data);
  console.log(response);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  return response;
};

const createChat = async (title: string) => {
  const response = await chatApi.create({ title });
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const responseChat = await chatApi.getChats();
  if (apiHasError(responseChat)) {
    throw Error(responseChat.reason);
  }

  const chats = await getChats();
  window.store.set({ chats });
};

const addUsers = async (data: ChangeChatUsers) => {
  const response = await chatApi.addUsers(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  return response;
};

const deleteUsers = async (data: ChangeChatUsers) => {
  const response = await chatApi.deleteUsers(data);
  console.log(response);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  return response;
};

const deleteChat = async (data: { chatId: number }) => {
  const response = await chatApi.deleteChat(data);
  console.log(response);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  return response;
};

const getChatUsers = async (id: number) => {
  const response = await chatApi.getUsers(id);
  console.log(response);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  return response;
};

export {
  createChat,
  getChats,
  addUsers,
  deleteUsers,
  deleteChat,
  createToken,
  getChatUsers,
};
