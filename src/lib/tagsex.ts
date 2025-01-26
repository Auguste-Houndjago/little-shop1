// import prisma from '@/lib/prisma';
// import { TagCategory } from '@prisma/client';

// // Récupérer les tags populaires pour un produit
// export async function getPopularTagsForProduct(productId: string) {
//   return prisma.reviewTag.groupBy({
//     by: ['tagId'],
//     where: {
//       review: {
//         productId,
//       },
//     },
//     _count: {
//       tagId: true,
//     },
//     orderBy: {
//       _count: {
//         tagId: 'desc',
//       },
//     },
//     take: 5,
//   });
// }

// // Récupérer les tags suggérés basés sur la catégorie du produit
// export async function getSuggestedTags(categoryId: string) {
//   return prisma.tag.findMany({
//     where: {
//       reviews: {
//         some: {
//           review: {
//             product: {
//               categoryId,
//             },
//           },
//         },
//       },
//     },
//     orderBy: {
//       usageCount: 'desc',
//     },
//     take: 10,
//   });
// }

// // Créer un nouveau tag
// export async function createTag(data: {
//   name: string;
//   category: TagCategory;
//   description?: string;
//   createdById: string;
// }) {
//   return prisma.tag.create({
//     data,
//   });
// }

// // Certifier un tag
// export async function certifyTag(userId: string, tagId: string) {
//   return prisma.userTag.upsert({
//     where: {
//       userId_tagId: {
//         userId,
//         tagId,
//       },
//     },
//     create: {
//       userId,
//       tagId,
//       certified: true,
//     },
//     update: {
//       certified: true,
//     },
//   });
// }

// // Mettre à jour le score de pertinence d'un tag
// export async function updateTagRelevance(reviewId: string, tagId: string) {
//   const certificationCount = await prisma.userTag.count({
//     where: {
//       tagId,
//       certified: true,
//     },
//   });

//   return prisma.reviewTag.update({
//     where: {
//       reviewId_tagId: {
//         reviewId,
//         tagId,
//       },
//     },
//     data: {
//       relevanceScore: certificationCount,
//     },
//   });
// } 