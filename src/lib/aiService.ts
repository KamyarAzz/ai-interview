import {GoogleGenAI, type Chat} from "@google/genai";
import {type InterviewMessage} from "@/types/interview";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const createInterviewChat = (
  initialHistory: InterviewMessage[] = [],
): Chat => {
  return ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction:
        "You are a Senior Engineer. Conduct a technical interview. Ask one question at a time.",
    },
    history: initialHistory,
  });
};

export const sendMessageToAI = async (
  chat: Chat,
  message: string,
): Promise<string> => {
  try {
    const result = await chat.sendMessage({message});
    if (result.candidates && result.candidates[0]?.content?.parts?.[0]?.text) {
      return result.candidates[0].content.parts[0].text;
    }
    throw new Error("No response content received");
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error("Failed to get response from AI");
  }
};
