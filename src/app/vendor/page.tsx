"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Le nom de l'entreprise doit contenir au moins 2 caractères.",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères.",
  }),
  whatsappNumber: z.string().min(10, {
    message: "Veuillez entrer un numéro WhatsApp valide.",
  }),
  address: z.string().min(5, {
    message: "L'adresse doit contenir au moins 5 caractères.",
  }),
});

export default function VendorProfilePage() {
  const [loading, setLoading] = useState(false);
 const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      description: "",
      whatsappNumber: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await fetch("/api/vendor/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du profil vendeur");
      }

      toast.success("Profil vendeur créé avec succès!");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la création du profil");
    } finally {
      setLoading(false);
      router.push('/');
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Créer votre profil vendeur</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l'entreprise</FormLabel>
                <FormControl>
                  <Input placeholder="Votre entreprise" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Décrivez votre entreprise..." 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="whatsappNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro WhatsApp</FormLabel>
                <FormControl>
                  <Input placeholder="+228    XX XX XX XX" {...field} />
                </FormControl>
                <FormDescription>
                  Ce numéro sera utilisé pour les communications avec les clients
                  assurez vous qu'il fonctionne
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Votre adresse professionnelle" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Création en cours..." : "Devenir vendeur"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
