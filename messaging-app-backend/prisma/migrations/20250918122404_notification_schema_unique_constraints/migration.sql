/*
  Warnings:

  - A unique constraint covering the columns `[userId,roomId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Notification_userId_roomId_key" ON "public"."Notification"("userId", "roomId");
