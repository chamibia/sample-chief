"use client";

import Image from "next/image";
import { useState, useEffect } from "react"
import { getNames } from "country-list"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { X } from "lucide-react"
import popupImage from "../../public/assets/popupimage.webp"
import {Form, FormControl, FormField, FormItem, FormLabel,FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  country: z.string().min(1, { message: "Please select your country." }),
});

type FormValues = z.infer<typeof formSchema>;

const countries = getNames();

export default function SubscribePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      country: "",
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000)

    return () => clearTimeout(timer);
  }, []);

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Successfully subscribed to our newsletter!",
        });
        setTimeout(() => setIsOpen(false), 3000);
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to subscribe. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-[280px] sm:max-w-xs rounded-lg bg-white shadow-lg overflow-hidden flex flex-col">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
          aria-label="Close"
        >
          <X className="text-white font-bold" size={20} />
        </button>
        <div className="w-full relative h-70">
          <Image
            src="/assets/popupimage.webp"
            alt="Subscribe"
            fill
            className="object-cover object-top"
          />
        </div>
        <div className="w-full p-3 sm:p-4 flex flex-col items-center">
          <h2 className="mb-2 text-lg sm:text-xl font-bold text-center">Join Our Mailing List</h2>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-600 text-center">
            Stay updated with the latest news, events, and releases.
          </p>

          {submitStatus.type && (
            <div
              className={cn(
                "mb-4 rounded-md p-3 text-center",
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              )}
            >
              {submitStatus.message}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full text-sm sm:text-base text-white bg-[#2E8B57] hover:bg-[#2E8B57]/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
