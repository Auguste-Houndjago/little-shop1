import Billboard from '@/components/home/Billboard';
import { createClient } from '@/utils/supabase/server';
import { Suspense } from 'react';

const items = [
	{
		img: '/images/hero/peach.jpg',
		title: 'Collection Exclusive',
		subtitle: 'Découvrez notre nouvelle collection de vêtements tendance',
		actionLabel: 'Découvrir',
		actionUrl: '/products'
	},
	{
		img: '/images/hero/beauty.jpg',
		title: 'Offres Spéciales',
		subtitle: 'Jusqu\'à -50% sur une sélection d\'articles',
		actionLabel: 'Voir les offres',
		actionUrl: '/sales'
	},
	{
		img: '/images/hero/parfum.jpg',
		title: 'Nouveautés',
		subtitle: 'Les dernières tendances de la saison',
		actionLabel: 'Explorer',
		actionUrl: '/new'
	},
	{
		img: '/images/hero/accessoirs.jpg',
		title: 'Nouveautés',
		subtitle: 'des accessoires de mode',
		actionLabel: 'Explorer',
		actionUrl: '/new'
	}
]

export default async function HomeHero() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <Suspense fallback={<div>...</div>}>
      <Billboard items={items} />

    <div className='flex mt-8 justify-center bg-background/50 border-2 rounded-lg items-center dark:border-black w-full h-16 border-primary/40'>
      <h1 className='text-3xl font-bold'>
        Bienvenue {user?.user_metadata.full_name || user?.email || 'cher client'}
      </h1>
    </div>

    </Suspense>
  );
}