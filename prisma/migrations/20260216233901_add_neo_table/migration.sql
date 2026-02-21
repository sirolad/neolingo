/*
  Warnings:

  - Added the required column `neoId` to the `votes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NeoType" AS ENUM ('popular', 'adoptive', 'functional', 'root', 'creative');

-- AlterTable
ALTER TABLE "votes" ADD COLUMN     "neoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "neos" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "type" "NeoType" NOT NULL DEFAULT 'popular',
    "audiourl" TEXT,
    "userId" UUID NOT NULL,
    "termId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "neos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_neoId_fkey" FOREIGN KEY ("neoId") REFERENCES "neos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "neos" ADD CONSTRAINT "neos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "neos" ADD CONSTRAINT "neos_termId_fkey" FOREIGN KEY ("termId") REFERENCES "terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
