import React from "react";
import { db } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantePageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantePage = async ({ params }: RestaurantePageProps) => {
  const { slug } = await params;

  const restaurant = await db.restaurant.findUnique({ where: { slug: slug } });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/* LOGO E TÍTULO  */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      {/* BOAS VINDAS  */}
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos a lhe oferecer
          praticidade e sabor em cada detalhes
        </p>
      </div>
      {/* OPÇÕES */}
      <div className="grid grid-cols-2 gap-4 pt-14">
        {/* <Card>
          <CardContent className="flex flex-col items-center gap-8 py-8">
            <Image
              src="/dine_in.png"
              width={78}
              height={80}
              alt="Para comer aqui"
              className="object-contain"
            ></Image>
            <Button variant="secondary" className="rounded-full">
              Para comer aqui
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-8 py-8">
            <div className="relative h-[80px] w-[80px]">
              <Image src="/takeaway.png" fill alt="para levar"></Image>
            </div>
            <Button variant="secondary" className="rounded-full">
              Para levar
            </Button>
          </CardContent>
        </Card> */}

        <ConsumptionMethodOption
          imageUrl="/dine_in.png"
          imageAlt="Para comer aqui"
          buttonText="Para comer aqui"
        />
        <ConsumptionMethodOption
          imageUrl="/takeaway.png"
          imageAlt="Para levar"
          buttonText="Para levar"
        />
      </div>
    </div>
  );
};

export default RestaurantePage;
