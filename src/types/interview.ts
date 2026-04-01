export type InterviewRole = "user" | "model";

export type InterviewMessageType = "question" | "clarification";

export type ExperienceLevel = "Intern" | "Junior" | "Mid" | "Senior" | "Lead";

export type InterviewPhase = "interview" | "feedback";
export interface InterviewMessage {
  role: InterviewRole;
  text: string;
}

export interface InterviewQuestion {
  messageType: InterviewMessageType;
  message: string;
  timeLimit: number;
}

export interface Feedback {
  scores: {
    communication: number;
    domainKnowledge: number;
    problemSolving: number;
    confidence: number;
  };
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  finalSummary: string;
}

export interface UserContext {
  expertise: string;
  experience: ExperienceLevel;
  competencies: string[];
  timeLimitEnabled: boolean;
}

export interface InterviewContext extends UserContext {
  totalQuestions: number;
  currentQuestion?: number;
  phase: InterviewPhase;
}
