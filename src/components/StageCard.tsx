import Image from "next/image";
import { Button } from "./ui/button";
import CountdownTimer from "./CountdownTimer";
import { useRouter } from "next/navigation";

interface StageCardProps {
  index: number;
  name: string;
  date: string;
  image: string;
}

export default function StageCard({ index, name, date, image }: StageCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`stage-${index}`)
  }

  return (
    <div className="bg-gray-50 p-4 m-4 rounded-lg">
      <Image
        src={image}
        className="m-auto"
        alt="stage image"
        width={150}
        height={150}
      />
      <div className="text-center">
        <p className="font-bold">{name}</p>
        <CountdownTimer targetDate={date}/>
      </div>
      <Button className="w-full mt-2" onClick={handleClick}>Başla</Button>
    </div>
  );
}
