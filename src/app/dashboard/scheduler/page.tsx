import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SchedulerForm } from "./scheduler-form";

export default function SchedulerPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Event Scheduler</CardTitle>
        <CardDescription>
          Get AI-powered recommendations for the best time to schedule your next
          running event based on weather conditions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SchedulerForm />
      </CardContent>
    </Card>
  );
}
