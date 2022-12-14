import mongoose from "mongoose";
let database: mongoose.Connection;

export const connect = () => {
    if (database) {
      return;
    }
    mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE}`);
    database = mongoose.connection;
    database.once("open", async () => {
      console.log("Connected to database");
    });
    database.on("error", () => {
      console.log("Error connecting to database");
    });
  };

  export const disconnect = () => {
    if (!database) {
      return;
    }
    mongoose.disconnect();
  };