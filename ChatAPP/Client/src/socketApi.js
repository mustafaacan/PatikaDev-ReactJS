import io from "socket.io-client";

let socket;

const getSocketUrl = () => {
  if (process.env.REACT_APP_SOCKET_URL) {
    return process.env.REACT_APP_SOCKET_URL;
  }

  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:3001`;
};

export const init = () => {
  if (socket) {
    return socket;
  }

  socket = io(getSocketUrl(), {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Connected to 3001 port");
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error.message);
  });

  return socket;
};

export const sendMessage = (message) => {
  if (!socket) {
    init();
  }

  if (socket) {
    socket.emit("new-message", message);
  }
};

export const subscribeChat = (cb) => {
  if (!socket) {
    init();
  }

  const handler = (message) => {
    console.log("new Message ", message);
    cb(message);
  };

  socket.on("receive-message", handler);

  return () => {
    socket.off("receive-message", handler);
  };
};

export const initialMessages = (cb) => {
  if (!socket) {
    init();
  }

  socket.on("message-list", (message) => {
    cb(message);
  });
};
