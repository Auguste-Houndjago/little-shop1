import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UploadButton } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import Image from "next/image"

export default function Step1() {
  const { control, watch, setValue } = useFormContext()
  const businessLogo = watch("businessLogo")

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Informations de base</h2>

      <FormField
        control={control}
        name="businessName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom de l'entreprise</FormLabel>
            <FormControl>
              <Input {...field} className="h-12" placeholder="Votre boutique" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} className="min-h-[120px]" placeholder="Décrivez votre boutique..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormItem>
        <FormLabel>Logo de la boutique</FormLabel>
        <div className="flex items-center space-x-4">
          {businessLogo && (
            <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <Image src={businessLogo || "/placeholder.svg"} alt="Logo" layout="fill" objectFit="cover" />
            </div>
          )}
          <UploadButton<OurFileRouter, "imageOne">
            endpoint="imageOne"
            onClientUploadComplete={(res) => {
              if (res?.[0]?.url) {
                setValue("businessLogo", res[0].url)
              }
            }}
            onUploadError={(error: Error) => {
              console.error(error)
            }}
          />
        </div>
      </FormItem>
    </div>
  )
}

