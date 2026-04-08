import type {UserContext} from "@/types/interview";
import React from "react";

type Props = {
  configuration: UserContext;
  setConfiguration: React.Dispatch<React.SetStateAction<UserContext>>;
};

export default function Expertise({configuration, setConfiguration}: Props) {
  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setConfiguration({...configuration, expertise: e.target.value});
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="expertise"
        className="text-sm font-medium text-gray-600 dark:text-gray-200"
      >
        Expertise
      </label>
      <input
        id="expertise"
        type="text"
        className="border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary dark:border-border"
        value={configuration.expertise}
        onChange={changeHandler}
      />
    </div>
  );
}
