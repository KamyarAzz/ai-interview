import {useEffect, useRef} from "react";
import type {AppUser} from "@/types/user";

type Props = {
  user: AppUser | null;
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
      className="absolute top-16 right-0 bg-white shadow-lg rounded-md p-4 w-min cursor-auto"
    >
      {user?.displayName || user?.email}
      <p>Profile Options</p>
    </div>
  );
}
