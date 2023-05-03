import fs from "fs";
import { getAlbumTag, getArtistTag, getSongTag } from "../../mp3Files/mp3";

export const secondScanForArtist = async (dirPath: string) => {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = `${dirPath}/${file}`;
    const typeOfFile = fs.statSync(filePath);
    if (typeOfFile.isDirectory()) {
      await secondScanForArtist(filePath);
    } else if (filePath.endsWith(".mp3")) {
      await getArtistTag(filePath);
    }
  }
};
export const secondScanForAlbum = async (dirPath: string) => {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = `${dirPath}/${file}`;
    const typeOfFile = fs.statSync(filePath);
    if (typeOfFile.isDirectory()) {
      await secondScanForAlbum(filePath);
    } else if (filePath.endsWith(".mp3")) {
      await getAlbumTag(filePath);
    }
  }
};
export const secondScanForSong = async (dirPath: string) => {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = `${dirPath}/${file}`;
    const typeOfFile = fs.statSync(filePath);
    if (typeOfFile.isDirectory()) {
      await secondScanForSong(filePath);
    } else if (filePath.endsWith(".mp3")) {
      await getSongTag(filePath);
    }
  }
};
