/*
  Warnings:

  - You are about to drop the column `users` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Room" DROP COLUMN "users";

-- CreateTable
CREATE TABLE "public"."_chatroom" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_chatroom_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_chatroom_B_index" ON "public"."_chatroom"("B");

-- AddForeignKey
ALTER TABLE "public"."_chatroom" ADD CONSTRAINT "_chatroom_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_chatroom" ADD CONSTRAINT "_chatroom_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
