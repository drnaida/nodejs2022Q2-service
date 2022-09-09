/*
  Warnings:

  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Favorite";

-- CreateTable
CREATE TABLE "ArtistsFavorites" (
    "artistId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TracksFavorites" (
    "trackId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AlbumsFavorites" (
    "albumId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ArtistsFavorites_artistId_key" ON "ArtistsFavorites"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "TracksFavorites_trackId_key" ON "TracksFavorites"("trackId");

-- CreateIndex
CREATE UNIQUE INDEX "AlbumsFavorites_albumId_key" ON "AlbumsFavorites"("albumId");

-- AddForeignKey
ALTER TABLE "ArtistsFavorites" ADD CONSTRAINT "ArtistsFavorites_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TracksFavorites" ADD CONSTRAINT "TracksFavorites_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumsFavorites" ADD CONSTRAINT "AlbumsFavorites_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;
