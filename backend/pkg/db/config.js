const mongoose = require("mongoose");

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB_NAME } = process.env;

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.frwhldk.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

async function dbConnect() {
  try {
    await mongoose.connect(uri);
    console.log("connected");
  } catch (err) {
    console.log(err.message);
  }
}

dbConnect();
