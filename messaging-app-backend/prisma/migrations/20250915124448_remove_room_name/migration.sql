/*
  Warnings:

  - You are about to drop the column `name` on the `Room` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Room_name_key";

-- AlterTable
ALTER TABLE "public"."Room" DROP COLUMN "name";
