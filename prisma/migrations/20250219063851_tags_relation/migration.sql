/*
  Warnings:

  - You are about to drop the column `content_id` on the `tags` table. All the data in the column will be lost.
  - Added the required column `tag_id` to the `content` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_content_id_fkey";

-- AlterTable
ALTER TABLE "content" ADD COLUMN     "tag_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "content_id";

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
