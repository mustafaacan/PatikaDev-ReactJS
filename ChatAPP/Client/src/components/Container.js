import React, { useEffect } from "react";
import ChatList from "./ChatList";
import ChatForm from "./ChatForm";
import styles from "./styles.module.css";
import { init, subscribeChat, initialMessages } from "../socketApi";
import { useChat } from "../context/ChatContext";

export default function Container() {
  const { setMessages } = useChat();

  // Didmount moment
  useEffect(() => {
    init();

    initialMessages((messages) => {
      setMessages(messages);
    });

    const unsubscribeChat = subscribeChat((message) => {
      setMessages((prev) => [...prev, { message }]);
    });

    return () => {
      unsubscribeChat();
    };
  }, [setMessages]);

  return (
    <div className={styles.container}>
      <ChatList />
      <ChatForm />
    </div>
  );
}
