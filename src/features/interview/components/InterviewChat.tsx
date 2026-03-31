import {createInterviewChat, sendInterviewMessage} from "@/lib/aiService";
import {
  type InterviewContext,
  type InterviewMessage,
  type InterviewMessageType,
  type InterviewQuestion,
} from "@/types/interview";
import {type Chat} from "@google/genai";
import {useState, useRef} from "react";
import popSoundEffect from "@/assets/sounds/pop.mp3";
import TextBubble from "./TextBubble";
import LoadingBubble from "./LoadingBubble";
import ChatInputs from "./ChatInputs";
import {Link} from "react-router";

const InterviewChat = () => {
  // TEST DATA - this would come from props or context in a real app
  const interviewContext: InterviewContext = {
    expertise: "Frontend Development",
    experience: "Intern",
    competencies: [],
    timeLimitEnabled: true,
    totalQuestions: 2,
    currentQuestion: 0,
    phase: "interview",
  };
  const [clarificationUsed, setClarificationUsed] = useState(false);
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(
    interviewContext.currentQuestion || 0,
  );
  const [endedInterview, setEndedInterview] = useState(false);
  // const [timeLeft, setTimeLeft] = useState(0);

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
    setCurrentQuestion(0);

    // Initialize the chat with the initial user message
    chatRef.current = createInterviewChat(
      [initialUserMessage],
      interviewContext,
    );
    sendMessage(initialUserMessage.text, () => {});
  };

  const addMessageToChat = (
    message: InterviewMessage,
    messageType?: InterviewMessageType,
  ) => {
    playSound();
    setMessages((prev) => [...prev, message]);
    if (message.role === "model" && messageType === "question") {
      setClarificationUsed(false);
      setCurrentQuestion((prev) => prev + 1);
    } else if (message.role === "model" && messageType === "clarification") {
      setClarificationUsed(true);
    }
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
          ...interviewContext,
          currentQuestion,
        },
        clarificationUsed,
      );
      const responseJSON = cleanResponseJSON(responseText);
      addMessageToChat(
        {role: "model", text: responseJSON.message},
        responseJSON.messageType,
      );
      if (
        currentQuestion >= interviewContext.totalQuestions &&
        responseJSON.messageType === "question"
      ) {
        endInterview();
      }
    } catch (err) {
      console.error("Chat Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const cleanResponseJSON = (responseText: string): InterviewQuestion => {
    const cleanedResponseText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const cleanedResponseJSON = JSON.parse(cleanedResponseText);

    return cleanedResponseJSON;
  };

  // Placeholder for voice recording functionality
  const recordVoice = () => {
    alert("Voice recording not implemented yet!");
  };

  const endInterview = () => {
    const finalSummary = `
      Thank you for taking the time to participate in this interview. This concludes our session.

      You can now review your performance and detailed feedback, including strengths, areas for improvement, and overall evaluation.

      I appreciate your effort and wish you the best in your continued preparation.
    `;

    addMessageToChat({role: "model", text: finalSummary});
    setEndedInterview(true);
  };

  const navigateToFeedback = () => {
    // ToDo
    // navigate("/feedback", { state: { messages, interviewContext } });
  };

  return (
    <div className="p-2 h-full flex flex-col">
      <audio id="audio" className="hidden" controls />
      <div className="flex relative">
        <Link
          to="/dashboard"
          className="absolute left-0 top-0 text-sm text-gray-500 hover:text-gray-700"
        >
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-lg font-semibold text-center w-full">
          {interviewContext.expertise} Interview - {interviewContext.experience}{" "}
          Level
        </h1>
      </div>
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
      ) : !endedInterview ? (
        <ChatInputs
          recordFunction={recordVoice}
          sendMessageFunction={sendMessage}
          loading={loading}
        />
      ) : (
        <div className="text-center flex flex-col gap-2 text-gray-500">
          <p>Interview complete! Thank you for participating.</p>
          <button
            onClick={navigateToFeedback}
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
