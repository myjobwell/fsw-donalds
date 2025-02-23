import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React, { useContext } from 'react'
import { CartContext } from '../contexts/cart'
import CartProductItem from './cart-product-item';
import { privateDecrypt } from 'crypto';

const CartSheet = () => {

    const {isOpen, toggleCart, products} = useContext(CartContext);

    return (
    <div>
      <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent className='w-[80%]'>
          <SheetHeader>
            <SheetTitle className='text-left'>SACOLA</SheetTitle>
       
          </SheetHeader>
          <div className='py-5'>
          {products.map((product) => (
            
            <CartProductItem key={product.id} product={product} />
            
            // <h1 key={product.id}>{product.name} - {product.quantity}</h1>
          ))}

          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default CartSheet
