const express = require("express");
const app = express();
const router = require("./routes");
const path = require("path");

module.exports = {
    app,
  };

require("./config/socket.config");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
