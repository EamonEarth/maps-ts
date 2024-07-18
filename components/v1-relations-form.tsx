"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from "react-hook-form"
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "./ui/select";
import { Input } from './ui/input';
import { AirtableRecord } from '@/app/stakeholder-map/page';

const formSchema = z.object({
    sourceName: z.string().min(1),
    targetName: z.string().min(1)
})

type RelationFormValues = z.infer<typeof formSchema>

interface RelationFormProps {
}

export const StakeholderRelationForm: React.FC<RelationFormProps> =({}) => {
    const form = useForm<RelationFormValues>({
        resolver: zodResolver(formSchema)
    })


    const onSubmit = () => {}

    return (
        <div className="flex items-center justify-between">
            <Form {...form}>
                <form
                className="space-y-8 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="sourceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OG SH </FormLabel>
                  <FormControl>
                  <Select
              onValueChange={(value) =>{ (value)}}
              value=""
            >
              <SelectTrigger className="">
                <SelectValue className="" placeholder="Type" />
              </SelectTrigger>
              <SelectContent>

                <SelectItem value="NGO">NGO</SelectItem>
                <SelectItem value="Local Government">Local Govt.</SelectItem>
                <SelectItem value="Consultant">Consultants</SelectItem>
                <SelectItem value="First Peoples">First Peoples</SelectItem>
              </SelectContent>
            </Select>
                    <Input  placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            //   control={form.control}
              name="targetName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stakeholder to link to </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Their name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
                

                </form>

            </Form>
             
        </div>
    )
}