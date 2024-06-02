/*
  Warnings:

  - You are about to drop the column `album` on the `songs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "songs" DROP COLUMN "album",
ADD COLUMN     "poster" TEXT;
