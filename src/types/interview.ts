export type InterviewRole = "user" | "model";

export interface InterviewMessage {
  role: InterviewRole;
  text: string;
}
