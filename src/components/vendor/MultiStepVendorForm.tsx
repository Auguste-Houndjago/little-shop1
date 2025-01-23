"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Summary from "./Summary"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

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
})

type FormData = z.infer<typeof formSchema>

interface MultiStepVendorFormProps {
  isMultiStep?: boolean;
  onSubmitExternal?: (data: FormData) => Promise<void>;
  initialData?: Partial<FormData>;
}

export default function MultiStepVendorForm({ 
  isMultiStep = true, 
  onSubmitExternal,
  initialData = {} 
}: MultiStepVendorFormProps) {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      ...initialData
    }
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (onSubmitExternal) {
        await onSubmitExternal(data)
      } else {
        // Default submission logic
        const response = await fetch("/api/vendor/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error("Erreur lors de la création du profil vendeur")
        }

        toast.success("Profil vendeur créé avec succès!")
        router.push('/')
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la création du profil")
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const renderForm = () => {
    if (isMultiStep) {
      return (
        <>
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Summary />}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button type="button" onClick={prevStep} variant="outline">
                Précédent
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" onClick={nextStep} className="ml-auto">
                Suivant
              </Button>
            ) : (
              <Button type="submit" className="ml-auto">
                Soumettre
              </Button>
            )}
          </div>
        </>
      )
    } else {
      // Single page form rendering
      return (
        <>
          <Step1 />
          <Step2 />
          <Button type="submit" className="w-full mt-6">
            Soumettre
          </Button>
        </>
      )
    }
  }

  return (
    <FormProvider {...methods}>
      <div className={`${isMultiStep ? 'min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4' : ''}`}>
        <Card className="w-full max-w-2xl shadow-xl">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Devenez Vendeur</h1>
            {isMultiStep && <Progress value={(step / 3) * 100} className="mb-6" />}
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {renderForm()}
            </form>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  )
}
