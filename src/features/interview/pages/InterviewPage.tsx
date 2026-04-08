import Container from "@/components/ui/Container";
import InterviewChat from "../components/interview-chat/InterviewChat";

export default function InterviewPage() {
  return (
    <div className="flex flex-col w-full h-full">
      <Container className="w-full! h-full">
        <InterviewChat />
      </Container>
    </div>
  );
}
