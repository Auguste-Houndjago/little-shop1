import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

export default function Step2() {
  const { control, register } = useFormContext()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Coordonnées</h2>

      <FormField
        control={control}
        name="whatsappNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro WhatsApp</FormLabel>
            <FormControl>
              <PhoneInput
                country={"tg"}
                value={field.value}
                onChange={(phone) => field.onChange("+" + phone)}
                inputProps={{
                  ...register("whatsappNumber"),
                  className: "w-full h-12 pl-14 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500",
                }}
                enableSearch
                preferredCountries={["tg", "gh", "ng", "bj", "ci", "bf"]}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse</FormLabel>
            <FormControl>
              <Textarea {...field} className="min-h-[100px]" placeholder="Votre adresse professionnelle" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

