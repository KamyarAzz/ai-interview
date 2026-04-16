import {useAuth} from "@/features/auth/hooks/useAuth";
import {db} from "@/lib/firebase";
import {useAuthStore} from "@/stores/authStore";
import {useInterviewContextStore} from "@/stores/interviewContextStore";
import type {
  InterviewContext,
  InterviewMessage,
  UserContext,
} from "@/types/interview";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import {useState} from "react";
import {toast} from "react-toastify";

export default function useInterview() {
  const [loading, setLoading] = useState(false);
  const setContext = useInterviewContextStore((state) => state.setContext);
  const user = useAuthStore((s) => s.user);
  const {logout} = useAuth();

  const createInterview = async (configuration: UserContext) => {
    if (!user) {
      toast("You must be logged in to create an interview");
      logout();
      return;
    }
    const interviewContext: InterviewContext = {
      ...configuration,
      totalQuestions: 6,
      currentQuestion: 0,
      phase: "interview",
    };
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "interviews"), {
        userId: user.uid,
        ...interviewContext,
      });
      setContext(interviewContext);
      return docRef.id;
    } catch (e) {
      console.error("Error creating interview: ", e);
      toast("Error creating interview");
    } finally {
      setLoading(false);
    }
  };

  const updateInterview = async (
    interviewId: string,
    newMessages: InterviewMessage[],
  ) => {
    try {
      await updateDoc(doc(db, "interviews", interviewId), {
        messages: arrayUnion(...newMessages),
      });
    } catch (e) {
      console.error("Error updating interview: ", e);
      toast("Error updating interview");
    }
  };

  return {
    loading,
    createInterview,
    updateInterview,
  };
}
