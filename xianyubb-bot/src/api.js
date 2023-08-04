"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const ws_1 = require("ws");
const events = require("./Events");
const data_1 = require("./data");
const uuid = require("uuid");
class Bot {
    constructor(ws) {
        this.bot = new ws_1.WebSocket(ws);
        this.BotEvents = events.bot;
        this.WebSocketEvents = events.wsevent;
        this.echoEvent = events.echo;
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
            if (type === 'echo')
                events.echo.emit(data.uuid, data);
            this.BotEvents.emit(type, data);
        });
    }
    /**
     * 发送群消息
     * @param group_id 群号
     * @param msg 发送的信息
     * @param auto_escape 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
     */
    send_group_msg(group_id, msg, auto_escape) {
        return new Promise((reslove) => {
            const echo = uuid.v4();
            this.echoEvent.once(echo, (data) => {
                reslove(data);
            });
            this.bot.send(JSON.stringify({
                action: "send_group_msg",
                params: {
                    group_id: group_id,
                    message: msg,
                    auto_escape: auto_escape,
                },
                echo: echo,
            }));
        });
    }
    /**
    * 发送群消息
    * @param user_id QQ号
    * @param msg 发送的信息
    * @param auto_escape 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
    * @param echo 回声
    */
    send_private_msg(user_id, msg, auto_escape, echo) {
        return new Promise((resolve) => {
            const echo = uuid.v4();
            this.echoEvent.once(echo, (data) => {
                resolve(data);
            });
            this.bot.send(JSON.stringify({
                action: "send_private_msg",
                params: {
                    user_id: user_id,
                    message: msg,
                    auto_escape: auto_escape,
                },
                echo: echo,
            }));
        });
    }
    /**
     * 获取登录号信息
     */
    get_login_info() {
        return new Promise((reslove) => {
            const echo = uuid.v4();
            this.echoEvent.once(echo, (data) => {
                reslove(data);
            });
            this.bot.send(JSON.stringify({
                action: "get_login_info",
                echo: echo
            }));
        });
    }
}
exports.Bot = Bot;
//# sourceMappingURL=api.js.map