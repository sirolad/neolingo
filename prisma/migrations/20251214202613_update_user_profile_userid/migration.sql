/*
  Warnings:
  - The primary key for the `user_profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
*/
-- AlterTable
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id");