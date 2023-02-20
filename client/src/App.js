import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Avatar, Input } from "@mui/material";
import Msg from "./components/Msg";
import "./App.css";
// const socket = io("http://localhost:3001");
const socket = io("/");

export default function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  // const [user, setUser] = useState(0)

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
    socket.emit("message", newMessage.body);
  };

  return (
    <>
      <div className="container">
        <header>
          <div>Chat JFO</div>
        </header>
        <div className="chat-box">
          {messages.map((message, index) => (
            <>
              {/* <span><b>{message.from}:</b> </span> */}
              <Msg
                align={message.from === "Me" ? "flex-end" : "flex-start"}
                bg={message.from === "Me" ? "#4766EC" : "#333231"}
                key={index}
                text={message.body}
              />
            </>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
          <Input
            name="message"
            type="text"
            placeholder="Write your message..."
            onChange={(e) => setMessage(e.target.value)}
            className="border-2 border-zinc-500 p-2 w-full text-black"
            value={message}
            autoFocus
          />
        </form>
      </div>
    </>
  );
}
