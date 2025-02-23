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
import React from "react";
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

const FinishOrderButton = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    return console.log({ data });
  };

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="w-full rounded-full">Finalizar Pedido</Button>
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
                  >
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

export default FinishOrderButton;
