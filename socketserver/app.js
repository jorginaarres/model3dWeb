var host = 'localhost';
var port = process.env.PORT || 80;
var express = require('express');
const app = express();
app.use(express.static(process.cwd()+"/dist/model3dWeb/"));
var http = require('http').Server(app);

const cors_whitelist = [
  'http://hackeps.salmeronmoya.com',
  'http://hackeps.salmeronmoya.com:80',
  'http://hackeps.salmeronmoya.com:3000',
  'http://localhost',
  'http://localhost:80',
  'http://localhost:3000',
  'http://localhost:4200', '*'
];

const io = require("socket.io")(http, {
  transports: ['websocket'],
  cors: {
    origin: cors_whitelist,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

var cors = require('cors')
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if (cors_whitelist.includes(origin) || true)
      return callback(null, true)

    callback(new Error('Not allowed by CORS'));
  }
}

app.use(cors(corsOptions))

io.on('connection', function (socket) {
  socket.on('cat_configuration', function (msg) {
    io.emit('cat_configuration', msg);
  });
});

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/dist/model3dWeb/index.html")
});

http.listen(port, host, function () {
  console.log('listening on ' + host + ':' + port);
});
