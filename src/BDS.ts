import { WebSocketServer } from "ws";
import WebSocket = require("ws");


export class BDS {
  bds: WebSocketServer

  ws: WebSocket;

  constructor(port: number) {
    this.bds = new WebSocketServer({
      "port": port
    })
  }

  static send(ws: WebSocket, msg: string) {
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

