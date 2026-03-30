import {createInterviewChat, sendInterviewMessage} from "@/lib/aiService";
import {type InterviewMessage} from "@/types/interview";
import {type Chat} from "@google/genai";
import {useState, useRef} from "react";
import popSoundEffect from "@/assets/sounds/pop.mp3";
import TextBubble from "./TextBubble";
import LoadingBubble from "./LoadingBubble";
import ChatInputs from "./ChatInputs";

const InterviewChat = () => {
  const expertise = "Software Engineering"; // ToDo: Make this dynamic based on the job role
  const totalQuestions = 2; // Total number of questions in the interview
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);

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
    chatRef.current = createInterviewChat([initialUserMessage], expertise);
    sendMessage(initialUserMessage.text, () => {});
  };

  const addMessageToChat = (message: InterviewMessage) => {
    playSound();
    setMessages((prev) => [...prev, message]);
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
      resetInput();
      setLoading(true);
      const responseText = await sendInterviewMessage(
        chatRef.current,
        newUserMsg.text,
        {
          currentQuestion,
          totalQuestions,
          phase: "interview",
          expertise: expertise,
        },
      );
      addMessageToChat({role: "model", text: responseText});
      setCurrentQuestion((prev) => prev + 1);
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

  const endInterview = () => {
    alert("Ending interview not implemented yet!");
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
      ) : currentQuestion < totalQuestions ? (
        <ChatInputs
          recordFunction={recordVoice}
          sendMessageFunction={sendMessage}
          loading={loading}
        />
      ) : (
        <div className="text-center flex flex-col gap-2 text-gray-500">
          <p>Interview complete! Thank you for participating.</p>
          <button
            onClick={endInterview}
            className="bg-yellow-500 rounded-md cursor-pointer mx-auto hover:bg-yellow-700 duration-200 text-white p-2"
          >
            View Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewChat;
