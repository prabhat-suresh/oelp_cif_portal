import mongoose from "mongoose";
export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_DB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB has been connected successfully");
    });

    connection.on("error", (err) => {
      console.log("Something went wrong, please check MongoDB" + err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}
