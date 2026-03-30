import {createInterviewChat, sendMessageToAI} from "@/lib/aiService";
import {type InterviewMessage} from "@/types/interview";
import {type Chat} from "@google/genai";
import clsx from "clsx";
import {useState, useRef} from "react";
import popSoundEffect from "@/assets/sounds/pop.mp3";

const InterviewChat = () => {
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // We use a ref to store the audio element for the send sound effect, so it doesn't cause re-renders when updated
  const sendSoundRef = useRef<HTMLAudioElement | null>(null);

  // We use a ref to store the chat instance so that it persists across renders without causing re-renders
  const chatRef = useRef<Chat | null>(null);

  if (!sendSoundRef.current) {
    // Initialize the sound effect once
    sendSoundRef.current = new Audio(popSoundEffect);

    // Set a reasonable volume for the sound effect
    sendSoundRef.current.volume = 0.4;
  }

  const playSound = () => {
    // If sound is not loaded, do nothing
    if (!sendSoundRef.current) return;
    const sound = sendSoundRef.current;

    // restart if spam clicking
    sound.currentTime = 0;

    // avoid promise errors
    sound.play().catch(() => {});
  };

  const startChat = () => {
    playSound();
    // Prevent re-initialization if chat already exists
    if (chatRef.current) return;

    const initialUserMessage: InterviewMessage = {
      role: "user",
      text: "Hello! Let's start.",
    };

    // Initialize the chat with the initial user message
    chatRef.current = createInterviewChat([initialUserMessage]);
    setMessages([initialUserMessage]);
  };

  const addMessageToChat = (message: InterviewMessage) => {
    setMessages((prev) => [...prev, message]);
    setInput("");
    playSound();
  };

  const messageValidation = (message: string) => {
    // Basic validation
    if (!message.trim() || !chatRef.current) {
      alert("Please enter a valid message.");
    } else {
      sendMessage(message);
    }
  };

  const sendMessage = async (message: string) => {
    if (!chatRef.current) return;
    // Add user's message to the chat immediately for better UX
    const newUserMsg: InterviewMessage = {role: "user", text: message};
    addMessageToChat(newUserMsg);

    try {
      setLoading(true);
      const responseText = await sendMessageToAI(
        chatRef.current,
        newUserMsg.text,
      );
      addMessageToChat({role: "model", text: responseText});
    } catch (err) {
      console.error("Chat Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessageWithEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      messageValidation(input);
    }
  };

  // Placeholder for voice recording functionality
  const recordVoice = () => {
    alert("Voice recording not implemented yet!");
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <audio id="audio" className="hidden" controls />
      <div className="h-full flex flex-col overflow-auto overflow-y-auto border gap-2 rounded-md p-2 mb-4">
        {messages.map((m, i) => (
          <p
            key={i}
            className={clsx(
              "p-2 rounded-md relative",
              m.role === "user"
                ? "bg-blue-700 self-end text-white"
                : " bg-gray-200 ",
            )}
          >
            <span
              className={clsx(
                "border-t-6 border-b-6 border-l-6 border-t-transparent border-b-transparent w-0 h-0 absolute ",
                m.role === "user"
                  ? "border-l-blue-700 -right-1 bottom-1.5"
                  : "border-l-gray-200 -left-1 bottom-1.5 rotate-180",
              )}
            />
            {m.text}
          </p>
        ))}
        {loading && (
          <p className="p-2 rounded-md relative bg-gray-200 animate-pulse">
            AI is typing...
          </p>
        )}
      </div>
      {!chatRef.current ? (
        <button
          onClick={startChat}
          className="bg-green-600 rounded-md cursor-pointer mx-auto hover:bg-green-800 duration-200 text-white p-2"
        >
          Start Interview
        </button>
      ) : (
        <div className="flex border gap-2 pr-2 justify-center items-center w-full rounded-md">
          <input
            disabled={loading}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={sendMessageWithEnter}
            className="focus:outline-0 p-2 w-full rounded-md"
            placeholder="Type your answer..."
          />
          <button
            disabled={loading}
            onClick={recordVoice}
            className="bg-black disabled:bg-gray-300 disabled:cursor-not-allowed text-center items-center flex text-3xl h-8 w-8 text-white p-1.5 rounded-full hover:bg-gray-800 duration-150 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path
                fill="rgb(255, 255, 255)"
                d="M320 64C267 64 224 107 224 160L224 288C224 341 267 384 320 384C373 384 416 341 416 288L416 160C416 107 373 64 320 64zM176 248C176 234.7 165.3 224 152 224C138.7 224 128 234.7 128 248L128 288C128 385.9 201.3 466.7 296 478.5L296 528L248 528C234.7 528 224 538.7 224 552C224 565.3 234.7 576 248 576L392 576C405.3 576 416 565.3 416 552C416 538.7 405.3 528 392 528L344 528L344 478.5C438.7 466.7 512 385.9 512 288L512 248C512 234.7 501.3 224 488 224C474.7 224 464 234.7 464 248L464 288C464 367.5 399.5 432 320 432C240.5 432 176 367.5 176 288L176 248z"
              />
            </svg>
          </button>
          <button
            disabled={loading}
            onClick={() => messageValidation(input)}
            className="bg-black disabled:bg-gray-300 disabled:cursor-not-allowed text-center items-center flex text-3xl h-8 w-8 text-white p-1.5 rounded-full hover:bg-gray-800 duration-150 cursor-pointer"
          >
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path
                fill="rgb(255, 255, 255)"
                d="M568.4 37.7C578.2 34.2 589 36.7 596.4 44C603.8 51.3 606.2 62.2 602.7 72L424.7 568.9C419.7 582.8 406.6 592 391.9 592C377.7 592 364.9 583.4 359.6 570.3L295.4 412.3C290.9 401.3 292.9 388.7 300.6 379.7L395.1 267.3C400.2 261.2 399.8 252.3 394.2 246.7C388.6 241.1 379.6 240.7 373.6 245.8L261.2 340.1C252.1 347.7 239.6 349.7 228.6 345.3L70.1 280.8C57 275.5 48.4 262.7 48.4 248.5C48.4 233.8 57.6 220.7 71.5 215.7L568.4 37.7z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewChat;
