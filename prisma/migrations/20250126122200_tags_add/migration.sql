/*
  Warnings:

  - You are about to drop the column `createdById` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the column `usageCount` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the `_ProductToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_tags` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `type` on the `notifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updated_at` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `wishlists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'MESSAGE';

-- DropForeignKey
ALTER TABLE "_ProductToTag" DROP CONSTRAINT "_ProductToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToTag" DROP CONSTRAINT "_ProductToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "review_tags" DROP CONSTRAINT "review_tags_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "review_tags" DROP CONSTRAINT "review_tags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_createdById_fkey";

-- DropForeignKey
ALTER TABLE "user_tags" DROP CONSTRAINT "user_tags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "user_tags" DROP CONSTRAINT "user_tags_userId_fkey";

-- DropIndex
DROP INDEX "tags_usageCount_idx";

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "type",
ADD COLUMN     "type" "NotificationType" NOT NULL;

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "createdById",
DROP COLUMN "usageCount",
ADD COLUMN     "certified" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "wishlists" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_ProductToTag";

-- DropTable
DROP TABLE "review_tags";

-- DropTable
DROP TABLE "user_tags";

-- CreateTable
CREATE TABLE "_ProductTags" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ReviewTags" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductTags_AB_unique" ON "_ProductTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductTags_B_index" ON "_ProductTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReviewTags_AB_unique" ON "_ReviewTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ReviewTags_B_index" ON "_ReviewTags"("B");

-- AddForeignKey
ALTER TABLE "_ProductTags" ADD CONSTRAINT "_ProductTags_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductTags" ADD CONSTRAINT "_ProductTags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewTags" ADD CONSTRAINT "_ReviewTags_A_fkey" FOREIGN KEY ("A") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewTags" ADD CONSTRAINT "_ReviewTags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
