const mongoose = require("mongoose");

/**
 * Connects to the MongoDB database.
 * 
 * @param {none} none - No parameters.
 * 
 * @returns {none} none - No return value.
 * 
 * Functionality:
 * - Gets the MongoDB connection URI from the environment variable MONGODB_URI.
 * - Uses mongoose.connect() to connect to the MongoDB database.
 * - Wraps in try/catch block to handle errors.
 * - Logs debug messages about the connection status.
 */
const connectMongo =  () => {
  const DB_STRING = process.env.MONGODB_URI;
  try {
    console.debug("Start Connecting database");
     mongoose.connect(DB_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: true,
    });
    console.debug("Database Connected");
  } catch (e) {
    console.error(e);
  }
};

module.exports = { connectMongo };
