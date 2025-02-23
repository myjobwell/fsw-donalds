import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React, { useContext } from 'react'
import { CartContext } from '../contexts/cart'
import CartProductItem from './cart-product-item';
import { privateDecrypt } from 'crypto';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/helpers/format-currency';
import FinishOrderButton from './finsh-order-button';

const CartSheet = () => {

    const {isOpen, toggleCart, products, total} = useContext(CartContext);

    return (
    <div>
      <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent className='w-[80%]'>
          <SheetHeader>
            <SheetTitle className='text-left'>SACOLA</SheetTitle>
       
          </SheetHeader>
          <div className='py-5 flex flex-col h-full'>
            <div className='flex-auto'>
            {products.map((product) => (
            <CartProductItem key={product.id} product={product} />
            ))}
            </div>

           
           <Card className='mb-6'>
            <CardContent className='p-5'>
              <div className="flex justify-between">
                <p className='text-sm text-muted-foreground'>Total</p>
                <p className='text-sm font-semibold'>{formatCurrency(total)}</p>
              </div>

            </CardContent>

           </Card>

          {/* <Button className='w-full rounded-full'>Finalizar Pedido</Button> */}
          <FinishOrderButton />
           

          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default CartSheet
