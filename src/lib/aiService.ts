import {GoogleGenAI, type Chat, type Content} from "@google/genai";
import {type Context, type InterviewMessage} from "@/types/interview";

const generateSystemInstruction = (expertise: string): string => {
  return `
You are a Senior ${expertise} conducting a structured professional interview.

Context:
- The candidate is applying for a role in ${expertise}

Strict Rules:
- Ask exactly one question at a time
- Keep questions concise and relevant to ${expertise}
- Do NOT ask multiple questions
- Do NOT continue if the interview is finished

Interview Structure:
1. Introduction
2-4. Core ${expertise} questions
5. Problem-solving in ${expertise}
6. Behavioral

Adapt difficulty based on a mid-level candidate.

When Phase = feedback:
- STOP asking questions
- Provide a full evaluation

Evaluation format (JSON ONLY):
{
  "scores": {
    "communication": number,
    "technical": number,
    "problemSolving": number,
    "confidence": number
  },
  "strengths": string[],
  "weaknesses": string[],
  "improvements": string[],
  "finalSummary": string
}
`;
};

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

// Convert InterviewMessage to Content format expected by Google GenAI
const convertToContent = (messages: InterviewMessage[]): Content[] => {
  return messages.map((msg) => ({
    role: msg.role,
    parts: [{text: msg.text}],
  }));
};

export const createInterviewChat = (
  initialHistory: InterviewMessage[] = [],
  expertise: string,
): Chat => {
  const systemInstruction = generateSystemInstruction(expertise);
  return ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction,
    },
    history: convertToContent(initialHistory),
  });
};

export const sendInterviewMessage = async (
  chat: Chat,
  message: string,
  context: Context,
): Promise<string> => {
  try {
    const prompt = `
Field: ${context.expertise}
Phase: ${context.phase}
Question: ${context.currentQuestion}/${context.totalQuestions}

${message}
`;
    const result = await chat.sendMessage({message: prompt});
    return (
      result.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response from AI"
    );
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error("Failed to get response from AI");
  }
};
