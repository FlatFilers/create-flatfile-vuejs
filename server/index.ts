import dotenv from 'dotenv';
import express from "express";
import path from "path";
import assetsRouter from "./assetsRouter";
import homepageRouter from './homepageRouter';

import { FlatfileClient } from "@flatfile/api";

dotenv.config();

const port = process.env.PORT || 3000;
const publicPath = path.join(path.resolve(), "public");
const distPath = path.join(path.resolve(), "dist");

const app = express();

app.get('/api/spaces/:id', async (_req, res)=>{
  const {id} = _req.params;
  const flatfile = new FlatfileClient({
    token: process.env.FLATFILE_API_KEY,
    environment: 'https://api.x.flatfile.com/v1/',
  });
  try {
    const space = await flatfile.spaces.get(id);
    res.json({ space });
  } catch (error) {
    console.error("Error retrieving space:", error);
    res.status(500).json({ error: "Failed to retrieve space" });
  }
})

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(distPath));
} else {
  app.use("/", express.static(publicPath));
  app.use("/src", assetsRouter);
}

app.use(homepageRouter);

app.listen(port, () => {
  console.log("Server listening on port", port);
});