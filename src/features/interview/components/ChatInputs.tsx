import React, {useState} from "react";
import microhponeIcon from "@/assets/images/interview-chat/microphone.svg";
import sendIcon from "@/assets/images/interview-chat/send.svg";
type Props = {
  recordFunction: () => void;
  sendMessageFunction: (message: string, resetInput: () => void) => void;
  disabled?: boolean;
};

export default function ChatInputs({
  recordFunction,
  sendMessageFunction,
  disabled = false,
}: Props) {
  const [input, setInput] = useState<string>("");

  const resetInput = () => {
    setInput("");
  };

  const sendMessageWithEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    message: string,
  ) => {
    if (e.key === "Enter") {
      sendMessageFunction(message, resetInput);
    }
  };

  return (
    <div className="flex gap-2 items-center w-full border rounded-md p-1 flex-wrap">
      <input
        disabled={disabled}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => sendMessageWithEnter(e, input)}
        className="flex-1 p-2 rounded-md focus:outline-none min-w-37.5"
        placeholder="Type your answer..."
      />
      <button
        disabled={disabled}
        onClick={recordFunction}
        className="bg-black disabled:bg-gray-300 text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
      >
        <img className="w-5 h-5" alt="Record Voice" src={microhponeIcon} />
      </button>
      <button
        disabled={disabled}
        onClick={() => sendMessageFunction(input, resetInput)}
        className="bg-black disabled:bg-gray-300 text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
      >
        <img className="w-5 h-5" alt="Send Message" src={sendIcon} />
      </button>
    </div>
  );
}
