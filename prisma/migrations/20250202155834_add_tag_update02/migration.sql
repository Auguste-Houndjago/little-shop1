/*
  Warnings:

  - You are about to drop the column `tagId` on the `tag_certifications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,vendorTagId]` on the table `tag_certifications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vendorTagId` to the `tag_certifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tag_certifications" DROP CONSTRAINT "tag_certifications_tagId_fkey";

-- DropIndex
DROP INDEX "tag_certifications_tagId_idx";

-- DropIndex
DROP INDEX "tag_certifications_userId_tagId_key";

-- AlterTable
ALTER TABLE "tag_certifications" DROP COLUMN "tagId",
ADD COLUMN     "vendorTagId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "vendor_tags" (
    "id" UUID NOT NULL,
    "vendorId" UUID NOT NULL,
    "tagId" UUID NOT NULL,
    "certified" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vendor_tags_vendorId_idx" ON "vendor_tags"("vendorId");

-- CreateIndex
CREATE INDEX "vendor_tags_tagId_idx" ON "vendor_tags"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_tags_vendorId_tagId_key" ON "vendor_tags"("vendorId", "tagId");

-- CreateIndex
CREATE INDEX "tag_certifications_vendorTagId_idx" ON "tag_certifications"("vendorTagId");

-- CreateIndex
CREATE UNIQUE INDEX "tag_certifications_userId_vendorTagId_key" ON "tag_certifications"("userId", "vendorTagId");

-- AddForeignKey
ALTER TABLE "vendor_tags" ADD CONSTRAINT "vendor_tags_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_tags" ADD CONSTRAINT "vendor_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_certifications" ADD CONSTRAINT "tag_certifications_vendorTagId_fkey" FOREIGN KEY ("vendorTagId") REFERENCES "vendor_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
