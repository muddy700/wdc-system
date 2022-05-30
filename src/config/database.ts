import mongoose from "mongoose";
import { constants } from "./constants";

export const connectDB = async () => {
  console.log("Node-Env: ", process.env.NODE_ENV);

  if (process.env.NODE_ENV === "test") {
    return initializeTestDB();
  }

  const { DATABASE_URL } = constants;

  try {
    await mongoose.connect(DATABASE_URL, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`Database connected successfully`);
  } catch (e) {
    console.log(`Database connection failed: ${e.message}`);
  }
};

export const initializeTestDB = async () => {
  try {
    await mongoose.connect(constants.TEST_DB_URL, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      });

    console.log(`Test-Database connected successfully`);
  } catch (e) {
    console.log(`Test-Database connection failed: ${e.message}`);
  }
};

export const dropTestDB = async () => {
  return mongoose.connection.db.dropDatabase(function (err, result) {
    //console.log(`${constants.TEST_DB_URL} Database dropped successfully`);
  });
};

export const clearCollection = async (collection: string) => {
  await mongoose.connection.db.dropCollection(
    collection,
    function (err, result) {}
  );
};
