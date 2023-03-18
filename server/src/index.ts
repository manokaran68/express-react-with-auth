require("dotenv").config();
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { login, authenticate } from "./utils/auth";
import api from "./routes/api";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/login", login);
app.use("/api", authenticate, api);
app.get("/", (req: Request, res: Response) => {
  res.send("Send index file here");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
