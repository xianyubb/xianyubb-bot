import { WebSocket } from "ws";
import * as events from "./Events"
import  data from "./data";
import { EventEmitter } from 'events';
import * as uuid from "uuid";



export class Bot {
  public BotEvents!: events.BotEvent;
  public WebSocketEvents!: events.WebSocketEvent;
  public echoEvent!: EventEmitter
  bot: WebSocket;
  constructor(ws: string) {
    this.bot = new WebSocket(ws)
    this.BotEvents = events.bot
    this.WebSocketEvents = events.wsevent
    this.echoEvent = events.echo
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
      if (type === 'echo') events.echo.emit(data.uuid, data);
      this.BotEvents.emit(type, data)
    })
  }


  /**
   * 发送群消息
   * @param group_id 群号
   * @param msg 发送的信息
   * @param auto_escape 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
   */
  public send_group_msg(
    group_id: number,
    msg: string,
    auto_escape: boolean,
  ) {
    return new Promise((reslove) => {
      const echo = uuid.v4()

      this.echoEvent.once(echo, (data) => {
        reslove(data)
      })

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
    });
  }
  /**
  * 发送群消息
  * @param user_id QQ号
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
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data)
      });

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
      );
    })
  }
  /**
   * 获取登录号信息
   */
  public get_login_info() {
    return new Promise((reslove) => {
      const echo = uuid.v4()

      this.echoEvent.once(echo, (data) => {
        reslove(data)
      })

      this.bot.send(JSON.stringify({
        action: "get_login_info",
        echo: echo
      }))
     
    })

  }
}
