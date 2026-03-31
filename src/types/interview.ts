export type InterviewRole = "user" | "model";

export type InterviewMessageType = "question" | "clarification";

export interface InterviewMessage {
  role: InterviewRole;
  text: string;
}

export type ExperienceLevel = "Intern" | "Junior" | "Mid" | "Senior" | "Lead";

export type InterviewPhase = "interview" | "feedback";

export type InterviewQuestion = {
  messageType: InterviewMessageType;
  message: string;
  timeLimit: number;
};

export type Feedback = {
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
};

export type InterviewContext = {
  expertise: string;
  experience: ExperienceLevel;
  competencies?: string[];
  phase: InterviewPhase;
  currentQuestion?: number;
  totalQuestions: number;
  timeLimitEnabled: boolean;
};
