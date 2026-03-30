export type InterviewRole = "user" | "model";

export interface InterviewMessage {
  role: InterviewRole;
  text: string;
}

export type ExperienceLevel = "Intern" | "Junior" | "Mid" | "Senior" | "Lead";

export type InterviewContext = {
  expertise: string;
  experience: ExperienceLevel;
  competencies?: string[];
  phase: "interview" | "feedback";
  currentQuestion?: number;
  totalQuestions: number;
  timePerQuestion?: number;
  timeLimitEnabled?: boolean;
};
