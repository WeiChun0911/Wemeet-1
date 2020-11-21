import socketIO from 'socket.io-client';
import socketServerURL from './config';

let io = socketIO();
let socket = io.connect(socketServerURL);

export default socket;

