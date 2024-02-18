import Handlebars from 'handlebars';
import * as Components from './components';
import { registerComponent } from './core/resgiterComponent';
import Block from './core/Block';
import { ChatDTO, ChatUser, MessageDTO, UserDTO } from './api/type';
import { Store } from './core/Store';
import { initApp } from './services/initApp';
import constants from './constants';

export type AppState = {
  error: string | null;
  user: UserDTO | null;
  isOpenDialogChat: boolean;
  openDialogChat: ChatDTO | null;
  openDialogUsers: ChatUser[];
  chats: ChatDTO[];
  messages: MessageDTO[];
};

declare global {
  interface Window {
    store: Store<AppState>;
  }

  type Nullable<T> = T | null;
}

export const initState: AppState = {
  error: null,
  user: null,
  isOpenDialogChat: false,
  openDialogChat: null,
  openDialogUsers: [],
  chats: [],
  messages: [],
};
window.store = new Store<AppState>(initState);

Handlebars.registerPartial('AuthForm', Components.AuthForm);
Handlebars.registerPartial('DataLayout', Components.DataLayout);

Handlebars.registerHelper('getImgURL', function (url) {
  const domain = constants.HOST;
  return `${domain}/resources${url}`;
});

Handlebars.registerHelper('chatIsActive', function (id: number) {
  return window.store.getState().openDialogChat?.id === id;
});

Handlebars.registerHelper('getMessageType', function (user_id: number) {
  const isOutgoing = window.store.getState().user?.id === user_id;
  return isOutgoing ? 'outgoing' : 'incoming';
});

Object.entries(Components).forEach((component) => {
  registerComponent(component[0], component[1] as typeof Block);
});

document.addEventListener('DOMContentLoaded', () => initApp());
