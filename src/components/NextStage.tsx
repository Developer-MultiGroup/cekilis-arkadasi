import CountdownTimer from "./CountdownTimer";
import stages from "@/data/stages";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NextStage({
  stage,
  mode,
}: {
  stage: number;
  mode: string;
}) {
  if (mode == "card") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sonraki Aşama Yakında!</CardTitle>
          <CardDescription>Aşama {stage} için kalan süre:</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-extrabold animate-pulse">
            {<CountdownTimer targetDate={stages[stage - 1].start_date} />}
          </div>
        </CardContent>
      </Card>
    );
  } else if (mode == "text") {
    return (
      <div className="my-4 text-5xl font-extrabold animate-pulse">
        <CountdownTimer targetDate={stages[stage - 1].start_date} />
      </div>
    );
  }
}
