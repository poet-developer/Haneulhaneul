require('dotenv').config();
const express = require('express');
const multer = require("multer");
const mime = require("mime-types");
const cors = require("cors");
const idTomulterS3 = 'test';
const mongoose = require('mongoose');
const imageRouter = require('./routes/imageRouter')



const storage = multer.diskStorage({
     destination : (req, file, cb) => cb(null, "./uploads"),
     filename : (req, res, cb) => cb(null, `${uuid()}.${mime.extension(file.mimetype)}`)
})

const upload = multer({storage,
          fileFilter : (req, file, cb) =>{
          if(['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(file.mimetype)) {
               console.log(file)
               console.log(req)
               // cb(null, true)
          }
          else cb(new Error("Invalid file type."),false)
        },
        limits:{
          fileSize: 1024 * 1024 * 5,
        }
})
const app = express();
const PORT = 5000;

app.use(express.urlencoded({limit: '50mb', extended: true}));
     //https://2dubbing.tistory.com/50 해결
app.use(express.json({limit: '50mb'}));

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI).then(() =>{
     console.log('Conneted to MongoDB.');
     app.use("/uploads", express.static("uploads")); //can show my image
     app.use('/images', imageRouter)
     app.listen(PORT, () => console.log(
          `Express on Port, ${PORT}`
     ))}
).catch(console.log)




module.exports = app;