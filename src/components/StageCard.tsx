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

export default function StageCard({
  index,
  name,
  date,
  image,
}: StageCardProps) {
  const router = useRouter();
  const currentDate = new Date();
  const unlockDate = new Date(date);

  const isLocked = unlockDate > currentDate;
  
  const day = String(unlockDate.getDate()).padStart(2, "0");
  const month = String(unlockDate.getMonth() + 1).padStart(2, "0");
  const year = unlockDate.getFullYear();
  const hours = String(unlockDate.getHours()).padStart(2, "0");
  const minutes = String(unlockDate.getMinutes()).padStart(2, "0");
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

  const handleClick = () => {
    if (!isLocked) {
      router.push(`stage-${index}`);
    }
  };

  return (
    <div
      className={`p-4 m-4 rounded-lg transition-transform transform ${
        isLocked
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-white text-black hover:shadow-lg hover:scale-105"
      } flex flex-col justify-between`}
    >
      <Image
        src={image}
        className={`m-auto rounded-md ${
          isLocked ? "opacity-50 grayscale" : ""
        }`}
        alt="stage image"
        width={150}
        height={150}
      />
      <div className="text-center mb-4">
        <p className={`font-bold ${isLocked ? "text-gray-400" : ""}`}>{name}</p>
        <CountdownTimer targetDate={date} />
        {isLocked && (
          <p className="text-sm mt-2">Kilit Açılma Tarihi {formattedDate}</p>
        )}
      </div>
      <Button
        className={`w-full ${
          isLocked
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-black hover:bg-gray-800 text-white"
        }`}
        onClick={handleClick}
        disabled={isLocked}
      >
        {isLocked ? "Kilitli" : "Başla"}
      </Button>
    </div>
  );
}
