"use client";
import { Product } from "@prisma/client";
import { createContext, ReactNode, use, useState } from "react";

// Esse picl é como se fosse um dto que tras apenas os dados que preciso se eu deixar tudo apenas Product 
// ele vai pegar todos os dados com o pick eu faco uma especie de seleção de dados
export interface CartProducts extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProducts[];
  toggleCart: () => void;
  addProduct: (product: CartProducts) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProducts[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const addProduct = (product: CartProducts) => {
    const productIsAlreadyOnTheCart = products.some (
      (prevProduct) => prevProduct.id === product.id,
    );
     if (!productIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product])
     }

     setProducts(prevProduct => {
      return prevProduct.map(prevProduct => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          }
        }
        return prevProduct
      })
      
    } )



  }

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
