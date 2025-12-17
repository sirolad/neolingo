/*
  Warnings:

  - You are about to drop the column `firstName` on the `user_profile` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user_profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_languageId_fkey";

-- AlterTable
ALTER TABLE "user_profile" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "name" TEXT,
ALTER COLUMN "languageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE SET NULL ON UPDATE CASCADE;
