/*
  Warnings:

  - You are about to drop the column `ratingSore` on the `neos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "neos" DROP COLUMN "ratingSore",
ADD COLUMN     "ratingScore" INTEGER NOT NULL DEFAULT 0;
