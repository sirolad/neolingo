/*
  Warnings:

  - The values [popular,adoptive,functional,root,creative] on the enum `NeoType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NeoType_new" AS ENUM ('POPULAR', 'ADOPTIVE', 'FUNCTIONAL', 'ROOT', 'CREATIVE');
ALTER TABLE "public"."neos" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "neos" ALTER COLUMN "type" TYPE "NeoType_new" USING ("type"::text::"NeoType_new");
ALTER TYPE "NeoType" RENAME TO "NeoType_old";
ALTER TYPE "NeoType_new" RENAME TO "NeoType";
DROP TYPE "public"."NeoType_old";
ALTER TABLE "neos" ALTER COLUMN "type" SET DEFAULT 'POPULAR';
COMMIT;

-- AlterTable
ALTER TABLE "neos" ALTER COLUMN "type" SET DEFAULT 'POPULAR';
