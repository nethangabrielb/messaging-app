/*
  Warnings:

  - You are about to drop the column `roomId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_roomId_fkey";

-- AlterTable
ALTER TABLE "public"."Room" ADD COLUMN     "users" TEXT[];

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "roomId";
