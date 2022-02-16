//importing
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TokenSchema from "./modal.js";

//app config
const app = express();
const port = process.env.PORT || 9000;

//middelwhere

app.use(express.json());
app.use(cors());

//db config
const url =
  "mongodb+srv://<name>:<pass>@cluster0.kx1wi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(url);

const db = mongoose.connection;
db.once("open", () => {
  console.log("db is connected");
});

//api routes
app.get("/test", (req, res) => res.status(200).send("hello world"));

app.get("/projects", (req, res) => {
  TokenSchema.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/newTransation", async (req, res) => {
  const transationDetails = req.body;
  TokenSchema.create(transationDetails, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//listen
app.listen(port, () => console.log("server running on " + port));
