/*
  Warnings:

  - You are about to drop the column `vendorTagId` on the `tag_certifications` table. All the data in the column will be lost.
  - You are about to drop the `vendor_tags` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,tagId]` on the table `tag_certifications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tagId` to the `tag_certifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tag_certifications" DROP CONSTRAINT "tag_certifications_vendorTagId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_tags" DROP CONSTRAINT "vendor_tags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_tags" DROP CONSTRAINT "vendor_tags_vendorId_fkey";

-- DropIndex
DROP INDEX "tag_certifications_userId_vendorTagId_key";

-- DropIndex
DROP INDEX "tag_certifications_vendorTagId_idx";

-- AlterTable
ALTER TABLE "tag_certifications" DROP COLUMN "vendorTagId",
ADD COLUMN     "tagId" UUID NOT NULL;

-- DropTable
DROP TABLE "vendor_tags";

-- CreateIndex
CREATE INDEX "tag_certifications_tagId_idx" ON "tag_certifications"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "tag_certifications_userId_tagId_key" ON "tag_certifications"("userId", "tagId");

-- AddForeignKey
ALTER TABLE "tag_certifications" ADD CONSTRAINT "tag_certifications_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
