import type {UserContext} from "@/types/interview";
import React from "react";

type Props = {
  configuration: UserContext;
  setConfiguration: React.Dispatch<React.SetStateAction<UserContext>>;
};

export default function TimeLimit({configuration, setConfiguration}: Props) {
  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) =>
    setConfiguration({
      ...configuration,
      timeLimitEnabled: e.target.checked,
    });

  return (
    <div className="flex items-center justify-between">
      <label
        htmlFor="timeLimit"
        className="text-sm font-medium text-gray-600 dark:text-gray-200"
      >
        Time Limit Enabled
      </label>
      <input
        type="checkbox"
        id="timeLimit"
        className="w-5 h-5 cursor-pointer accent-blue-500"
        checked={configuration.timeLimitEnabled}
        onChange={changeHandler}
      />
    </div>
  );
}
