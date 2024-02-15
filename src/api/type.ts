export type APIError = {
  reason: string;
};

export type SignUpResponse = {
  id: number;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type CreateUser = Omit<UserDTO, 'avatar' | 'display_name' | 'id'> & {
  password: string;
};

export type UpdateUser = Omit<UserDTO, 'avatar' | 'id'>;

export type ChatUser = Omit<UserDTO, 'phone' | 'email'> & {
  role: string;
};

export type UpdatePassword = {
  oldPassword: string;
  newPassword: string;
};

export type CreateChat = {
  title: string;
};

export type LoginRequestData = {
  login: string;
  password: string;
};

type LastMessage = {
  user: UserDTO;
  time: string;
  content: string;
};

export type ChatDTO = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: LastMessage | null;
};

export type MessageDTO = {
  id: number;
  content: string;
  file: string | null;
  is_read: boolean;
  time: string;
  user_id: number;
  chat_id: number;
};

export type ChangeChatUsers = {
  users: number[];
  chatId: number;
};
