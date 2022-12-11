const { createProxyMiddleware } = require('http-proxy-middleware');  //기능 추가
module.exports = function(app) {

  app.use(createProxyMiddleware( '/',{   // api가붙어있는 url만 찾을건데
      target: 'http://192.168.0.26:5000/',     // 이 경로의 url을 찾을것입니다.
      changeOrigin: true,    
      secure: false                         // 보안은 사용하지않을것입니다.
    })
  );
};