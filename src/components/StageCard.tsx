import Image from "next/image";
import { Button } from "./ui/button";
import CountdownTimer from "./CountdownTimer";
import { useRouter } from "next/navigation";

interface StageCardProps {
  index: number;
  name: string;
  date: string;
}

export default function StageCard({ index, name, date }: StageCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`stage-${index}`)
  }

  return (
    <div className="bg-gray-50 p-4 m-4 rounded-lg">
      <Image
        src="/images/dmg-santa-hat.png"
        className="m-auto"
        alt="stage image"
        width={125}
        height={125}
      />
      <div className="text-center">
        <p className="font-bold">{name}</p>
        <CountdownTimer targetDate={date}/>
      </div>
      <Button className="w-full mt-2" onClick={handleClick}>Start</Button>
    </div>
  );
}
