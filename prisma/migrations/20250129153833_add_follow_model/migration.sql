-- CreateTable
CREATE TABLE "follows" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "vendorId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "follows_vendorId_idx" ON "follows"("vendorId");

-- CreateIndex
CREATE INDEX "follows_userId_idx" ON "follows"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "follows_userId_vendorId_key" ON "follows"("userId", "vendorId");

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
