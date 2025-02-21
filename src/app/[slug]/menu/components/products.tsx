import { formatCurrency } from "@/helpers/format-currency";
import { Product } from "@prisma/client";
import { Sulphur_Point } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div className="space-y-3 px-5 py-3">
      {products.map((product) => (
        <Link
          href={`/${slug}/menu/${product.id} `}
          key={product.id}
          className="flex items-center justify-between gap-10 border-b py-3"
        >
          {/* esquerda */}
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="pt-3 text-sm font-semibold">
              {formatCurrency(product.price)}
            </p>
          </div>
          {/* direita */}
          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
