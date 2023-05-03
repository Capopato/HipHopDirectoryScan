import { connect, queryMySQL } from "../../config/mySQL.config";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import { secondScanForAlbum, secondScanForArtist, secondScanForSong } from "./secondScans/secondDirScans";
import { getAlbumTag, getArtistTag, getSongTag } from "../mp3Files/mp3";

export const scanForArtist = async (req: Request, res: Response, next: NextFunction) => {
  const dirPath = req.body.dirPath;
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

  res.sendStatus(200);
};

export const scanForAlbum = async (req: Request, res: Response, next: NextFunction) => {
  const dirPath = req.body.dirPath;
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

  res.sendStatus(200);
};

export const scanForSong = async (req: Request, res: Response, next: NextFunction) => {
  const dirPath = req.body.dirPath;
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

  res.sendStatus(200);
};
