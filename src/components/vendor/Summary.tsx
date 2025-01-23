import { useFormContext } from "react-hook-form"
import Image from "next/image"

export default function Summary() {
  const { watch } = useFormContext()
  const formData = watch()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Résumé</h2>

      <div className="bg-white p-6 rounded-lg shadow-inner">
        <div className="flex items-center space-x-4 mb-4">
          {formData.businessLogo && (
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
              <Image src={formData.businessLogo || "/placeholder.svg"} alt="Logo" layout="fill" objectFit="cover" />
            </div>
          )}
          <h3 className="text-xl font-semibold">{formData.businessName}</h3>
        </div>

        <div className="space-y-2">
          <p>
            <strong>Description:</strong> {formData.description}
          </p>
          <p>
            <strong>WhatsApp:</strong> {formData.whatsappNumber}
          </p>
          <p>
            <strong>Adresse:</strong> {formData.address}
          </p>
        </div>
      </div>
    </div>
  )
}

