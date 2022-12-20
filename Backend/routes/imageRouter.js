const fs = require('fs');
const { v4:uuid } = require('uuid');
const express = require("express");
const {promisify} = require('util');
const router = express.Router();
const ImageSchema = require('../models/imageSchema')

const fileUnlink = promisify(fs.unlink)

router.get("/readImages", async(req, res) => {
    try{
     const images = await ImageSchema.find({public : true})
     res.status(200).json(images);
     //  });
    }catch(err){
      res.status(400).json({message: err.message})
    }
}); // 공유된(public true) 모든 이미지를 불러혼다 (for third page)

router.get("/readMyImages", async(req, res) => {
          try{
          const images = await ImageSchema.find({author : req.query.author})
          res.status(200).json(images);
         }catch(err){
           res.status(400).json({message: err.message})
         }
 }); // 공유 여부와 상관없이 내가 촬영한 이미지를 불러혼다 (for second page)

router.post("/create_process", 
async (req, res)=>{
     try{
          let _key = uuid(); // 16자리 key발행, 이미지 이름 중복방지
          let buff = Buffer.from(req.body.uri, 'base64');
          fs.writeFileSync(`./uploads/${_key}.jpg`, buff);
          await new ImageSchema({key: `${_key}.jpg`, author : req.body.author, weather : req.body.weather // mongoDB 새로운 이미지 저장
          }).save(); // 객체로 커밋, Promise Return.
          res.json()
     }catch(err){
          res.status(400).json({message: err.message})
    }
}); // CREATE (Baffer type Image Saved.)

router.post("/delete_process", 
async (req, res)=>{
     try{
          const image = await ImageSchema.findOneAndDelete({_id: req.body.id})
          // mongoDB id로 db찾아 삭제
          await fileUnlink(`./uploads/${image.key}`);
          // local 파일 지우기
          res.json({message: '삭제완료'})
     }catch(err){
          res.status(400).json({message: err.message})
     }
}); // DELETE 

router.patch("/public_process", // update
async (req, res)=>{
     try{
          let _public;
          if(req.body.info.public)
               _public = false
          else _public = true
          await ImageSchema.updateOne({_id: req.body.info.id}, // id 로 db 찾음
               {$set:{public : 
               _public}} // update public value(boolean)
               )
          res.json({message: "Public Complete."})
     }catch(err){
          console.log(err)
          res.status(400).json({message : err.message})
     }
}); // DELETE

module.exports = router