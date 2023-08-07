import { WebSocketServer } from "ws";
import WebSocket = require("ws");


export class Bds {
  bds: WebSocketServer
    ws: WebSocket;
  constructor(port) {
    this.bds = new WebSocketServer({
      port:port
    })
  }
  send(ws:WebSocket,msg:string) {
    ws.send(msg)
  }
  receive(ws: WebSocket) {
    return new Promise((resolve) => {
      ws.on("message", (msg) => {
        resolve(msg)
      })
    })
  }
  close() {
    this.bds.close()
  }
}
