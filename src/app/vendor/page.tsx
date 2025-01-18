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
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";
import Image from "next/image";

const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Le nom de la boutique doit contenir au moins 2 caractères.",
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
  businessLogo: z.string().optional(),
});

export default function VendorProfilePage() {
  const [loading, setLoading] = useState(false);
  const [businessLogo, setBusinessLogo] = useState('');
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      description: "",
      whatsappNumber: "",
      address: "",
      businessLogo: "",
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
        body: JSON.stringify({
          ...values,
          businessLogo,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du profil vendeur");
      }

      toast.success("Profil vendeur créé avec succès!");
      router.push('/');
    } catch (error) {
      toast.error("Une erreur est survenue lors de la création du profil");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center py-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
            Devenez Vendeur
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Créez votre profil professionnel et commencez à vendre
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      
            <div>
              <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                Logo de la boutique
              </FormLabel>
              <div className="flex items-center space-x-6">
                {businessLogo && (
                  <div className="relative w-24 h-24 border-4 border-indigo-200 rounded-full">
                    <Image
                      src={businessLogo}
                      alt="Business Logo"
                      className="rounded-full object-cover"
                      fill
                    />
                  </div>
                )}
                <UploadButton<OurFileRouter, 'imageOne'>
                  endpoint="imageOne"
                  onClientUploadComplete={(res) => {
                    if (res?.[0]?.url) {
                      setBusinessLogo(res[0].url);
                      form.setValue('businessLogo', res[0].url);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`Upload failed: ${error.message}`);
                  }}
                  appearance={{
                    button: "bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-full transition duration-300",
                    container: "w-full flex justify-start items-center"
                  }}
                />
              </div>
            </div>

            {/* Business Name */}
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de l'entreprise</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Votre boutique" 
                      {...field} 
                      className="h-12 px-4 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez votre boutique..." 
                      {...field} 
                      className="min-h-[120px] border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* WhatsApp Number */}
            <FormField
              control={form.control}
              name="whatsappNumber"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Numéro WhatsApp</FormLabel>
                  <FormControl>
                    <PhoneInput
                      country={'tg'}
                      value={value}
                      onChange={(phone) => onChange('+' + phone)}
                      inputClass="!w-full !h-12 !px-4 !py-2 !border !border-gray-300 !rounded-lg !shadow-sm focus:!outline-none focus:!ring-2 focus:!ring-indigo-500"
                      containerClass="w-full"
                      buttonClass="!border !border-gray-300 !bg-gray-50 hover:!bg-gray-100 !rounded-l-lg"
                      searchClass="!border !border-gray-300 !bg-white"
                      dropdownClass="!border !border-gray-300 !bg-white"
                      enableSearch
                      preferredCountries={['tg', 'gh', 'ng', 'bj', 'ci', 'bf']}
                      enableAreaCodes={true}
                      autoFormat={true}
                      countryCodeEditable={false}
                      masks={{
                        tg: '.. .. .. ..', 
                        gh: '... ... ....', 
                        ng: '... ... ....', 
                        bj: '.. .. .. ..', 
                        ci: '.. .. .. ..', 
                        bf: '.. .. .. ..' 
                      }}
                      localization={{
                        tg: 'Togo',
                        gh: 'Ghana',
                        ng: 'Nigeria',
                        bj: 'Bénin',
                        ci: 'Côte d\'Ivoire',
                        bf: 'Burkina Faso'
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Ce numéro sera utilisé pour les communications avec les clients
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
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
                      className="min-h-[100px] border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              {loading ? "Création en cours..." : "Devenir vendeur"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
