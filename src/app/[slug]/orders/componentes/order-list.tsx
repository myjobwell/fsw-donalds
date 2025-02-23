"use client"
import { OrderStatus, Prisma } from '@prisma/client';
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react'
import Image from 'next/image';
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/helpers/format-currency';
import { useParams, useRouter } from 'next/navigation';

interface OrderListProps {
    orders: Prisma.OrderGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true,
                }
            };
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    }>[];
  }

  const getStatusLabel = (status: OrderStatus) => {
    if (status === 'FINISHED') return 'Finalizado';
    if (status === 'IN_PREPARATION') return 'Em preparo';
    if (status === 'PENDING') return 'Pendente';
    return "";


  }


const OrderList = ({ orders }: OrderListProps) => {

    const {slug} = useParams<{slug: string}>();

    const router = useRouter();
    // const handleBackClick = () => router.back();
    const handleBackClick = () => router.back();
  return (
    <div className='space-y-6 p-6'>
        <Button size="icon" variant="secondary" className='rounded-full' onClick={handleBackClick}>
            <ChevronLeftIcon />
        </Button>
        <div className="flex items-center gap-3">
            <ScrollTextIcon/> 
            <h2 className="text-lg font-semibold">
                Meus Pedidos
            </h2>

        </div>
        {orders.map(order => (
            <Card key={order.id}>
                <CardContent className='p-5 space-y-4'>
                    <div className={`w-fit text-white rounded-full px-2 py-1 text-xs font-semibold

                            ${order.status === OrderStatus.FINISHED ? "bg-green-500 text-white" : 
                                order.status === OrderStatus.IN_PREPARATION ? "bg-yellow-500 text-white" : 
                                "bg-gray-200 text-gray-500"
                            }
                        
                        
                        `}>
                        <p>{getStatusLabel(order.status)}</p>
                    </div>
                    <div className=" flex items-center gap-2">
                        <div className="relative h-5 w-5">
                            <Image
                            fill
                            src={order.restaurant.avatarImageUrl}
                            alt={order.restaurant.name}
                            className='rounded-sm' />

                        </div>
                        <p className='text-sm font-semibold'>
                            {order.restaurant.name}
                        </p>
                    </div>
                    <Separator />

                    <div className='space-y-2'>

                    {order.orderProducts.map(product => (
                        <div key={product.id} className='flex items-center gap-2'>
                            <div className='text-xs font-semibold rounded-full bg-gray-400 text-white h-5 w-5 flex items-center justify-center'>
                                {product.quantity}
                            </div>
                            <div className='flex items-center justify-between w-full'>
                            <p className='text-sm'>{product.product.name}</p>
                            <p className='text-xs font-semibold'> {formatCurrency(product.product.price * product.quantity )}</p>

                            </div>

                        </div>
                    ))}

                    </div>

                    <Separator />
                    <p className='text-sm font-bold'>TOTAL: {formatCurrency(order.total)}</p>


                    


                </CardContent>
            </Card>
        ))}
      
    </div>
  )
}

export default OrderList
