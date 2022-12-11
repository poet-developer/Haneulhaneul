const express = require('express');
const multer = require("multer");
const { v4:uuid } = require('uuid');
const mime = require("mime-types");
const router = express.Router();
const idTomulterS3 = 'test';

const storage = multer.diskStorage({
     destination : (req, file, cb) => cb(null, "./uploads"),
     filename : (req, res, cb) => cb(null, `${uuid()}.${mime.extension(file.mimetype)}`)
})

const upload = multer({storage})

router.post("/create_process", upload.single('image'), (req, res)=>{
     console.log(req.file)
     res.json(req.file)
});