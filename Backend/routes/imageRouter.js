const fs = require('fs');
const { v4:uuid } = require('uuid');
const express = require("express");
const {promisify} = require('util');
const router = express.Router();
const ImageSchema = require('../models/imageSchema')

const fileUnlink = promisify(fs.unlink)

router.get("/readImages", async(req, res) => {
    try{
     const images = await ImageSchema.find()
     res.status(200).json(images);
     //  });
    }catch(err){
      res.status(400).json({message: err.message})
    }
});

router.post("/create_process", 
async (req, res)=>{
     try{
          let _key = uuid();
          let buff = Buffer.from(req.body.uri, 'base64');
          fs.writeFileSync(`./uploads/${_key}.jpg`, buff);
          await new ImageSchema({key: `${_key}.jpg`
          }).save(); // 객체로 커밋, Promise Return.
          //save to the database.
          res.json()
     }catch(err){
          res.status(400).json({message: err.message})
    }
}); // CREATE

router.post("/delete_process", 
async (req, res)=>{
     try{
          const image = await ImageSchema.findOneAndDelete({_id: req.body.id})
          await fileUnlink(`./uploads/${image.key}`);
          res.json({message: '삭제완료'})
     }catch(err){
          res.status(400).json({message: err.message})
     }
}); // DELETE

module.exports = router