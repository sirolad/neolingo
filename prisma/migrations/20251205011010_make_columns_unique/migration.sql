/*
  Warnings:
  - A unique constraint covering the columns `[name,countryId]` on the table `neo_communities` will be added. If there are existing duplicate values, this will fail.
*/
-- CreateIndex
CREATE UNIQUE INDEX "neo_communities_name_countryId_key" ON "neo_communities"("name", "countryId");