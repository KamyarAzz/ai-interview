import Container from "@/components/ui/Container";
import RadarChart from "../components/charts/RadarChart";

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full h-full">
      <Container className="w-full! h-full">
        <RadarChart />
      </Container>
    </div>
  );
}
