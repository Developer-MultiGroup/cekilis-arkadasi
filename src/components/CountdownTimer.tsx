import React from "react";
import { useCountdown } from "@/lib/useCountdown";

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const { days, hours, minutes, seconds } = useCountdown(new Date(targetDate));

  return (
    <div className="text-center">
      <p className="text-2xl">
        {days}g {hours}sa {minutes}d {seconds}s
      </p>
    </div>
  );
}
