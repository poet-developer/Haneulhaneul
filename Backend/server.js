const express = require('express');
const multer = require("multer");
const { v4:uuid } = require('uuid');
const mime = require("mime-types");
const cors = require("cors");
const idTomulterS3 = 'test';

const storage = multer.diskStorage({
     destination : (req, file, cb) => cb(null, "./uploads"),
     filename : (req, res, cb) => cb(null, `${uuid()}.${mime.extension(file.mimetype)}`)
})

const upload = multer({storage,
          fileFilter : (req, file, cb) =>{
          if(['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(file.mimetype)) cb(null, true)
          else cb(new Error("Invalid file type."),false)
        },
        limits:{
          fileSize: 1024 * 1024 * 5,
        }
})
const app = express();
const PORT = 5000;

app.use("/uploads", express.static("uploads")); //show my image

app.get("/read", async(req, res) => {
     // const info = req.query;
    try{
     //  await db.query('SELECT id,title,description,cover_src,type_id,public FROM content WHERE content.id = ?',[info.id],(error, content) => {
     //    if(error) throw error
     res.status(200).send('123.jpeg');
     //  });
    }catch(err){
      console.log(err);
      res.status(400).json({message: err.message})
    }
});
app.post("/create_process", 
// upload.single('image'), 
(req, res)=>{
     console.log('전송신호');
     console.log(req.body)
     // res.json(req.file)
}); // create

app.listen(PORT, () => console.log(
     `Express on Port, ${PORT}`
))

module.exports = app;