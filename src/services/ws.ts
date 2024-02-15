import createWebSocket from '../api/ws';

let socket: WebSocket | null = null;

const createWS = async (chatId: number) => {
  const user = window.store.getState().user!;
  socket = await createWebSocket(chatId, user);
};

const sendMessage = (value: string) => {
  if (socket) {
    socket.send(
      JSON.stringify({
        content: value,
        type: 'message',
      }),
    );
  } else {
    console.error('WebSocket is not initialized.');
  }
};
export { createWS, sendMessage };
