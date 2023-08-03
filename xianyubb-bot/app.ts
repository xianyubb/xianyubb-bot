import { WebSocket } from "ws";
import * as events from "./src/Events"
import data from "./src/data";
import * as fs from "fs"
import * as path from 'path';

const pluginsDir = './plugins'; // plugins文件夹路径
  // 扫描plugins文件夹下的所有js文件
  fs.readdirSync(pluginsDir).forEach(file => {
    const pluginPath = path.join(pluginsDir, file);

    // 检查文件扩展名是否为.js
    if (path.extname(pluginPath) === '.js') {
      // 导入并打印变量
      import(path.resolve(pluginPath)).then(plugin => {
        console.log(plugin);
      });
    }
  
});


const Path = "./config/config.json"



class Bot {
    public BotEvents!: events.BotEvent;
    public WebSocketEvents!: events.WebSocketEvent
    bot: WebSocket;
    constructor(ws: string) {
        this.bot = new WebSocket(ws)
        this.BotEvents = events.bot
        this.WebSocketEvents = events.wsevent
        this.bot.onopen = (events) => {
            this.connect()
        }
        this.bot.onmessage = (events) => {
            this.Afterconnect(JSON.parse(events.data.toString()))
        }
    }
    private connect() {
        this.WebSocketEvents.emit("connect")
    }


    private Afterconnect(msg: any) {
        this.WebSocketEvents.emit("message", msg)
        data(msg, (type: any, data) => {
            this.BotEvents.emit(type, data)
        })
    }


    /**
     * 发送群消息
     * @param group_id 群号
     * @param msg 发送的信息
     * @param auto_escape 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
     * @param echo 回声
     */
    public send_group_msg(
        group_id: number,
        msg: string,
        auto_escape: boolean,
        echo?: any
    ) {
        this.bot.send(
            JSON.stringify({
                action: "send_group_msg",
                params: {
                    group_id: group_id,
                    message: msg,
                    auto_escape: auto_escape,
                },
                echo: echo,
            })
        );
    }
    /**
    * 发送群消息
    * @param group_id QQ号
    * @param msg 发送的信息
    * @param auto_escape 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
    * @param echo 回声
    */
    public send_private_msg(
        user_id: number,
        msg: string,
        auto_escape: boolean,
        echo?: any
    ) {
        this.bot.send(
            JSON.stringify({
                action: "send_private_msg",
                params: {
                    user_id: user_id,

                    message: msg,
                    auto_escape: auto_escape,
                },
                echo: echo,
            })
        )
    }
}


let log = (...param:any) => {
    console.log(param)
}


const data_ = JSON.parse(fs.readFileSync(Path).toString())

export const bot = new Bot(`ws://${data_.address}:${data_.port}`)

 




function mkdir() {
  if (!fs.existsSync(Path)) {
    fs.mkdir("./config", (a) => {
    })
    fs.writeFile(Path, JSON.stringify({
      address: "127.0.0.1",
      port: 8080
    }), () => {
      log(`已在${Path}生成配置文件，请修改配置文件后开启`)
    })
  } if (!fs.existsSync("./plugins")) {
    fs.mkdir("./plugins", () => {
    })
  }
}
