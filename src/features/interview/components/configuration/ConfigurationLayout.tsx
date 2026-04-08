import Container from "@/components/ui/Container";
import {useInterviewContextStore} from "@/stores/interviewContextStore";
import type {UserContext} from "@/types/interview";
import {useState} from "react";
import {useNavigate} from "react-router";
import Competencies from "./inputs/Competencies";
import Experience from "./inputs/Experience";
import TimeLimit from "./inputs/TimeLimit";
import Expertise from "./inputs/Expertise";

export default function ConfigurationLayout() {
  const [configuration, setConfiguration] = useState<UserContext>({
    expertise: "",
    experience: "Intern",
    competencies: [],
    timeLimitEnabled: true,
  });

  const navigate = useNavigate();
  const setContext = useInterviewContextStore((state) => state.setContext);

  const handleProceed = () => {
    if (configuration.expertise.trim() === "") {
      alert("Please enter your area of expertise.");
      return;
    }
    setContext({
      ...configuration,
      totalQuestions: 6,
      currentQuestion: 0,
      phase: "interview",
    });
    navigate("/interview/chat");
  };

  return (
    // <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md flex flex-col gap-6">
    <Container className="w-full max-w-xl p-6 gap-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Configuration Inputs
      </h1>

      {/* Expertise */}
      <Expertise
        configuration={configuration}
        setConfiguration={setConfiguration}
      />

      {/* Experience */}
      <Experience
        configuration={configuration}
        setConfiguration={setConfiguration}
      />

      {/* Competencies */}
      <Competencies
        configuration={configuration}
        setConfiguration={setConfiguration}
      />

      {/* Time Limit */}
      <TimeLimit
        configuration={configuration}
        setConfiguration={setConfiguration}
      />

      {/* Button */}
      <button
        className="bg-blue-500 cursor-pointer text-white py-3 rounded-xl hover:bg-blue-600 transition font-medium"
        onClick={handleProceed}
      >
        Proceed to Interview
      </button>
    </Container>
  );
}
