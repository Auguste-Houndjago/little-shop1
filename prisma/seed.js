const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Catégories
  await prisma.category.createMany({
    data: [
      { name: 'Vêtements', billboard: '/images/clothing.jpg', title: 'Vêtements' },
      { name: 'Chaussures', billboard: '/images/shoes.jpg', title: 'Chaussures' },
      { name: 'Accessoires', billboard: '/images/accessories.jpg', title: 'Accessoires' },
    ],
    skipDuplicates: true,
  });

  // Tailles
  await prisma.size.createMany({
    data: [
      { name: 'Extra Small', value: 'xs' },
      { name: 'Small', value: 's' },
      { name: 'Medium', value: 'm' },
      { name: 'Large', value: 'l' },
      { name: 'Extra Large', value: 'xl' },
    ],
    skipDuplicates: true,
  });

  // Couleurs
  await prisma.color.createMany({
    data: [
      { name: 'Noir', color: '#000000' },
      { name: 'Blanc', color: '#FFFFFF' },
      { name: 'Rouge', color: '#FF0000' },
      { name: 'Bleu', color: '#0000FF' },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 