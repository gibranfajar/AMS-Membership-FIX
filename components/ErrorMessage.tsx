import Image from "next/image";
import React from "react";

type ErrorProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorProps) {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-red-600 text-white px-4 py-2 w-full flex gap-2 items-center">
        <Image
          src="/images/triangle-alert.svg"
          width={100}
          height={100}
          alt="error"
          className="w-auto h-auto"
        />
        {message}
      </div>
    </div>
  );
}
