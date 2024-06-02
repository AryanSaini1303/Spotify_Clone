/*
  Warnings:

  - Made the column `poster` on table `songs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "songs" ADD COLUMN     "playlistId" TEXT,
ALTER COLUMN "poster" SET NOT NULL;
