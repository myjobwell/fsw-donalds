import React from 'react'
import CpfForm from './componentes/cpf-forms';
import { isValid } from 'zod';
import { removeCpfPunctuation, validateCPF } from '../menu/helpers/cpf';
import { db } from '@/lib/prisma';
import OrderList from './componentes/order-list';

interface OrdersPageProps {
    searchParams: Promise<{cpf: string}>;


}

const OrdesPage = async ({searchParams}: OrdersPageProps  ) => {
    const { cpf } = await searchParams;

    if (!cpf) {
       return <CpfForm />

    }

    if(!validateCPF(cpf)) {
        return <CpfForm />
    }

    const orders = await db.order.findMany({

        orderBy: {
            createdAt: 'desc'
        },

        where: {
            customerCpf: removeCpfPunctuation(cpf)
        }, 
        include: {
            restaurant: {
                select: {
                   name: true,
                   avatarImageUrl: true

                }
            },
            orderProducts: {
               include: {
                product: true
               }

            }
        }
    })
        
    return <OrderList orders={orders} />

}

export default OrdesPage


