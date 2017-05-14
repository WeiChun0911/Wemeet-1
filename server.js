'use strict';

//回傳一個具有express的library的物件，當作處理request的Callback
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ type: 'image/*', extended: false, limit: '50mb' }));
app.use(bodyParser.json({ type: 'application/*', limit: '50mb' }));
app.use(bodyParser.text({ type: 'text/plain' }));
const fs = require('fs');
//const db = require('./app/lib/db.js');
let connection = {};
let onlineUser = {}; //在線用戶
let onlineCount = 0; //在線用戶人數


//HTTPS參數
const option = {
    key: fs.readFileSync('./public/certificate/privatekey.pem'),
    cert: fs.readFileSync('./public/certificate/certificate.pem')
};

//對https Server內傳入express的處理物件
const server = require('https').createServer(option, app);
const io = require('socket.io')(server);
server.listen(8787);
console.log('已啟動伺服器!');


//資料庫「查詢」部分
app.get("/api/db/read/account", (req, res) => {
    db.Account.find({}, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
});
app.get("/api/db/read/onlineList", (req, res) => {
    db.OnlineList.find({}, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
});
app.get("/api/db/read/meetingList", (req, res) => {
    db.MeetingList.find({}, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
});
app.get("/api/db/read/sourceList", (req, res) => {
    db.SourceList.find({}, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
});

//資料庫「新增」部分
app.post("/api/db/create/register", (req, res) => {
    var { username, password, name, birthday, email, registerTime } = req.body;
    db.Account.create({
        username: username,
        password: password,
        name: name,
        birthday: birthday,
        email: email,
        registerTime: registerTime
    }, function(err, data) {
        if (err) console.log(err);
        console.log(data);
    });
});

app.post("/api/db/create/photo", (req, res) => {
    db.Account.findOneAndUpdate({ username: 'change' }, { photo: req.body.data }, (err, data) => {
        if (err) console.log(err);
        console.log('photo success');
    });
});

app.post("/api/db/save/video", (req, res) => {


})

// app.get("/api/db/test", (req, res) => {
//     res.sendFile(__dirname + '/public/src/je.jpg');
// });

io.on('connection', function(socket) {
    connection[socket.id] = socket;
    //監聽使用者人數
    if (!onlineUser.hasOwnProperty(socket.id)) {
        onlineUser[socket.id] = socket.id;
        onlineCount++;
        //console.log("使用者目前人數: " + onlineCount + " 人");
        socket.emit('login', [onlineUser, onlineCount]);
        socket.broadcast.emit('login', [onlineUser, onlineCount]);
    };


    socket.on('id', (msg) => {
        socket.emit('success', socket.id);
    })


    socket.on('join', function(room) {
        socket.join(room);
        console.log('加入成功!',socket.id,room);
        socket.emit('joined', room, socket.id);
    });


    socket.on('newParticipantA', function(msgSender, room) {
        socket.to(room).emit('newParticipantB', msgSender);
    });


    socket.on('offerRemotePeer', function(offer, sender, receiver) {
        socket.to(receiver).emit('offer', offer, sender);
    });

    socket.on('answerRemotePeer', function(answer, sender, receiver) {
        socket.to(receiver).emit('answer', answer, sender);
    });

    socket.on('onIceCandidateA', function(candidate, sender, receiver) {
        socket.to(receiver).emit('onIceCandidateB', candidate, sender);
    });

    socket.on('disconnect', function() {
        console.log("使用者: " + socket.id + " 離開了");
        socket.broadcast.emit('participantLeft', socket.id);
        onlineUser[socket.id] = socket.id;
        delete onlineUser[socket.id];
        onlineCount--;
        console.log("使用者目前人數: " + onlineCount + " 人");
        socket.emit('logout', [onlineUser, onlineCount]);
        socket.broadcast.emit('login', [onlineUser, onlineCount]);
    });

    socket.on('requestVideoFromUser', function(sender) {
        console.log('使用者:' + socket.id + '請求了他的錄影BLOB檔');
    });

    socket.on('bye', function() {
        console.log('received bye');
    });

});

//沒有定義路徑，則接收到請求就執行這個函數
app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
