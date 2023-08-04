import { WebSocket } from "ws";
import * as events from "./Events"
import data, { MessageType, Sender } from "./data";
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
  /**
   * 设置登录号资料 (该api没有响应数据)
   * @param nickname 名称
   * @param company 公司
   * @param email 邮箱
   * @param college 学校
   * @param personal_note 个人说明
   */
  public set_qq_profile(nickname: string, company: string, email: string, college: string, personal_note: string) {
    return new Promise((reslove) => {
      const echo = uuid.v4()

      this.echoEvent.once(echo, (data) => {
        reslove(data)
      })

      this.bot.send(JSON.stringify({
        action: "set_qq_profile",
        params: {
          nickname: nickname,
          company: company,
          email: email,
          college: college,
          personal_note: personal_note
        },
        echo: echo
      }))
    })
  }
  /**
   * 获取企点账号信息 (该API只有企点协议可用)
   */
  public qidian_get_account_info() {
    return new Promise((reslove) => {
      const echo = uuid.v4()

      this.echoEvent.once(echo, (data) => {
        reslove(data)
      })

      this.bot.send(JSON.stringify({
        action: "qidian_get_account_info",
        echo: echo
      }))
    })
  }
  /**
   * 获取在线机型 (有关例子可从 https://github.com/Mrs4s/go-cqhttp/pull/872#issuecomment-831180149 找到)
   * @param model
   */
  public _get_model_show(model: string) {
    return new Promise((reslove) => {
      const echo = uuid.v4()

      this.echoEvent.once(echo, (data) => {
        reslove(data)
      })

      this.bot.send(JSON.stringify({
        action: "_get_model_show",
        params: {
          model: model
        },
        echo: echo
      }))
    })
  }
  /**
   * 设置在线机型 (有关例子可从 https://github.com/Mrs4s/go-cqhttp/pull/872#issuecomment-831180149 找到)
   * 该 API 没有响应数据
   * @param model
   * @param model_show
   */
  public _set_model_show(model: string, model_show: string) {
    return new Promise((reslove) => {
      const echo = uuid.v4()

      this.echoEvent.once(echo, (data) => {
        reslove(data)
      })

      this.bot.send(JSON.stringify({
        action: "_set_model_show",
        params: {
          model: model,
          model_show: model_show
        },
        echo: echo
      }))
    })
  }
  /**
   * 获取当前账号在线客户端列表
   * @param no_cache 是否无视缓存
   */
  public get_online_clients(no_cache: boolean) {
    return new Promise((reslove) => {
      const echo = uuid.v4()

      this.echoEvent.once(echo, (data) => {
        reslove(data)
      })

      this.bot.send(JSON.stringify({
        action: "get_online_clients",
        params: {
          no_cache: no_cache
        },
        echo: echo
      }))
    })
  }
  /**
   * 获取陌生人信息
   * @param user_id QQ 号
   * @param no_cache 默认值:false 是否不使用缓存（使用缓存可能更新不及时, 但响应更快）
   */
  public get_stranger_info(user_id: number, no_cache: boolean = false) {
    return new Promise((reslove) => {
      const echo = uuid.v4()

      this.echoEvent.once(echo, (data) => {
        reslove(data)
      })

      this.bot.send(JSON.stringify({
        action: " get_stranger_info",
        params: {
          user_id: user_id,
          no_cache: no_cache
        },
        echo: echo
      }))
    })
  }
  /**
   * 获取好友列表
   * 该 API 无需参数
   */
  public get_friend_list() {
    return new Promise((reslove) => {
      const echo = uuid.v4()

      this.echoEvent.once(echo, (data) => {
        reslove(data)
      })

      this.bot.send(JSON.stringify({
        action: "get_friend_list",
        echo: echo
      }))
    })
  }
  /**
   * 获取单向好友列表
   * 该 API 无需参数
   */
  public get_unidirectional_friend_list() {
    return new Promise((reslove) => {
      const echo = uuid.v4()

      this.echoEvent.once(echo, (data) => {
        reslove(data)
      })

      this.bot.send(JSON.stringify({
        action: "get_unidirectional_friend_list",
        echo: echo
      }))
    })
  }
  /**
   * 删除好友
   * 该 API 无响应数据
   * @param user_id 好友 QQ 号
   */
  public delete_friend(user_id: number) {
    return new Promise((reslove) => {
      const echo = uuid.v4()

      this.echoEvent.once(echo, (data) => {
        reslove(data)
      })

      this.bot.send(JSON.stringify({
        action: "delete_friend",
        params: {
          user_id: user_id
        },
        echo: echo
      }))
    })
  }
  /**
   * 删除单向好友
   * 该 API 无响应数据
   * @param user_id 好友 QQ 号
   */
  public delete_unidirectional_friend(user_id: number) {
    return new Promise((reslove) => {
      const echo = uuid.v4()

      this.echoEvent.once(echo, (data) => {
        reslove(data)
      })

      this.bot.send(JSON.stringify({
        action: "delete_unidirectional_friend",
        params: {
          user_id: user_id
        },
        echo: echo
      }))
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
  * 发送私聊消息
  * @param user_id QQ号
  * @param msg 发送的信息
  * @param auto_escape 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
  */
  public send_private_msg(
    user_id: number,
    msg: string,
    auto_escape: boolean,
   
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
 * 发送消息
 * @param message 要发送的内容
 * @param message_type 消息类型, 支持 private、group , 分别对应私聊、群组, 如不传入, 则根据传入的 *_id 参数判断
 * @param user_id 对方 QQ 号 ( 消息类型为 private 时需要 )
 * @param group_id 群号 ( 消息类型为 group 时需要 )
 * @param auto_escape 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
 */
  public send_msg(message: string, message_type?: string,user_id?:number,group_id?:number,auto_escape:boolean=false) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data)
      });

      this.bot.send(
        JSON.stringify({
          action: "send_msg",
          params: {
            message_type:message_type,
            group_id:group_id,
            user_id: user_id,
            message: message,
            auto_escape: auto_escape,
          },
          echo: echo,
        })
      );
    })
  }
  /**
   * 获取消息
   * @param message_id 消息id
   */
  public get_msg(message_id:number) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data)
      });

      this.bot.send(
        JSON.stringify({
          action: "get_msg",
          params: {
            message_id: message_id,
          },
          echo: echo,
        })
      );
    })
  }
  /**
    * 撤回消息
    * 该 API 无响应数据
    * @param message_id 消息id
    */
  public delete_msg(message_id: number) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data)
      });

      this.bot.send(
        JSON.stringify({
          action: "delete_msg",
          params: {
            message_id: message_id,
          },
          echo: echo,
        })
      );
    })
  }
  /** 
   * 标记消息已读
   * 该 API 无响应数据
   * @param message_id 消息id
   */
  public nark_msg_as_resd(message_id: number) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data)
      });

      this.bot.send(
        JSON.stringify({
          action: "mark_msg_as_read",
          params: {
            message_id: message_id,
          },
          echo: echo,
        })
      );
    })
  }
  /**
   * 获取合并转发内容
   * 字段 message_id 对应合并转发中的 id 字段
   * @param message_id 消息id
   */
  public get_forward_msg(message_id:number) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data)
      });

      this.bot.send(
        JSON.stringify({
          action: "get_forward_msg",
          params: {
            message_id: message_id,
          },
          echo: echo,
        })
      );
    })
  }
  /**
   * 发送合并转发 ( 群聊 )
   * @param group_id 群号
   * @param message 自定义转发消息, 具体看 https://docs.go-cqhttp.org/cqcode
   */
  public send_group_forward_msg(group_id:number,message:MessageType) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data)
      });

      this.bot.send(
        JSON.stringify({
          action: "send_group_forward_msg",
          params: {
            group_id:group_id,
            message: message,
          },
          echo: echo,
        })
      );
    })
  }
  /**
  * 发送合并转发 ( 好友 )
  * @param user_id 好友QQ号
  * @param message 自定义转发消息, 具体看 https://docs.go-cqhttp.org/cqcode
  */
  public send_private_forward_msg(user_id: number, message: MessageType) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data)
      });

      this.bot.send(
        JSON.stringify({
          action: "send_private_forward_msg",
          params: {
            user_id: user_id,
            message: message,
          },
          echo: echo,
        })
      );
    })
  }
  /**
  * 获取群消息历史记录
  * 不提供起始序号将默认获取最新的消息
  * @param group_id 群号
  * @param message_seq 起始消息序号, 可通过 get_msg 获得
  */
  public get_group_msg_history(group_id: number, message_seq?: number) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data)
      });

      this.bot.send(
        JSON.stringify({
          action: "get_group_msg_history",
          params: {
            group_id: group_id,
            message: message_seq,
          },
          echo: echo,
        })
      );
    })
  }
}  
