//imports
const express = require('express');
const app = express();
const cors= require('cors')
const {port,session_secret}=require('./config');
const path=require('path');
//importamos los sockets
const socketIo = require("socket.io");
const http = require("http");
//MIDDLEWARES

app.use(express.json()); //Para leer json como objeto en url
app.use(express.urlencoded({extended:true})); //para leer formularios de todo tipo (default {extended: true})
//conection with frontend
app.use(cors());

//routes
app.use('/api',require('./routes/routes'));
//initialize
//sincronizar base de datos

//Static Files (disponible con link del navegador)
app.use('/public',express.static(path.join(__dirname,'/public')));

// Para inicializar el socket


const server = http.createServer(app);
const io = socketIo(server);
importacionSockets = require('./routes/sockets')(io);

//defining variables
//app.listen(port);

server.listen(port);
console.log('Server on port: '+port)
