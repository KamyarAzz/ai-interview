import type {ExperienceLevel, UserContext} from "@/types/interview";
import {useState} from "react";
import {useNavigate} from "react-router";

export default function ConfigurationInputs() {
  const [configuration, setConfiguration] = useState<UserContext>({
    expertise: "",
    experience: "Intern",
    competencies: [],
    timeLimitEnabled: true,
  });

  const navigate = useNavigate();

  const handleProceed = () => {
    if (configuration.expertise.trim() === "") {
      alert("Please enter your area of expertise.");
      return;
    }
    navigate("/interview");
  };

  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !configuration.competencies.includes(trimmed)) {
      setConfiguration({
        ...configuration,
        competencies: [...configuration.competencies, trimmed],
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setConfiguration({
      ...configuration,
      competencies: configuration.competencies.filter((s) => s !== skill),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Configuration Inputs
      </h1>

      {/* Expertise */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Expertise</label>
        <input
          type="text"
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={configuration.expertise}
          onChange={(e) =>
            setConfiguration({...configuration, expertise: e.target.value})
          }
        />
      </div>

      {/* Experience */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Experience</label>
        <select
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={configuration.experience}
          onChange={(e) =>
            setConfiguration({
              ...configuration,
              experience: e.target.value as ExperienceLevel,
            })
          }
        >
          <option value="Intern">Intern (0 years)</option>
          <option value="Junior">Junior (1–2 years)</option>
          <option value="Mid">Mid (3–5 years)</option>
          <option value="Senior">Senior (5–8 years)</option>
          <option value="Lead">Lead (8+ years)</option>
        </select>
      </div>

      {/* Competencies */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">
          Competencies
        </label>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a skill and press Enter"
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={addSkill}
            disabled={
              skillInput.trim() === "" ||
              configuration.competencies.includes(skillInput.trim()) ||
              configuration.competencies.length >= 10
            }
            className="bg-blue-500 cursor-pointer disabled:cursor-auto disabled:bg-gray-300 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        {/* Skills list */}
        <div className="flex flex-wrap gap-2">
          {configuration.competencies.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="text-blue-500 cursor-pointer hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Time Limit */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-600">
          Time Limit Enabled
        </label>
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={configuration.timeLimitEnabled}
          onChange={(e) =>
            setConfiguration({
              ...configuration,
              timeLimitEnabled: e.target.checked,
            })
          }
        />
      </div>

      {/* Button */}
      <button
        className="bg-blue-500 cursor-pointer text-white py-3 rounded-xl hover:bg-blue-600 transition font-medium"
        onClick={handleProceed}
      >
        Proceed to Interview
      </button>
    </div>
  );
}
