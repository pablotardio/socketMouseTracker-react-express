import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:3002";
export const socket = socketIOClient(ENDPOINT, {transports: ['websocket']});