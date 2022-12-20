const express = require("express");
const router = express.Router();
const UserSchema = require("../models/userSchema")
const { compare, hash } = require("bcryptjs");

router.post('/signup', async (req, res) => {
     try{
          if(req.body.data.name.lenght<3) throw new Error("아이디는 최소 3자 이상으로 등록")
          if(req.body.data.nick.lenght<2) throw new Error("닉네임은 최소 2자 이상으로 등록")
          if(req.body.data.password.lenght<6) throw new Error("비밀번호는 최소 6자 이상으로 등록")
          const hashedPW = await hash(req.body.data.password, 10) //비밀번호는 보안상 hash(bcryptjs) 처리를 해야한다.
          // option num은 높을 수록 좋지만 성능이 저하될수있다.
          const user = await new UserSchema(
               {
                    name : req.body.data.name,
                    nick : req.body.data.nick,
                    hashedPassword : hashedPW,
                    sessions : [{
                         created_at : new Date()
                    }]
               } // 새로운 user db에 저장된다. 
          ).save()
          const session = user.sessions[0];
          res.json({message: 'user Signin', sessionId: session._id, name : user.name, nick: user.nick, id: user._id,}) // logined 상태 유지를 위한 데이터 전송(checkAuth, setMe)
     }catch(err){
          res.status(400).json({message : err.message})
          throw new Error("중복된 정보.")
          
     }
}) // CREATE

router.patch('/login',async (req, res)=>{ 
     // 일부 정보들을 읽어 확인하는 과정에서 patch를 쓰는 것이 규칙
     try{
          const user = await UserSchema.findOne({name : req.body.data.name})
          const valid = await compare(req.body.data.password, user.hashedPassword)
          if(!valid) throw new Error("입력하신 정보 불일치.")
          user.sessions.push({created_at: new Date()});
          const session = user.sessions[user.sessions.length-1]; //최신 array 요소 선택하는 방법
          await user.save();
          res.json({message: "Login Success!", sessionId: session._id, name : user.name, nick: user.nick, id: user._id})
          // logined 상태 유지를 위한 데이터 전송(checkAuth, setMe)
     }catch(err){
          res.status(400).json({message : err.message})
     }
}) // Update

router.patch('/logout',async (req, res)=>{
     // 세션검증 후(미들웨어)), 로그아웃이 가능해야한다.=> 후 세션 삭제 하는 논리(보안))
     try{
          if(!req.user) throw new Error("Invalid SessionID.");
          await UserSchema.updateOne({_id: req.user.id}, 
               {$pull:{sessions : {_id : req.headers.sessionid}}} // Spull : The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
               )
          res.json({message: "Logout Complete."})
     }catch(err){
          console.log(err)
          res.status(400).json({message : err.message})
     }

}) // Update

router.patch("/delete_process", 
async (req, res)=>{
     try{
          await UserSchema.findOneAndDelete({_id: req.body.id})
          res.json({message: '삭제완료'})
     }catch(err){
          res.status(400).json({message: err.message})
     }
}); // DELETE

router.patch("/me", async(req, res) =>{
     // 로그인 정보를 확인
     // req는 authenticate 미들웨어에서 넘어온 정보.
     try{
          if(!req.user) throw new Error("권한이 없습니다..");
          res.json({message: 'Success',
          sessionId: req.headers.sessionid, 
          name : req.user.name, 
          id: req.user._id,
          nick: req.user.nick
     })
     }catch(err){
          res.status(400).json({message: err.message})
     }
}); // Read

module.exports = router