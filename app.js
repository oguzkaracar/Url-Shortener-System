// Custom URL Shortener Service like ==> bit.ly
// İlk önce API yazılacak daha sonra kullanıcı versiyonu oluşturulacak...
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Database connection
connectDB();

// middlewares
app.use(express.json({ extended: false }));


// Routes 

app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'))

const PORT = 3000;
app.listen(PORT, () => console.log("server çalıştı..."));
