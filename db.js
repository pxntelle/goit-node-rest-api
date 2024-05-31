import mongoose from "mongoose";

const { PORT = 3000 } = process.env;
const DB_URI = process.env.DB_URI;

// console.log(process.env.DB_URI);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.info("Database connection successful");
  })
  .catch((error) => {
    console.info(error);
    process.exit(1);
  });

//delete l8ter

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB Cluster");
});

mongoose.connection.on("error", (error) => {
  console.error(`Mongoose connection error: ${error.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});
