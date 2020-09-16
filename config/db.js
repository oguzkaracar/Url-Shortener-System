const mongoose = require('mongoose')
require('dotenv').config();

const db = process.env.DB_URL; 

const connectDB = async () =>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser : true,
            useUnifiedTopology: true
        })
        console.log('veritabanına bağlandık...')
    } catch (err){
        console.error(err)
        process.exit(1) // process sonlandırdık. (1) failure olarak bildir anlamına geliyor..
    }
}

module.exports = connectDB;