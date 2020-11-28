var app = require('express')();
var http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});
var cors = require('cors')
var port = process.env.PORT || 3000;
var host = 'hackeps.salmeronmoya.com';


app.use(cors({ origin: 'https://hackeps.salmeronmoya.com', credentials: false }))

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
