import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

interface ConsumptionMethodOption {
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
}

const ConsumptionMethodOption = ({
  imageUrl,
  imageAlt,
  buttonText,
}: ConsumptionMethodOption) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <div className="relative h-[80px] w-[80px]">
          <Image
            src={imageUrl}
            fill
            alt={imageAlt}
            className="object-contain"
          ></Image>
        </div>
        <Button variant="secondary" className="rounded-full">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConsumptionMethodOption;
