const express = require("express");
const router = express.Router();
const UserSchema = require("../models/userSchema")
const { compare, hash } = require("bcryptjs");

router.post('/signin', async (req, res) => {
     console.log(req.body)
     try{
          if(req.body.username.lenght<2) throw new Error("아이디는 최소 3자 이상으로 등록")
          if(req.body.password.lenght<6) throw new Error("비밀번호는 최소 6자 이상으로 등록")
          const hashedPW = await hash(req.body.password, 10)
          
          // option num은 높을 수록 좋지만 성능이 저하될수있다.
          const user = await new UserSchema(
               {
                    username : req.body.name,
                    nickname : req.body.nickname,
                    hashedPassword : hashedPW
               }
          ).save()
          res.json({message: 'user Signin'})
     }catch(err){
          res.status(400).json({message : err.message})
     }
})

router.post('/login',async (req, res)=>{
     try{
          const user = await UserSchema.findOne({username : req.body.username})
          const valid = await compare(req.body.password, user.hashedPassword)
          if(!valid) throw new Error("입력하신 정보 불일치.")
          res.json({message: "Login Success!"})
     }catch(err){
          res.status(400).json({message : err.message})
     }
})

module.exports = router