import React, {useState} from "react";
import microhponeIcon from "@/assets/images/interview-chat/microphone.svg";
import sendIcon from "@/assets/images/interview-chat/send.svg";
type Props = {
  recordFunction: () => void;
  sendMessageFunction: (message: string, resetInput: () => void) => void;
  loading?: boolean;
};

export default function ChatInputs({
  recordFunction,
  sendMessageFunction,
  loading,
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
    <div className="flex border gap-2 pr-2 justify-center items-center w-full rounded-md">
      <input
        disabled={loading}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => sendMessageWithEnter(e, input)}
        className="focus:outline-0 p-2 w-full rounded-md"
        placeholder="Type your answer..."
      />
      <button
        disabled={loading}
        onClick={recordFunction}
        className="bg-black disabled:bg-gray-300 disabled:cursor-not-allowed text-center items-center flex text-3xl h-8 w-8 text-white p-1.5 rounded-full hover:bg-gray-800 duration-150 cursor-pointer"
      >
        <img
          className="w-full h-full"
          alt="Record Voice"
          src={microhponeIcon}
        />
      </button>
      <button
        disabled={loading}
        onClick={() => sendMessageFunction(input, resetInput)}
        className="bg-black disabled:bg-gray-300 disabled:cursor-not-allowed text-center items-center flex text-3xl h-8 w-8 text-white p-1.5 rounded-full hover:bg-gray-800 duration-150 cursor-pointer"
      >
        <img className="w-full h-full" alt="Send Message" src={sendIcon} />
      </button>
    </div>
  );
}
