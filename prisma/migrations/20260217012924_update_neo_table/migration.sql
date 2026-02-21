/*
  Warnings:

  - You are about to drop the column `audiourl` on the `neos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "neos" DROP COLUMN "audiourl",
ADD COLUMN     "audioUrl" TEXT;
