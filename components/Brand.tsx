import Image from "next/image";
import React from "react";

export default function Brand() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-8 bg-gray-200 rounded-md flex justify-center">
        <Image
          src="/images/brands/celcius.svg"
          width={150}
          height={150}
          alt="celcius"
          className="w-auto h-auto"
        />
      </div>
      <div className="p-8 bg-gray-200 rounded-md flex justify-center">
        <Image
          src="/images/brands/celcius-woman.svg"
          width={150}
          height={150}
          alt="celcius-woman"
          className="w-auto h-auto"
        />
      </div>
      <div className="p-8 bg-gray-200 rounded-md flex justify-center">
        <Image
          src="/images/brands/mississippi.svg"
          width={150}
          height={150}
          alt="mississippi"
          className="w-auto h-auto"
        />
      </div>
      <div className="p-8 bg-gray-200 rounded-md flex justify-center">
        <Image
          src="/images/brands/queensland.svg"
          width={150}
          height={150}
          alt="queensland"
          className="w-auto h-auto"
        />
      </div>
    </div>
  );
}
