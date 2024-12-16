import Image from "next/image";

export default function Loading() {
    return (
      <div className="bg-black h-screen flex justify-center items-center">
        <Image
          src="/images/logo-wide-white.png"
          alt="Loading..."
          width={250}
          height={250}
          className="animate-pulse"
        />
      </div>
    );
  }
  