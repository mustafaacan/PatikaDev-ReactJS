import React from "react";
import styles from "./styles.module.css";
import { useChat } from "../context/ChatContext";
import ChatItem from "./ChatItem";

// For Scroll ops on each new message
import ScrollableFeed from "react-scrollable-feed";

export default function ChatList() {
  const { messages } = useChat();

  return (
    <div className={styles.chatlist}>
      {/*For Scroll ops on each new message */}
      <ScrollableFeed forceScroll={true}>
        {messages.map((item, key) => {
          return <ChatItem key={key} item={item} />;
        })}
      </ScrollableFeed>
    </div>
  );
}
