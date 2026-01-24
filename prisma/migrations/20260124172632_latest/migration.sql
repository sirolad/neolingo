/*
  Warnings:

  - You are about to drop the column `languageId` on the `user_profile` table. All the data in the column will be lost.
  - You are about to drop the `language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `neo_communities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_neo_communities` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LanguageType" AS ENUM ('HRL', 'LRL');

-- DropForeignKey
ALTER TABLE "user_neo_communities" DROP CONSTRAINT "user_neo_communities_neoCommunityId_fkey";

-- DropForeignKey
ALTER TABLE "user_neo_communities" DROP CONSTRAINT "user_neo_communities_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_languageId_fkey";

-- AlterTable
ALTER TABLE "user_profile" DROP COLUMN "languageId",
ADD COLUMN     "uiLanguageId" INTEGER;

-- DropTable
DROP TABLE "language";

-- DropTable
DROP TABLE "neo_communities";

-- DropTable
DROP TABLE "user_neo_communities";

-- CreateTable
CREATE TABLE "ui_languages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "ui_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "LanguageType" NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "is_supported" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "part_of_speech" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "part_of_speech_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "concepts" (
    "id" SERIAL NOT NULL,
    "gloss" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "concepts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "terms" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "sourceLanguageId" INTEGER NOT NULL,
    "targetLanguageId" INTEGER NOT NULL,
    "partOfSpeechId" INTEGER NOT NULL,
    "conceptId" INTEGER NOT NULL,
    "voteScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "definitions" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "conceptId" INTEGER NOT NULL,

    CONSTRAINT "definitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "votes" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "userId" UUID NOT NULL,
    "termId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domains" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "domains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translation_requests" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "meaning" TEXT,
    "sourceLanguageId" INTEGER NOT NULL,
    "targetLanguageId" INTEGER NOT NULL,
    "partOfSpeechId" INTEGER NOT NULL,
    "userId" UUID NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "approvedById" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "translation_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domains_on_requests" (
    "requestId" INTEGER NOT NULL,
    "domainId" INTEGER NOT NULL,

    CONSTRAINT "domains_on_requests_pkey" PRIMARY KEY ("requestId","domainId")
);

-- CreateTable
CREATE TABLE "user_target_languages" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "user_target_languages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ui_languages_name_key" ON "ui_languages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ui_languages_code_key" ON "ui_languages"("code");

-- CreateIndex
CREATE UNIQUE INDEX "languages_name_key" ON "languages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "languages_code_key" ON "languages"("code");

-- CreateIndex
CREATE UNIQUE INDEX "part_of_speech_name_key" ON "part_of_speech"("name");

-- CreateIndex
CREATE UNIQUE INDEX "part_of_speech_code_key" ON "part_of_speech"("code");

-- CreateIndex
CREATE UNIQUE INDEX "votes_userId_termId_key" ON "votes"("userId", "termId");

-- CreateIndex
CREATE UNIQUE INDEX "domains_name_key" ON "domains"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_target_languages_userId_languageId_key" ON "user_target_languages"("userId", "languageId");

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_uiLanguageId_fkey" FOREIGN KEY ("uiLanguageId") REFERENCES "ui_languages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "terms" ADD CONSTRAINT "terms_sourceLanguageId_fkey" FOREIGN KEY ("sourceLanguageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "terms" ADD CONSTRAINT "terms_targetLanguageId_fkey" FOREIGN KEY ("targetLanguageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "terms" ADD CONSTRAINT "terms_partOfSpeechId_fkey" FOREIGN KEY ("partOfSpeechId") REFERENCES "part_of_speech"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "terms" ADD CONSTRAINT "terms_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "concepts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "definitions" ADD CONSTRAINT "definitions_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "concepts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_termId_fkey" FOREIGN KEY ("termId") REFERENCES "terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation_requests" ADD CONSTRAINT "translation_requests_sourceLanguageId_fkey" FOREIGN KEY ("sourceLanguageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation_requests" ADD CONSTRAINT "translation_requests_targetLanguageId_fkey" FOREIGN KEY ("targetLanguageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation_requests" ADD CONSTRAINT "translation_requests_partOfSpeechId_fkey" FOREIGN KEY ("partOfSpeechId") REFERENCES "part_of_speech"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation_requests" ADD CONSTRAINT "translation_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation_requests" ADD CONSTRAINT "translation_requests_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "user_profile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domains_on_requests" ADD CONSTRAINT "domains_on_requests_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "translation_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domains_on_requests" ADD CONSTRAINT "domains_on_requests_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "domains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_target_languages" ADD CONSTRAINT "user_target_languages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_target_languages" ADD CONSTRAINT "user_target_languages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
