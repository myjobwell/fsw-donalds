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
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
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

  const decreaseProductQuantity = (producId: string) => {
    setProducts(prevProduct => {
      return prevProduct.map(prevProduct => {
        // if (prevProduct.id === producId) {

        //   if(prevProduct.quantity === 1) {
        //     return prevProduct;
        //   }

        //   return{...prevProduct, quantity: prevProduct.quantity -1 }
        // }

        if(prevProduct.id !== producId) {
          return prevProduct;
        }

        if(prevProduct.quantity === 1) {
          return prevProduct;
        }

        return { ...prevProduct, quantity: prevProduct.quantity - 1}

      })
    })
  }

  const increaseProductQuantity = (producId: string) => {
    setProducts(prevProduct => {
      return prevProduct.map(prevProduct => {
        if(prevProduct.id !== producId) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity +1 }

      })
    })
  }

  const removeProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(prevProduct => prevProduct.id !== productId ))
  }


  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
