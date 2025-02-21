import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import ProductHeader from "./components/product-header";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;

  //esse trecho é como se fosse um select onde ele usa o prisma para consultar na tabela produto pelo id
  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product) {
    return notFound();
  }

  return <ProductHeader product={product} />;
};

export default ProductPage;
