var app = require('express')();
var http = require('http').Server(app);
var host = 'http://hackeps.salmeronmoya.com';
const io = require("socket.io")(http, {
  cors: {
    origin: host,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
var cors = require('cors')
var port = process.env.PORT || 3000;

const whitelist = ['https://hackeps.salmeronmoya.com','http://hackeps.salmeronmoya.com', '*'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}

app.use(cors(corsOptions))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('cat_configuration', function (msg) {
    io.emit('cat_configuration', msg);
  });
});

http.listen(port, host, function () {
  console.log('listening on *:' + port);
});
