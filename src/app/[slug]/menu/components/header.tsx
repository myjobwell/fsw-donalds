"use client";

import { Restaurant } from "@prisma/client";
import { Pick } from "@prisma/client/runtime/library";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";

interface RestauranteHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

const RestaurantHeader = ({ restaurant }: RestauranteHeaderProps) => {
  const {slug} = useParams<{slug: string}>()
  const router = useRouter();
  const handleBackClick = () => router.back();
  const handleOrdersClick = () => router.push(`/${slug}/orders`)

  return (
    <div className="relative h-[250px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
        onClick={handleOrdersClick}
      >
        <ScrollTextIcon />
      </Button>
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
    </div>
  );
};

export default RestaurantHeader;
