import ChatApi from '../api/chat';
import { ChangeChatUsers, ChatDTO, ChatUser, CreateToken } from '../api/type';
import { apiHasError } from '../utils/apiHasError';

const chatApi = new ChatApi();

const getChats = async () => {
  const response = await chatApi.getChats();
  const responseJson = JSON.parse(response);
  if (apiHasError(responseJson)) {
    throw Error(responseJson.reason);
  }

  window.store.set({ chats: responseJson as ChatDTO[] });
};

const createToken = async (data: { id: number }) => {
  const response = await chatApi.createToken(data);
  const responseJson = JSON.parse(response);
  if (apiHasError(responseJson)) {
    throw Error(responseJson.reason);
  }

  return responseJson as CreateToken;
};

const createChat = async (title: string) => {
  const response = await chatApi.create({ title });
  if (response !== 'OK') {
    const responseJson = JSON.parse(response);
    if (apiHasError(responseJson)) {
      throw Error(responseJson.reason);
    }
  }
  await getChats();
};

const addUsers = async (data: ChangeChatUsers) => {
  const response = await chatApi.addUsers(data);
  if (response !== 'OK') {
    const responseJson = JSON.parse(response);
    if (apiHasError(responseJson)) {
      throw Error(responseJson.reason);
    }
  }

  return response;
};

const deleteUsers = async (data: ChangeChatUsers) => {
  const response = await chatApi.deleteUsers(data);
  if (response !== 'OK') {
    const responseJson = JSON.parse(response);
    if (apiHasError(responseJson)) {
      throw Error(responseJson.reason);
    }
  }

  return response;
};

const deleteChat = async (data: { chatId: number }) => {
  const response = await chatApi.deleteChat(data);
  const responseJson = JSON.parse(response);
  if (apiHasError(responseJson)) {
    throw Error(responseJson.reason);
  }

  window.store.set({ openDialogChat: null, openDialogUsers: [] });
  await getChats();
};

const getChatUsers = async (id: number) => {
  const response = await chatApi.getUsers(id);
  const responseJson = JSON.parse(response);
  if (apiHasError(responseJson)) {
    throw Error(response.reason);
  }

  window.store.set({ openDialogUsers: responseJson as ChatUser[] });
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
