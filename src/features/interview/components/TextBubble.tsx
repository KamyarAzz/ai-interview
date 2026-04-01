import type {InterviewMessage} from "@/types/interview";
import clsx from "clsx";

type Props = {
  message: InterviewMessage;
  animation?: boolean;
};

export default function TextBubble({message, animation}: Props) {
  return (
    <div
      className={clsx(
        "p-2 rounded-md relative wrap-break-word max-w-[80%] sm:max-w-[60%]",
        message.role === "user"
          ? "bg-blue-700 self-end text-white"
          : " bg-gray-200 self-start text-gray-800",
        {"animate-pulse": animation},
      )}
    >
      <div
        className={clsx(
          "w-0 h-0 absolute border-t-6 bottom-1.5 border-b-6 border-l-6 border-t-transparent border-b-transparent",
          message.role === "user"
            ? "border-l-blue-700 -right-1 "
            : "border-l-gray-200 -left-1 rotate-180",
        )}
      />
      <p className="wrap-break-words">{message.text}</p>
    </div>
  );
}
