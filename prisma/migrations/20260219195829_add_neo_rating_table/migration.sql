-- CreateTable
CREATE TABLE "neo_rating" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "userId" UUID NOT NULL,
    "neoId" INTEGER NOT NULL,
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "neo_rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "neo_rating_userId_neoId_key" ON "neo_rating"("userId", "neoId");

-- AddForeignKey
ALTER TABLE "neo_rating" ADD CONSTRAINT "neo_rating_neoId_fkey" FOREIGN KEY ("neoId") REFERENCES "neos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "neo_rating" ADD CONSTRAINT "neo_rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
