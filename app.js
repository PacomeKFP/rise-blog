/**
 * Configures and starts an Express server.
 *
 * Loads environment variables from .env file using dotenv.
 * Imports required modules express, mongoose, cors.
 * Imports router and database connection logic.
 *
 * Creates Express app instance.
 * Configures middleware for JSON body parsing and CORS.
 * Mounts router at /api route.
 * Starts server listening on PORT (default 3000).
 *
 * @module Main app entry point
 */

require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");

const { connectMongo } = require("./src/configs/database");
const { AppRouter } = require("./src/routers/routes");

const app = express();
const PORT = process.env.PORT || 3000;

connectMongo();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(process.env.API_ROUTE_PREFIX || "/api", AppRouter);

app.listen(PORT, () => {
  console.log(`Rise Blog API listening on port ${PORT}`);
});
