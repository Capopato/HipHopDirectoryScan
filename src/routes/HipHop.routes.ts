import express from "express";
import { scanForAlbum, scanForArtist, scanForSong } from "../controllers/directories/scanDirectories.controler";
import { createAlbumTable, createArtistTable, createSongTable } from "../controllers/database/createTables.controller";
import { displayAlbumTable, displayArtistTable, displaySongTable } from "../controllers/displayTables.controller";

const scanRoutes = express.Router();
scanRoutes.post("/artists", scanForArtist);
scanRoutes.post("/album", scanForAlbum);
scanRoutes.post("/song", scanForSong);

const createTableRoutes = express.Router();
createTableRoutes.post("/artists", createArtistTable);
createTableRoutes.post("/album", createAlbumTable);
createTableRoutes.post("/song", createSongTable);

const displayTablesRoutes = express.Router();
displayTablesRoutes.get("/artists", displayArtistTable);
displayTablesRoutes.get("/album", displayAlbumTable);
displayTablesRoutes.get("/song", displaySongTable);

export { scanRoutes, createTableRoutes, displayTablesRoutes };
