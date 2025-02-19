-- DropForeignKey
ALTER TABLE "content" DROP CONSTRAINT "content_tag_id_fkey";

-- AlterTable
ALTER TABLE "content" ALTER COLUMN "tag_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;
