import clsx from "clsx";
import {type ReactNode} from "react";

type Props = {children: ReactNode; className: string};

export default function Container({children, className}: Props) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4 py-4 px-8 mx-auto rounded-md shadow w-min mt-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
