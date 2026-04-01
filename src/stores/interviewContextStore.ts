import {create} from "zustand";
import type {InterviewContext} from "@/types/interview";

interface ContextState {
  context: InterviewContext;
  setContext: (context: InterviewContext) => void;
}

const initialContext: InterviewContext = {
  expertise: "",
  experience: "Intern",
  competencies: [],
  timeLimitEnabled: true,
  totalQuestions: 6,
  currentQuestion: 0,
  phase: "interview",
};

export const useInterviewContextStore = create<ContextState>((set) => ({
  context: initialContext,
  setContext: (context) => set({context}),
}));
