"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { UploadButton } from "@uploadthing/react"
import type { OurFileRouter } from "../api/uploadthing/core"
import Image from "next/image"
import type { IState, ICity, ICountry } from "country-state-city"

import CountrySelector from "@/components/forms/selector"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import useLocation from "@/hooks/useLocation"

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
  country: z.string().min(1, {
    message: "Veuillez sélectionner un pays.",
  }),
  state: z.string().min(1, {
    message: "Veuillez sélectionner une région/état.",
  }),
  city: z.string().min(1, {
    message: "Veuillez sélectionner une ville.",
  }),
  postalCode: z.string().optional(),
  businessLogo: z.string().optional(),
})

export default function VendorProfilePage() {
  const { getAllCountries, getCountryStates, getStateCities } = useLocation()
  const countries: ICountry[] = getAllCountries()

  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false)
  const [states, setStates] = useState<IState[]>([])
  const [cities, setCities] = useState<ICity[]>([])
  const [loading, setLoading] = useState(false)
  const [businessLogo, setBusinessLogo] = useState("")

  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      description: "",
      whatsappNumber: "",
      country: "",
      state: "",
      city: "",
      postalCode: "",
      businessLogo: "",
    },
  })

  useEffect(() => {
    const selectedCountry = form.watch("country")
    const countryStates = getCountryStates(selectedCountry)
    if (countryStates) {
      setStates(countryStates)
    }
  }, [form.watch("country")])

  useEffect(() => {
    const selectedCountry = form.watch("country")
    const selectedState = form.watch("state")

    const stateCities = getStateCities(selectedCountry, selectedState)
    if (stateCities) {
      setCities(stateCities)
    }
  }, [form.watch("country"), form.watch("state")])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)

      const existingProfileResponse = await fetch("/api/vendor/profile", {
        method: "GET",
      })

      const existingProfile = await existingProfileResponse.json()

      // First, create the address
      const addressResponse = await fetch("/api/address", {
        method: existingProfile ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: existingProfile?.addressId, // Include existing address ID for updates
          country: values.country,
          region: values.state,
          city: values.city,
          postalCode: values.postalCode,
        }),
      })

      if (!addressResponse.ok) {
        throw new Error("Erreur lors de la création/mise à jour de l'adresse")
      }

      const addressData = await addressResponse.json()

      const vendorResponse = await fetch("/api/vendor/profile", {
        method: existingProfile ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: existingProfile?.id, // Include existing profile ID for updates
          businessName: values.businessName,
          description: values.description,
          whatsappNumber: values.whatsappNumber,
          address: values.address,
          addressId: addressData.id,
          businessLogo,
        }),
      })

      if (!vendorResponse.ok) {
        throw new Error("Erreur lors de la création/mise à jour du profil vendeur")
      }

      toast.success(existingProfile 
        ? "Profil vendeur mis à jour avec succès!" 
        : "Profil vendeur créé avec succès!")
      router.push("/")
    } catch (error) {
      toast.error("Une erreur est survenue lors du traitement du profil")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-2 ">
      <div className=" lg:max-w-xs  space-y-6 bg-zinc-900 p-2 rounded-lg">
        <div className="space-y-2 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-medium text-white">Devenir Vendeur</h1>
          <p className="text-sm text-zinc-400">Créez votre profil professionnel et commencez à vendre</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6  m-4">
            <div>
              <FormLabel className="text-zinc-400 block text-sm font-medium mb-2">Votre logo</FormLabel>
              <div className="flex items-center justify-center space-x-6">
                {businessLogo ? (
                  <div className="relative w-24 h-24 border-2 hover:border-indigo-300  rounded-full">
                    <Image
                      src={businessLogo || "/placeholder.svg"}
                      alt="Business Logo"
                      className="rounded-full object-cover"
                      fill
                    />
                  </div>
                ) :

                <UploadButton<OurFileRouter, "imageOne">
                  endpoint="imageOne"
                  onClientUploadComplete={(res) => {
                    if (res?.[0]?.url) {
                      setBusinessLogo(res[0].url)
                      form.setValue("businessLogo", res[0].url)
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`Upload failed: ${error.message}`)
                  }}
                  appearance={{
                    button: " duration-300",
                    container: "w-full flex justify-start items-center",
                  }}
                />

              }
              </div>
            </div>

            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-400">Nom de l'entreprise</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Votre boutique"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white h-10"
                    />
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
                  <FormLabel className="text-zinc-400">Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez votre boutique..."
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white min-h-[50px]"
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
                  <FormLabel className="text-zinc-400">Numéro WhatsApp</FormLabel>
                  <FormControl>
                    <PhoneInput
                      country={"tg"}
                      value={value}
                      onChange={(phone) => onChange("+" + phone)}
                      enableSearch
                      preferredCountries={["tg", "gh", "ng", "bj", "ci", "bf"]}
                      enableAreaCodes={true}
                      autoFormat={true}
                      countryCodeEditable={false}
                      masks={{
                        tg: ".. .. .. ..",
                        gh: "... ... ....",
                        ng: "... ... ....",
                        bj: ".. .. .. ..",
                        ci: ".. .. .. ..",
                        bf: ".. .. .. ..",
                      }}
                      localization={{
                        tg: "Togo",
                        gh: "Ghana",
                        ng: "Nigeria",
                        bj: "Bénin",
                        ci: "Côte d'Ivoire",
                        bf: "Burkina Faso",
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

            <div className="grid grid-cols-3 gap-4">
              {/* Country Selection */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-400">Pays</FormLabel>
                    <FormControl>
                      <CountrySelector
                        id="country-selector"
                        open={isCountrySelectorOpen}
                        onToggle={() => setIsCountrySelectorOpen(!isCountrySelectorOpen)}
                        onChange={(isoCode) => {
                          field.onChange(isoCode)
                          setIsCountrySelectorOpen(false)
                        }}
                        selectedValue={{
                          name:
                            countries.find((country) => country.isoCode === field.value)?.name || "Select a Country",
                          isoCode: field.value || "",
                        }}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* State/Region Selection */}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-400">Région</FormLabel>
                    <Select
                      disabled={loading || !states.length}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue defaultValue={field.value} placeholder="Région" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        {states.map((state) => (
                          <SelectItem key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* City Selection */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-400">Ville</FormLabel>
                    <Select
                      disabled={loading || !cities.length}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue defaultValue={field.value} placeholder="Ville" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        {cities.map((city) => (
                          <SelectItem key={city.name} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Postal Code */}
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-400">Code Postal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Code postal (optionnel)"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black hover:bg-zinc-200 transition-colors"
            >
              {loading ? "Création en cours..." : "Devenir vendeur"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
