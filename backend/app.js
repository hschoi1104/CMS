import express from 'express';
import { logger } from './config/winston';
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import indexRouter from "./routes/index";


var app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// errorHandler
app.use(function (err, req, res, next) {
  logger.error(err.message);
  return res
    .status(err.status || 500)
    .json({ success: false, status: err.status, message: err.message });
});

// Connect Mongodb
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
  logger.info("Connected to mongod server");
});
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = app;
