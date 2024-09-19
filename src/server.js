require('dotenv').config();
const http = require('http');
const https = require('https');
const app = require('./app');
const fs = require('fs');

const PORT = process.env.PORT || 8080;

const startServer = () => {
  if (process.env.NODE_ENV === 'production') {
    http.createServer(app).listen(PORT, () => {
      console.log(`Server is started`);
    });
  } else {
    const httpsOptions = {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    };
    https.createServer(httpsOptions, app).listen(PORT, () => {
      console.log(`Server is running on https://localhost:${PORT}`);
    });
  }
};

startServer();
