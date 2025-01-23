import { createClient } from '@/utils/supabase/server'
import prisma from '@/lib/prisma'
import VendorProfileCard from '../ui/VendorProfileCard'
import StatsOverview from '../ui/StatsOverview'

export default async function VendorProfilePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user?.id) {
    return null
  }

  const vendor = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      vendorProfile: true,
    },
  })

  // Calculer les statistiques
  const stats = {
    revenue: 25000, // À remplacer par les vraies données
    products: 45,
    sales: 128,
    customers: 89,
  }

  return (
    <div className="space-y-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <VendorProfileCard
            vendor={{
              businessName: vendor?.vendorProfile?.businessName || "Mon Business",
              businessLogo: vendor?.vendorProfile?.businessLogo || "/placeholder.svg",
              description: vendor?.vendorProfile?.description || "Description de votre business",
              whatsappNumber: vendor?.vendorProfile?.whatsappNumber || "",
              email: vendor?.email || "",
              isVerified: vendor?.vendorProfile?.isVerified || false,
              address: {
                city: "Paris",
                country: "France",
              },
            }}
          />
        </div>

        {/* Stats and Activity */}
        <div className="lg:col-span-2 space-y-6">
          <StatsOverview stats={stats} />
          
          {/* Vous pouvez ajouter d'autres sections ici */}
        </div>
      </div>
    </div>
  )
}
