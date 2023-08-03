"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const ws_1 = require("ws");
const events = require("./src/Events");
const data_1 = require("./src/data");
const fs = require("fs");
const path = require("path");
const pluginsDir = './plugins'; // plugins文件夹路径
// 扫描plugins文件夹下的所有js文件
fs.readdirSync(pluginsDir).forEach(file => {
    var _a;
    const pluginPath = path.join(pluginsDir, file);
    // 检查文件扩展名是否为.js
    if (path.extname(pluginPath) === '.js') {
        // 导入并打印变量
        (_a = path.resolve(pluginPath), Promise.resolve().then(() => require(_a))).then(plugin => {
            console.log(plugin);
        });
    }
});
const Path = "./config/config.json";
class Bot {
    constructor(ws) {
        this.bot = new ws_1.WebSocket(ws);
        this.BotEvents = events.bot;
        this.WebSocketEvents = events.wsevent;
        this.bot.onopen = (events) => {
            this.connect();
        };
        this.bot.onmessage = (events) => {
            this.Afterconnect(JSON.parse(events.data.toString()));
        };
    }
    connect() {
        this.WebSocketEvents.emit("connect");
    }
    Afterconnect(msg) {
        this.WebSocketEvents.emit("message", msg);
        (0, data_1.default)(msg, (type, data) => {
            this.BotEvents.emit(type, data);
        });
    }
    /**
     * 发送群消息
     * @param group_id 群号
     * @param msg 发送的信息
     * @param auto_escape 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
     * @param echo 回声
     */
    send_group_msg(group_id, msg, auto_escape, echo) {
        this.bot.send(JSON.stringify({
            action: "send_group_msg",
            params: {
                group_id: group_id,
                message: msg,
                auto_escape: auto_escape,
            },
            echo: echo,
        }));
    }
    /**
    * 发送群消息
    * @param group_id QQ号
    * @param msg 发送的信息
    * @param auto_escape 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
    * @param echo 回声
    */
    send_private_msg(user_id, msg, auto_escape, echo) {
        this.bot.send(JSON.stringify({
            action: "send_private_msg",
            params: {
                user_id: user_id,
                message: msg,
                auto_escape: auto_escape,
            },
            echo: echo,
        }));
    }
}
let log = (...param) => {
    console.log(param);
};
const data_ = JSON.parse(fs.readFileSync(Path).toString());
exports.bot = new Bot(`ws://${data_.address}:${data_.port}`);
function mkdir() {
    if (!fs.existsSync(Path)) {
        fs.mkdir("./config", (a) => {
        });
        fs.writeFile(Path, JSON.stringify({
            address: "127.0.0.1",
            port: 8080
        }), () => {
            log(`已在${Path}生成配置文件，请修改配置文件后开启`);
        });
    }
    if (!fs.existsSync("./plugins")) {
        fs.mkdir("./plugins", () => {
        });
    }
}
//# sourceMappingURL=app.js.map