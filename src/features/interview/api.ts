import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import {db} from "../../lib/firebase";
import type {InterviewContext, InterviewMessage} from "../../types/interview";

// Define the Interview document structure
export interface InterviewDocument {
  id?: string;
  userId: string;
  context: InterviewContext;
  messages: InterviewMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// POST: Create a new interview
export const createInterview = async (
  interviewData: Omit<InterviewDocument, "id" | "createdAt" | "updatedAt">,
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "interviews"), {
      ...interviewData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating interview:", error);
    throw error;
  }
};

// GET: Fetch interviews for a user
export const getInterviewsByUser = async (
  userId: string,
): Promise<InterviewDocument[]> => {
  try {
    const q = query(
      collection(db, "interviews"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);
    const interviews: InterviewDocument[] = [];
    querySnapshot.forEach((doc) => {
      interviews.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      } as InterviewDocument);
    });
    return interviews;
  } catch (error) {
    console.error("Error fetching interviews:", error);
    throw error;
  }
};

// GET: Fetch all interviews (admin use, perhaps)
export const getAllInterviews = async (): Promise<InterviewDocument[]> => {
  try {
    const q = query(collection(db, "interviews"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const interviews: InterviewDocument[] = [];
    querySnapshot.forEach((doc) => {
      interviews.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      } as InterviewDocument);
    });
    return interviews;
  } catch (error) {
    console.error("Error fetching all interviews:", error);
    throw error;
  }
};
