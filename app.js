// Custom URL Shortener Service like ==> bit.ly
// İlk önce API yazılacak daha sonra kullanıcı versiyonu oluşturulacak...
const express = require("express");
const connectDB = require("./config/db");
require('dotenv').config()
const app = express();

// Database connection
connectDB();

// middlewares
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
// app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
// Routes

app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("server çalıştı..."));
