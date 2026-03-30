import {createInterviewChat, sendMessageToAI} from "@/lib/aiService";
import {type InterviewMessage} from "@/types/interview";
import {type Chat} from "@google/genai";
import {useState, useRef} from "react";
import popSoundEffect from "@/assets/sounds/pop.mp3";
import TextBubble from "./TextBubble";
import LoadingBubble from "./LoadingBubble";
import ChatInputs from "./ChatInputs";

const InterviewChat = () => {
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // We use a ref to store the audio element for the send sound effect, so it doesn't cause re-renders when updated
  const sendSoundRef = useRef<HTMLAudioElement | null>(null);

  // We use a ref to store the chat instance so that it persists across renders without causing re-renders
  const chatRef = useRef<Chat | null>(null);

  // Initialize the sound effect once when the component mounts
  if (!sendSoundRef.current) {
    sendSoundRef.current = new Audio(popSoundEffect);
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
    // Prevent re-initialization if chat already exists
    if (chatRef.current) return;

    const initialUserMessage: InterviewMessage = {
      role: "user",
      text: "Hello! Let's start.",
    };

    // Initialize the chat with the initial user message
    chatRef.current = createInterviewChat([initialUserMessage]);
    sendMessage(initialUserMessage.text, () => {});
  };

  const addMessageToChat = (message: InterviewMessage) => {
    setMessages((prev) => [...prev, message]);
    playSound();
  };

  const messageValidation = (message: string) => {
    // Basic validation
    if (!message.trim() || !chatRef.current) {
      alert("Please enter a valid message.");
      return false;
    }
    return true;
  };

  const sendMessage = async (message: string, resetInput: () => void) => {
    if (!messageValidation(message) || !chatRef.current) return;
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
      resetInput();
    } catch (err) {
      console.error("Chat Error:", err);
    } finally {
      setLoading(false);
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
          <TextBubble key={i} message={m} />
        ))}
        {loading && <LoadingBubble />}
      </div>
      {!chatRef.current ? (
        <button
          onClick={startChat}
          className="bg-green-600 rounded-md cursor-pointer mx-auto hover:bg-green-800 duration-200 text-white p-2"
        >
          Start Interview
        </button>
      ) : (
        <ChatInputs
          recordFunction={recordVoice}
          sendMessageFunction={sendMessage}
          loading={loading}
        />
      )}
    </div>
  );
};

export default InterviewChat;
