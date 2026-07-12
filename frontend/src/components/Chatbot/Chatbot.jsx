import { useState } from "react";
import ChatbotButton from "./ChatbotButton";
import ChatbotWindow from "./ChatbotWindow";

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ChatbotButton onClick={() => setOpen(!open)} />
      {open && <ChatbotWindow onClose={() => setOpen(false)} />}
    </>
  );
};

export default Chatbot;
