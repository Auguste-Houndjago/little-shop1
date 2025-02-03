-- CreateTable
CREATE TABLE "tag_certifications" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "tagId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tag_certifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tag_certifications_userId_idx" ON "tag_certifications"("userId");

-- CreateIndex
CREATE INDEX "tag_certifications_tagId_idx" ON "tag_certifications"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "tag_certifications_userId_tagId_key" ON "tag_certifications"("userId", "tagId");

-- AddForeignKey
ALTER TABLE "tag_certifications" ADD CONSTRAINT "tag_certifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_certifications" ADD CONSTRAINT "tag_certifications_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
