const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(cors());
app.use(express.json());

// add mongodb ------------

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASS}@cluster0.ha2hum3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = () => {
  try {
    client.connect();
  } catch (error) {}
};
const db = client.db("bigbazzer");
const UserCollection = db.collection("allUser");

app.get("/", (req, res) => {
  try {
    res.status(200).send({ message: "server is running", success: true });
  } catch (error) {
    res.status(400).send({ message: error.message, success: false });
  }
});
app.get("/", async (req, res) => {
  try {
    const allUser = await UserCollection.find({}).toArray();
    res.status(200).send({ success: true, data: allUser });
  } catch (error) {
    res.status(400).send({ message: error.message, success: false });
  }
});

app.listen(port, () => console.log(`${port} is running now`));
