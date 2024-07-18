"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";


const formSchema = z.object({
  name: z.string().min(1),
  service: z.string().min(1),
  cluster: z.string().min(1),
  subcluster: z.string().min(1),
  city: z.string().min(1),
  region: z.string().min(1),
  website: z.string().min(1),
  email: z.string().min(1),
  phone: z.number(),
  orgEmail: z.string().min(1),
  isMember: z.boolean().default(false).optional(),
  contact: z.string().min(1),
  contactEmail: z.string().min(1),
  focus: z.string().min(1),
});

type StakeholderFormValues = z.infer<typeof formSchema>;

interface StakeholderFormProps {}

export const StakeholderForm: React.FC<StakeholderFormProps> = ({}) => {
  //   const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  //   const params = useParams();
  //   const router = useRouter();

  const form = useForm<StakeholderFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: StakeholderFormValues) => {
    try {
      setLoading(true);
      console.log(data);

      await axios.post(`/api/stakeholders`, data);
      //   router.push(`/${params.storeId}/categories`);
      //   router.refresh();
      //   toast.success(toastMessage);
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  //   const onDelete = async () => {
  //     try {
  //       setLoading(true);
  //       await axios.delete(
  //         `/api/${params.storeId}/categories/${params.categoryId}`
  //       );
  //       router.refresh();
  //       router.push(`/${params.storeId}/categories`);
  //       toast.success("Category deleted");
  //     } catch (error) {
  //       toast.error("Make sure you've removed all categories");
  //     } finally {
  //       setLoading(false);
  //       setOpen(false);
  //     }
  //   };

  return (
    <div className="flex items-center justify-between">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name </FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Service"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
};
