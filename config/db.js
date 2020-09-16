const mongoose = require('mongoose')
const config = require('config')  // bu modül global değişken tanımlamamızı ve kullanmamızı sağlıyor

const db = config.get('mongoURI') // default.json dosyasından bu key'i getir.

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