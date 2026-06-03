import React, { useState } from "react";
import styles from "./styles.module.css";
import { sendMessage } from "../socketApi";
import { useChat } from "../context/ChatContext";

export default function ChatForm() {
  const [message, setMessage] = useState("");

  const { setMessages } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      sendMessage(message);
      setMessages((prevState) => [...prevState, { message, fromMe: true }]);
    }
    setMessage("");
  };

  return (
    <div>
      <form className={styles.chatForm} onSubmit={handleSubmit}>
        <input
          id="messageBox"
          placeholder="Enter your message HERE"
          className={styles.textInput}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></input>
        <button className={styles.sendButton} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
