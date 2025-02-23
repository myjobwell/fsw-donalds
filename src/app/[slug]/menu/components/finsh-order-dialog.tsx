"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import React, { useContext, useTransition } from "react";
import { z } from "zod";
import { validateCPF } from "../helpers/cpf";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PatternFormat } from "react-number-format";
import { createOrder } from "../actions/create-order";
import { useParams, useSearchParams } from "next/navigation";
import { ConsumptionMethod } from "@prisma/client";
import { CartContext } from "../contexts/cart";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O campo é obrigatório!",
  }),
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

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useContext(CartContext);
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      const consumptionMethod = searchParams.get(
        "consumptionMethod",
      ) as ConsumptionMethod;
 startTransition( async () => {

  await createOrder({
    consumptionMethod,
    customerCpf: data.cpf,
    customerName: data.name,
    products,
    slug,
  });
  onOpenChange(false);
  toast.success("Pedido finalizado com sucesso!")
 }) 
      
     

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
          {/* <Button className="w-full rounded-full">Finalizar Pedido</Button> */}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Finalizar Pedido</DrawerTitle>
            <DrawerDescription>
              Insira suas informações abaixo para finalizar o seu pedido!
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu nome" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
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
                  <Button
                    type="submit"
                    variant="destructive"
                    className="rounded-full"
                    disabled={isPending}
                  >
                    {isPending && <Loader2Icon className="animate-spin"/>}
                    Finalizar
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="secondary" className="w-full rounded-full">
                      Cancelar
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </Form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FinishOrderDialog;
