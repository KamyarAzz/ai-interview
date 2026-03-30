export type InterviewRole = "user" | "model";

export interface InterviewMessage {
  role: InterviewRole;
  text: string;
}

export type Context = {
  currentQuestion: number;
  totalQuestions: number;
  phase: "interview" | "feedback";
  expertise: string;
};
