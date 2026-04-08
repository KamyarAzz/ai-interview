import type {UserContext} from "@/types/interview";
import {useState} from "react";

type Props = {
  configuration: UserContext;
  setConfiguration: React.Dispatch<React.SetStateAction<UserContext>>;
};

export default function Competencies({configuration, setConfiguration}: Props) {
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
    <div className="flex flex-col gap-2">
      <label
        htmlFor="competencies"
        className="text-sm font-medium text-gray-600"
      >
        Competencies
      </label>

      {/* Input */}
      <div className="flex gap-2">
        <input
          id="competencies"
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
  );
}
