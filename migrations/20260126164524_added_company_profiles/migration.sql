-- CreateTable
CREATE TABLE "companyProfiles" (
    "userId" INTEGER NOT NULL,
    "legalName" TEXT NOT NULL,
    "siret" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "companyProfiles_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "companyProfiles_userId_key" ON "companyProfiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "companyProfiles_siret_key" ON "companyProfiles"("siret");

-- AddForeignKey
ALTER TABLE "companyProfiles" ADD CONSTRAINT "companyProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
