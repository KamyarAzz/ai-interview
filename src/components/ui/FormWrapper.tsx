import {type ReactNode, type ComponentPropsWithRef} from "react";

interface Props extends ComponentPropsWithRef<"form"> {
  children: ReactNode;
}

export default function FormWrapper({children, ...props}: Props) {
  return (
    <form className="flex flex-col gap-2" {...props}>
      {children}
    </form>
  );
}
