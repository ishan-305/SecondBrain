/*
  Warnings:

  - A unique constraint covering the columns `[user_id_Link]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Link_user_id_Link_key" ON "Link"("user_id_Link");
