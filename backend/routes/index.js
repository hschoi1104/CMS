import express from 'express';
import hello from "./hello.route.js";
var router = express.Router();

router.use("/hello",hello);

module.exports = router;
