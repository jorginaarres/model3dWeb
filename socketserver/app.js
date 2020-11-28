var app = require('express')();
var http = require('http').Server(app);
var host = 'hackeps.salmeronmoya.com';
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
  cors: {
    origin: cors_whitelist,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
var cors = require('cors')

var port = process.env.PORT || 3000;
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

http.listen(port, host, function () {
  console.log('listening on ' + host + ':' + port);
});
