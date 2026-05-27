const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

let lastColor = "#282c34";

// IO --> FOR EACH CLIENT
// SOCKET --> FOR 1 SPECIFIC CLIENT
// socket parameter represents an object that belong to new client info.
// Each client have their own unique info as socket in the function
io.on("connection", (socket) => {
  console.log(`User Connected!`);

  socket.emit("receive", lastColor);

  socket.on("newColor", (color) => {
    console.log(color);

    // socket.broadcast.emit() --> All clients except our client
    // io.emit() --> all clients include our client
    lastColor = color;
    io.emit("receive", color);
  });

  socket.on("disconnect", () => {
    console.log("User Left the Channel");
  });
});

http.listen(3001, () => console.log("Server is up 🚀 🚀"));
