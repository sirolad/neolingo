/*
  Warnings:

  - You are about to drop the column `isApproved` on the `translation_requests` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "translation_requests" DROP COLUMN "isApproved",
ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "status" "RequestStatus" NOT NULL DEFAULT 'PENDING';
