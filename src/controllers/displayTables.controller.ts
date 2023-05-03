import { Request, Response, NextFunction } from "express";
import { getConnection, poolQueryMySQL } from "../config/pooling.config";

export const displayArtistTable = async (req: Request, res: Response, next: NextFunction) => {
  const connection = await getConnection();

  const displayQuery = `SELECT * FROM artist`;
  const displayResult = await poolQueryMySQL(connection, displayQuery);

  console.log(displayResult);
  res.status(200).json({ displayResult });
};

export const displayAlbumTable = async (req: Request, res: Response, next: NextFunction) => {
  const connection = await getConnection();

  const displayQuery = `SELECT * FROM album`;
  const displayResult = await poolQueryMySQL(connection, displayQuery);

  console.log(displayResult);
  res.status(200).json({ displayResult });
};

export const displaySongTable = async (req: Request, res: Response, next: NextFunction) => {
  const connection = await getConnection();

  const displayQuery = `SELECT * FROM song`;
  const displayResult = await poolQueryMySQL(connection, displayQuery);

  console.log(displayResult);
  res.status(200).json({ displayResult });
};
