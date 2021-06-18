const app = require("express")();
const server = require("http").createServer(app);

const cors = require("cors");

app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  let roomId = 0;
  let userName = "";

  //joining in a room
  socket.on("joinroom", function (data) {
    roomId = data.room;
    userName = data.name;
    socket.join(roomId);
    socket.to(roomId).emit("userjoined", userName);
  });

  socket.on("message", (message) => {
    socket.to(roomId).emit("message", message);
  });

  socket.on("chatmessage", (data) => {
    socket.to(roomId).emit("chatmessage", data);
  });

  socket.on("disconnect", function () {
    socket.to(roomId).emit("userleft", userName);
  });
});

app.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

server.listen(process.env.PORT || 4000, function () {
  console.log("server is working");
});
