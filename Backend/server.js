require('dotenv').config();
const express = require('express');
const multer = require("multer");
const { v4:uuid } = require('uuid');
const mime = require("mime-types");
const cors = require("cors");
const idTomulterS3 = 'test';
const fs = require('fs');
const mongoose = require('mongoose');
const ImageSchema = require('./models/imageSchema')

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

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI).then(() =>{
     console.log('Conneted to MongoDB.');
     app.use(express.urlencoded({limit: '50mb', extended: true}));
     //https://2dubbing.tistory.com/50 해결
     app.use(express.json({limit: '50mb'}));
     
     app.use("/uploads", express.static("uploads")); //can show my image
     
     app.get("/readImages", async(req, res) => {
          // const info = req.query;
         try{
          const images = await ImageSchema.find()
          res.status(200).json(images);
          //  });
         }catch(err){
           console.log(err);
           res.status(400).json({message: err.message})
         }
     });
     
     app.post("/create_process", 
     async (req, res)=>{
          let _key = uuid();
          let buff = Buffer.from(req.body.uri, 'base64');
          fs.writeFileSync(`./uploads/${_key}.jpg`, buff);
          await new ImageSchema({key: `${_key}.jpg`}).save(); // 객체로 커밋, Promise Return.
          //save to the database.
          res.json()
     }); // CREATE
     
     app.listen(PORT, () => console.log(
          `Express on Port, ${PORT}`
     ))}
).catch(console.log)




module.exports = app;