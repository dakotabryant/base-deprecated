const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();
const runServer = require('./server').runServer;

if (process.env.NODE_ENV === 'production') {
  //Heroku will use these files
  // app.use(express.static('client/build'));
  // const path = require('path');
  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname + 'client', 'build', 'index.html'));
  // });
  // Just run the server

  runServer(undefined, process.env.PORT || 8080);
} else {
  const app = express();
  // Proxy everything through to Create React App
  app.use(
    proxy('http://localhost:3000/', {
      logLevel: 'warn', // Keep the logs clean
      ws: true, // Proxy websockets too
      router: {
        // Anything to /api goes to our backend
        'localhost:8080/api': 'http://localhost:3001'
      }
    })
  );
  app.listen(process.env.PORT || 8080);
}
