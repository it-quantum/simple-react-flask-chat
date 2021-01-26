import {io} from 'socket.io-client'

let socket = io("http://127.0.0.1:5000/talks", { autoConnect: false });

export default socket;