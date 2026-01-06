/*
  Warnings:

  - You are about to drop the column `countryId` on the `neo_communities` table. All the data in the column will be lost.
  - You are about to drop the `countries` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `neo_communities` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "neo_communities" DROP CONSTRAINT "neo_communities_countryId_fkey";

-- DropForeignKey
ALTER TABLE "user_neo_communities" DROP CONSTRAINT "user_neo_communities_neoCommunityId_fkey";

-- DropIndex
DROP INDEX "neo_communities_name_countryId_key";

-- AlterTable
ALTER TABLE "neo_communities" DROP COLUMN "countryId";

-- DropTable
DROP TABLE "countries";

-- CreateIndex
CREATE UNIQUE INDEX "neo_communities_name_key" ON "neo_communities"("name");

-- AddForeignKey
ALTER TABLE "user_neo_communities" ADD CONSTRAINT "user_neo_communities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_neo_communities" ADD CONSTRAINT "user_neo_communities_neoCommunityId_fkey" FOREIGN KEY ("neoCommunityId") REFERENCES "neo_communities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
