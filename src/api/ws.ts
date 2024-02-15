import { UserDTO } from '../api/type';
import { createToken } from '../services/chat';

const createWebSocket = async (chatId: number, user: UserDTO) => {
  const token = (await createToken({ id: chatId })).token;
  const socket = new WebSocket(
    `wss://ya-praktikum.tech/ws/chats/${user.id}/${chatId}/${token}`,
  );

  socket.addEventListener('open', () => {
    console.log('Соединение установлено');
    socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      }),
    );
  });

  socket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener('message', (event) => {
    console.log('Получены данные', event.data);
    const data = JSON.parse(event.data);
    const messages = window.store.getState().messages;
    if (Array.isArray(data) && data[0]?.type === 'message') {
      window.store.set({ messages: [...messages, ...data.reverse()] });
    } else if (data.type === 'message') {
      window.store.set({ messages: [...messages, data] });
    }
  });

  socket.addEventListener('error', (event) => {
    const errorEvent = event as ErrorEvent;
    console.log('Ошибка', errorEvent.message);
  });

  return socket;
};

export default createWebSocket;
