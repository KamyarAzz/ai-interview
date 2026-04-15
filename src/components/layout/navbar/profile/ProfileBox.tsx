import {useEffect, useRef} from "react";
import type {UserDoc} from "@/types/user";

type Props = {
  user: UserDoc | null;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProfileBox({user, setIsOpened}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpened(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpened]);

  return (
    <div
      ref={ref}
      className="absolute shadow top-16 right-6 flex flex-col gap-2 bg-white rounded-md p-4 w-min cursor-auto"
    >
      {user?.displayName || user?.email}
      <p className="cursor-pointer hover:text-blue-700 duration-100">
        Settings
      </p>
      <p className="cursor-pointer hover:text-blue-700 duration-100">Logout</p>
    </div>
  );
}
