import mysql from "mysql";
import { connect, queryMySQL } from "../../config/mySQL.config";
import { Request, Response, NextFunction } from "express";

export const createArtistTable = async (req: Request, res: Response, next: NextFunction) => {
  //   const tableToBeCreated = req.body.table;

  // Validate tableToBeCreated for word artist/Artists.
  const tableToBeCreated = "artist";
  const queryCommand = `CREATE TABLE IF NOT EXISTS ${tableToBeCreated} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
    );`;

  const connection = await connect();
  const result = await queryMySQL(connection, queryCommand);
  connection.end();
  res.status(200).json({ result });
};

export const createAlbumTable = async (req: Request, res: Response, next: NextFunction) => {
  const tableToBeCreated = "album";
  const queryCommand = `CREATE TABLE IF NOT EXISTS ${tableToBeCreated} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    year INT,
    artistID INT,
    FOREIGN KEY (artistID) REFERENCES artist(id)
    );`;

  const connection = await connect();
  const result = await queryMySQL(connection, queryCommand);
  connection.end();

  res.status(200).json({ result });
};

export const createSongTable = async (req: Request, res: Response, next: NextFunction) => {
  const tableToBeCreated = "song";
  const queryCommand = `CREATE TABLE IF NOT EXISTS ${tableToBeCreated} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    year INT,
    artistID INT,
    albumID INT,
    FOREIGN KEY (artistID) REFERENCES artist(id),
    FOREIGN KEY (albumID) REFERENCES album(id)  
    );`;

  const connection = await connect();
  const result = await queryMySQL(connection, queryCommand);
  connection.end();

  res.status(200).json({ result });
};

export const createYearTable = async (req: Request, res: Response, next: NextFunction) => {
  //   const tableToBeCreated = req.body.table;

  // Validate tableToBeCreated for word artist/Artists.
  const tableToBeCreated = "year";
  const queryCommand = `CREATE TABLE IF NOT EXISTS ${tableToBeCreated} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)  
    );`;

  const connection = await connect();
  const result = await queryMySQL(connection, queryCommand);
  connection.end();
  res.status(200).json({ result });
};
