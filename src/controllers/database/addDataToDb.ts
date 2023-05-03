import { connect, queryMySQL } from "../../config/mySQL.config";
import { getConnection, poolQueryMySQL } from "../../config/pooling.config";

export const addArtist = async (artist: string | undefined) => {
  try {
    const connection = await getConnection();

    if (artist?.includes(",")) {
      artist = artist?.split(",")[0];
    }
    if (artist?.includes(";")) {
      artist = artist?.split(";")[0];
    }
    if (artist?.includes("feat")) {
      artist = artist?.split("feat")[0];
    }

    // Check if artist is in DB alreadt
    const checkArtistQuery = `SELECT id FROM artist WHERE name = ?`;
    const checkArtistResult = await poolQueryMySQL(connection, checkArtistQuery, [artist]);

    if (checkArtistResult.length > 0) {
      console.log(`Artist: '${artist}' already exists. Skipping insertion.`);
      connection.release();
      return;
    }
    if (artist == null) {
      connection.release();
      return;
    }

    const insertArtistQuery = `INSERT INTO artist (name) VALUE (?)`;
    await poolQueryMySQL(connection, insertArtistQuery, [artist]);
    console.log(`Artist '${artist}' is inserted.`);
    connection.release();
  } catch (error) {
    console.log(error);
  }
};

export const addAlbum = async (album: string | undefined, year: string | undefined, artist: string | undefined) => {
  try {
    const connection = await getConnection();

    if (artist?.includes(",")) {
      artist = artist?.split(",")[0];
    }
    if (artist?.includes(";")) {
      artist = artist?.split(";")[0];
    }
    if (artist?.includes("feat")) {
      artist = artist?.split("feat")[0];
    }

    // Check if album already exists in DB
    const checkAlbumQuery = `SELECT id FROM album WHERE name = ?`;
    const checkAlbumResult = await poolQueryMySQL(connection, checkAlbumQuery, [album]);

    if (checkAlbumResult.length > 0) {
      console.log(`Album: '${album}' already exists. Skipping insertion.`);
      connection.release();
      return;
    }

    // Skip insertion if album == null
    if (album == null) {
      console.log("No album title.");
      connection.release();
      return;
    }

    const getArtistIDQuery = `SELECT id FROM artist WHERE name = ?`;
    const getArtistIDResult = await poolQueryMySQL(connection, getArtistIDQuery, [artist]);
    const artistID = getArtistIDResult[0].id;

    const insertAlbumQuery = `INSERT INTO album (name, year, artistID) VALUE (?,?,?)`;
    const insertAlbumResult = await poolQueryMySQL(connection, insertAlbumQuery, [album, year, artistID]);
    console.log(`Album '${album}' is inserted.`);
    connection.release();
  } catch (error) {
    console.log(error);
  }
};

export const addSong = async (title: string | undefined, year: string | undefined, artist: string | undefined, album: string | undefined) => {
  try {
    const connection = await getConnection();

    if (artist?.includes(",")) {
      artist = artist?.split(",")[0];
    }
    if (artist?.includes(";")) {
      artist = artist?.split(";")[0];
    }
    if (artist?.includes("feat")) {
      artist = artist?.split("feat")[0];
    }

    const checkSongQuery = `SELECT id FROM song WHERE title = ?`;
    const checkSongResult = await poolQueryMySQL(connection, checkSongQuery, [title]);

    // Check if song already exists in DB
    if (checkSongResult.length > 1) {
      console.log(`Song: '${title}' already exists. Insertion is skipped.`);
      connection.release();
      return;
    }

    const getArtistIDQuery = `SELECT id FROM artist WHERE name = ?`;
    const getArtistIDResult = await poolQueryMySQL(connection, getArtistIDQuery, [artist]);
    const artistID = getArtistIDResult[0].id;

    const getAlbumIDQuery = `SELECT id FROM album WHERE name = ?`;
    const getAlbumIDResult = await poolQueryMySQL(connection, getAlbumIDQuery, [album]);
    const albumID = getAlbumIDResult[0].id;

    const addSongQuery = `INSERT INTO song (title, year, artistID, albumID) VALUES (?,?,?,?)`;
    const addSongResult = await poolQueryMySQL(connection, addSongQuery, [title, year, artistID, albumID]);
    console.log(`Song '${title}' is inserted.`);
    connection.release();
  } catch (error) {
    console.log(error);
  }
};
