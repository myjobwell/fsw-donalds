import React, { useContext } from 'react'
import { CartContext, CartProducts } from '../contexts/cart'
import Image from 'next/image'
import { formatCurrency } from '@/helpers/format-currency'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from 'lucide-react'


interface CartItemProps {
  product: CartProducts
}


const CartProductItem = ({product} : CartItemProps) => {

  const {decreaseProductQuantity} = useContext(CartContext)

  return (
    <div className='flex items-center justify-between pb-2'>
         {/* esquerda */}
       <div className='flex items-center gap-3'>
      
         <div className='relative h-20 w-20 bg-gray-200 rounded-xl'>
            <Image
            src={product.imageUrl}
            alt={product.name}
            fill
             />
        </div>
        <div className='space-y-1'>
            <p className='text-xs max-w-[90%] truncate text-ellipsis'>{product.name}</p>
            <p className='text-sm font-semibold'>{formatCurrency(product.price)}</p>
            <div className="flex items-center gap-1 text-center">
               <Button className='w-7 h-7 rounded-lg' variant="outline" onClick={() => {decreaseProductQuantity(product.id)}}>
                <ChevronLeftIcon size={16} />
               </Button>
               <p className='text-xs w-7 '>{product.quantity}</p>
               <Button className='w-7 h-7 rounded-lg' variant="destructive" >
                <ChevronRightIcon  size={16}/>
               </Button>
            </div>

        </div>

       </div>
       {/* BOTAO DE DELETAR */}
       <Button className='h-7 w-7 rounded-lg' variant="outline" >
        <TrashIcon />
       </Button>
      
      
    </div>
  )
}

export default CartProductItem
