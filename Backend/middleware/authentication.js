const mongoose = require('mongoose')
const UserSchema = require("../models/userSchema")

// 세션을 검증하는 함수는 매번 쓰일 것이라 미들웨어로 만듦.
const authenticate = async (req, res, next) => {
     // next를 해야 router로 명시되는 미들웨어로 넘어간다. ex) userRouter, imageRouter.
     const { sessionId } = req.headers; // TODO: headers
          if(!sessionId || !mongoose.isValidObjectId(sessionId)) return next(); // 올바른 형태인지 검증하는 기능
          const user = await UserSchema.findOne({'sessions._id': sessionId});
          if(!user) return next();
          req.user = user;
          return next();

          // next가 한번만 되게끔 처리를 해야한다.
}

module.exports = { authenticate }