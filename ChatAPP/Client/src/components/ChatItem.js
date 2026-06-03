import styles from "./styles.module.css";

export default function ChatItem({ item }) {
  const className = [styles.chatItem, item.fromMe ? styles.right : ""]
    .filter(Boolean)
    .join(" ");

  return <div className={className}>{item.message}</div>;
}
