import Container from "@/components/ui/Container";
import {type ReactNode} from "react";

type Props = {children: ReactNode};

export default function PageLayout({children}: Props) {
  return (
    <div className="w-full h-full flex-col gap-4 p-4 md:p-6">
      <h1 className="text-3xl text-center font-bold">AI INTERVIEW</h1>
      <Container className="w-full sm:w-64 md:w-80 lg:w-96 mt-10">
        {children}
      </Container>
    </div>
  );
}
