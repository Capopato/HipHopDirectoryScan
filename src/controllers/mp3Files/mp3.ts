import NodeID3 from "node-id3";
import fs from "fs";
import { addAlbum, addArtist, addSong } from "../database/addDataToDb";

export const getArtistTag = async (filePath: string) => {
  const buffer = fs.readFileSync(filePath);
  const tags = NodeID3.read(buffer);
  const artist = tags.artist;
  const album = tags.album;

  try {
    await addArtist(artist);
  } catch (error) {
    return console.log(error);
  }
};
export const getAlbumTag = async (filePath: string) => {
  const buffer = fs.readFileSync(filePath);
  const tags = NodeID3.read(buffer);
  const artist = tags.artist;
  const album = tags.album;
  const year = tags.year;

  try {
    await addAlbum(album, year, artist);
  } catch (error) {
    return console.log(error);
  }
};

export const getSongTag = async (filePath: string) => {
  const buffer = fs.readFileSync(filePath);
  const tags = NodeID3.read(buffer);
  const title = tags.title;
  const year = tags.year;
  const artist = tags.artist;
  const album = tags.album;

  try {
    await addSong(title, year, artist, album);
  } catch (error) {
    return console.log(error);
  }
};
