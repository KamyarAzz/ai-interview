import type {ExperienceLevel, UserContext} from "@/types/interview";

type Props = {
  configuration: UserContext;
  setConfiguration: React.Dispatch<React.SetStateAction<UserContext>>;
};

type Experience = {
  title: string;
  value: ExperienceLevel;
};

export default function Experience({configuration, setConfiguration}: Props) {
  const experiences: Experience[] = [
    {title: "Intern (0 years)", value: "Intern"},
    {title: "Junior (1–2 years)", value: "Junior"},
    {title: "Mid (3–5 years)", value: "Mid"},
    {title: "Senior (5–8 years)", value: "Senior"},
    {title: "Lead (8+ years)", value: "Lead"},
  ];

  const changeHanlder = (
    e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) =>
    setConfiguration({
      ...configuration,
      experience: e.target.value as ExperienceLevel,
    });

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="experience" className="text-sm font-medium text-gray-600">
        Experience
      </label>
      <select
        id="experience"
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={configuration.experience}
        onChange={changeHanlder}
      >
        {experiences.map((experience) => (
          <option value={experience.value}>{experience.title}</option>
        ))}
      </select>
    </div>
  );
}
