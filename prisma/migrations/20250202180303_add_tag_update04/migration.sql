/*
  Warnings:

  - A unique constraint covering the columns `[userId,tagId,productId]` on the table `tag_certifications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `tag_certifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "tag_certifications_userId_tagId_key";

-- AlterTable
ALTER TABLE "tag_certifications" ADD COLUMN     "productId" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "tag_certifications_productId_idx" ON "tag_certifications"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "tag_certifications_userId_tagId_productId_key" ON "tag_certifications"("userId", "tagId", "productId");

-- AddForeignKey
ALTER TABLE "tag_certifications" ADD CONSTRAINT "tag_certifications_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
