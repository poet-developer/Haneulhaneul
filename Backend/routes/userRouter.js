const express = require("express");
const router = express.Router();
const UserSchema = require("../models/userSchema")
const { compare, hash } = require("bcryptjs");

router.post('/signin', async (req, res) => {
     console.log(req.body)
     try{
          if(req.body.name.lenght<2) throw new Error("아이디는 최소 3자 이상으로 등록")
          if(req.body.password.lenght<6) throw new Error("비밀번호는 최소 6자 이상으로 등록")
          const hashedPW = await hash(req.body.password, 10)
          
          // option num은 높을 수록 좋지만 성능이 저하될수있다.
          const user = await new UserSchema(
               {
                    name : req.body.name,
                    nick : req.body.nick,
                    hashedPassword : hashedPW,
                    sessions : [{
                         created_at : new Date()
                    }]
               }
          ).save()
          const session = user.sessions[0];
          res.json({message: 'user Signin', sessionId: session._id, name : user.name})
     }catch(err){
          res.status(400).json({message : err.message})
     }
})

router.patch('/login',async (req, res)=>{
     try{
          const user = await UserSchema.findOne({name : req.body.name})
          const valid = await compare(req.body.password, user.hashedPassword)
          if(!valid) throw new Error("입력하신 정보 불일치.")
          user.sessions.push({created_at: new Date()});
          const session = user.sessions[user.sessions.length-1]; //최신 선택하는 방법
          await user.save();
          res.json({message: "Login Success!", sessionId: session._id, name : user.name})
     }catch(err){
          res.status(400).json({message : err.message})
     }
})

router.patch('/logout',async (req, res)=>{
     // 세션검증 후(미들웨어)), 로그아웃이 가능해야한다.=> 후 세션 삭제 하는 논리(보안))
     try{
          if(!req.user) throw new Error("Invalid SessionID.");
          await UserSchema.updateOne({_id: req.user.id}, 
               {$pull:{sessions : {_id : req.headers.sessionId}}} // Spull : The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
               )
          res.json({message: "Logout Complete."})
     }catch(err){
          res.status(400).json({message : err.message})
     }

})

module.exports = router