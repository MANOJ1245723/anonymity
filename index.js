import  express  from "express";
import { createServer } from "http";
import {Server} from "socket.io";
import generateName from 'sillyName';
const app  = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile("index.html");
})
io.on("connection", (socket) => {
    const username = generateName();
    socket.emit('username', username);
    console.log("user connected", socket.id);
    socket.on('message', (data) => {
        console.log("server listened to message event", data);
        io.emit('message', data);
    });
});
server.listen(3000);