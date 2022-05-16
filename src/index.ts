import express from "express";
import { createClient } from "contentful";
import cors from "cors";

const app = express();
const allowedOrigins = ["http://localhost:4200"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

const port = 8080;

const client = createClient({
  space: "b6tw9zce3pgq",
  accessToken: "you wish",
  host: "cdn.contentful.com",
});

const previewClient = createClient({
  space: "b6tw9zce3pgq",
  accessToken: "you wish",
  host: "preview.contentful.com",
});

app.get("/preview/student/:id", async (req, res) => {
  const id = req.params.id;

  const response = await previewClient.getEntry(id, {});

  res.send(response);
});

app.get("/getSpecific/:id", async (req, res) => {
  const id = req.params.id;

  const response = await client.getEntry(id, {
    include: 10,
  });

  res.send(response);
});

app.get("/getAll", async (req, res) => {
  const response = await client.getEntries({
    content_type: "university",
    include: 10,
  });
  const { items } = response;
  items.forEach(x => console.log(x.fields));
  res.send(items);
  client.getSpace();
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
