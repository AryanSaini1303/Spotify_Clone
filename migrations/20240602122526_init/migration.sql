/*
  Warnings:

  - You are about to drop the column `playlistId` on the `songs` table. All the data in the column will be lost.
  - You are about to drop the column `poster` on the `songs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlaylistSong" ADD COLUMN     "poster" TEXT;

-- AlterTable
ALTER TABLE "songs" DROP COLUMN "playlistId",
DROP COLUMN "poster";
