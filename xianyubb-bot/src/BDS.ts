import { WebSocketServer } from "ws";
import WebSocket = require("ws");


export class Bds {
  bds: WebSocketServer
    ws: WebSocket;
  constructor(port) {
    this.bds = new WebSocketServer({
      port:port
    })
    this.bds.on("connection", (ws) => {
      this.ws = ws;
    })
  }
  send(msg:string) {
    this.ws.send(msg)
  }
  receive() {
    return new Promise((resolve) => {
      this.ws.on("message", (msg) => {
        resolve(msg)
      })
    })
  }
}
