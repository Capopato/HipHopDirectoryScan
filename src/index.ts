import express from "express";
import config from "./config/config";
import { scanRoutes, createTableRoutes, displayTablesRoutes } from "./routes/HipHop.routes";

const app = express();
const port = config.port;

app.use(express.json());
app.use("/scan", scanRoutes);
app.use("/tables", createTableRoutes);
app.use("/display", displayTablesRoutes);

app.listen(port, () => console.log(`Server is running at port: ${port}`));
