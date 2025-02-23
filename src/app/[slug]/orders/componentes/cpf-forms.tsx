"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { z } from 'zod'

import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { removeCpfPunctuation, validateCPF } from '../../menu/helpers/cpf';



const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "CPF obrigatório!",
    })
    .refine((value) => validateCPF(value), {
      message: "CPF inválido!",
    }),
});


type FormSchema = z.infer<typeof formSchema>


const CpfForm = () => {

    const form = useForm<FormSchema> ({
        resolver: zodResolver(formSchema),


    })

    const pathName = usePathname();

    const onSubmit = (data: FormSchema) => {
        router.replace(`${pathName}?cpf=${removeCpfPunctuation(data.cpf)}`);

    }

    const router = useRouter();

    const handleCancel = () => {
        router.back();


    } 


  return (
    <div>
        <Drawer open>
 
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Visualizar Pedidos</DrawerTitle>
      <DrawerDescription>Insira o seu CPF abaixo para visualizar os seus pedidos</DrawerDescription>
    </DrawerHeader>


    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem className='px-4'>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <PatternFormat
                          placeholder="Digite o seu CPF..."
                          format="###.###.###-##"
                          customInput={Input}
                          {...field}
                        >
                          {/* <Input placeholder="Digite o CPF" {...field} /> */}
                        </PatternFormat>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
        
    <DrawerFooter>
      <Button variant="destructive" className='w-full rounded-full'>Confirmar</Button>
      <DrawerClose asChild>
        <Button variant="outline" className='w-full rounded-full' onClick={handleCancel}>Cancelar</Button>
      </DrawerClose>
    </DrawerFooter>
      </form>
    </Form>
   



  </DrawerContent>
</Drawer>

      
    </div>
  )
}

export default CpfForm
