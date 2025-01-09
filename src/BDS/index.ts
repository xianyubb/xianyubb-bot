import * as fs from "fs";
import { WebSocket, WebSocketServer } from "ws";
import { Logger } from "../Logger";
import { Load, } from "../PluginLoader";

const data_ = JSON.parse(fs.readFileSync("./config/config.json").toString());

const logger = new Logger();

interface ConnectMessage {
    // 客户端 uuid 唯一标识符 可通过这个来访问对应 BDS
    uuid: string;
    // 客户端连接序号 (从 1 开始 断联后不会进位)
    connectNum: number;
    // 客户端 websocket
    WebSocket: WebSocket;
}




class BDS {
    public readonly server: WebSocketServer;

    private readonly Client: Array<ConnectMessage> = [];

    private connectNum = 1;

    constructor(port: number) {
        this.server = new WebSocketServer({ "port": port });
        this.server.on("connection", (ws: WebSocket) => {
            let UUID: string;

            function temp(msg: string) {
                const data = JSON.parse(msg);
                UUID = data.uuid;
                logger.log(`检测到可能 BDS 连接 uuid: ${UUID}`);
            }

            ws.on("message", temp);

            setTimeout(() => {
                if (UUID !== undefined) {
                    ws.removeListener("message", temp);
                }
            }, 3000);

            this.connectNum += 1;
            this.Client.push({ uuid: UUID, connectNum: this.connectNum, WebSocket: ws });
            Load();
            ws.on("close", () => {
                const index = this.Client.findIndex((item: ConnectMessage) => item.uuid === UUID);
                if (index > -1) {
                    this.Client.splice(index, 1);
                }
            });
        });

    }


    public sendData(data: string) {
        this.Client.forEach((CM: ConnectMessage) => {
            CM.WebSocket.send(data);
        });
    }

    public close() {
        this.server.close();
    }

    public getClients(): Array<ConnectMessage> {
        return this.Client;
    }

    public getServer(): WebSocketServer {
        return this.server;
    }
}


const bds = new BDS(data_.BDS.port);


(global as any).bds = bds;



