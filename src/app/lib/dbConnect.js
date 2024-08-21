import mongoose from "mongoose";

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  try {
    if (global.mongoose.conn) {
      console.log("Connected from previous");
      return global.mongoose.conn;
    } else {
      const conString = process.env.MONGO_URI;
      console.log("Connection String:", conString); // Agrega este log

      const promise = mongoose.connect(conString, {
        autoIndex: true,
      });

      global.mongoose = {
        conn: await promise,
        promise,
      };

      console.log("Newly connected");
      return await promise;
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
}
