-- CreateTable
CREATE TABLE "templates" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "secret" TEXT,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);
