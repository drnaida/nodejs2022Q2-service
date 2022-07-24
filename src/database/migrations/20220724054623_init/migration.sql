/*
  Warnings:

  - A unique constraint covering the columns `[artistId]` on the table `Track` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[albumId]` on the table `Track` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Track" ALTER COLUMN "artistId" DROP NOT NULL,
ALTER COLUMN "albumId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Track_artistId_key" ON "Track"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_albumId_key" ON "Track"("albumId");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
