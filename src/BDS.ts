import { WebSocketServer } from "ws";
import WebSocket = require("ws");


export class Bds {
  bds: WebSocketServer

    ws: WebSocket;

  constructor(port) {
    this.bds = new WebSocketServer({
      port
    })
  }

  static send(ws:WebSocket,msg:string) {
    ws.send(msg)
  }

  static receive(ws: WebSocket) {
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
