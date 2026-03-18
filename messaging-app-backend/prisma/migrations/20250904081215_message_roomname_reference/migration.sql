/*
  Warnings:

  - You are about to drop the column `roomId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `roomName` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_roomId_fkey";

-- AlterTable
ALTER TABLE "public"."Message" DROP COLUMN "roomId",
ADD COLUMN     "roomName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "public"."Room"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
