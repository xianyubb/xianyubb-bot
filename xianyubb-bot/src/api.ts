import { WebSocket } from 'ws';
import * as events from './Events';
import data, { Anonymous, MessageType } from './data';
import { EventEmitter } from 'events';
import * as uuid from 'uuid';

export class Bot {
  public BotEvents!: events.BotEvent;
  public WebSocketEvents!: events.WebSocketEvent;
  public echoEvent!: EventEmitter;
  bot: WebSocket;

  constructor(ws: string) {
    this.bot = new WebSocket(ws);
    this.BotEvents = events.BotEvents;
    this.WebSocketEvents = events.wsevent;
    this.echoEvent = events.echo;
    this.bot.onopen = (events) => {
      this.connect();
    };
    this.bot.onmessage = (events) => {
      this.Afterconnect(JSON.parse(events.data.toString()));
    };
  }

  private connect() {
    this.WebSocketEvents.emit('connect');
  }

  private Afterconnect(msg: any) {
    this.WebSocketEvents.emit('message', msg);
    data(msg, (type: any, data) => {
      if (type === 'echo') events.echo.emit(data.uuid, data);
      this.BotEvents.emit(type, data);
    });
  }

  /**
   * 获取登录号信息
   */
  public get_login_info() {
    return new Promise((reslove) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        reslove(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'get_login_info',
          echo: echo,
        })
      );
    });
  }
  /**
   * 设置登录号资料 (该api没有响应数据)
   * @param nickname 名称
   * @param company 公司
   * @param email 邮箱
   * @param college 学校
   * @param personal_note 个人说明
   */
  public set_qq_profile(
    nickname: string,
    company: string,
    email: string,
    college: string,
    personal_note: string
  ) {
    return new Promise((reslove) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        reslove(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'set_qq_profile',
          params: {
            nickname: nickname,
            company: company,
            email: email,
            college: college,
            personal_note: personal_note,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取企点账号信息 (该API只有企点协议可用)
   */
  public qidian_get_account_info() {
    return new Promise((reslove) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        reslove(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'qidian_get_account_info',
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取在线机型 (有关例子可从 https://github.com/Mrs4s/go-cqhttp/pull/872#issuecomment-831180149 找到)
   * @param model
   */
  public _get_model_show(model: string) {
    return new Promise((reslove) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        reslove(data);
      });

      this.bot.send(
        JSON.stringify({
          action: '_get_model_show',
          params: {
            model: model,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 设置在线机型 (有关例子可从 https://github.com/Mrs4s/go-cqhttp/pull/872#issuecomment-831180149 找到)
   * 该 API 没有响应数据
   * @param model
   * @param model_show
   */
  public _set_model_show(model: string, model_show: string) {
    return new Promise((reslove) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        reslove(data);
      });

      this.bot.send(
        JSON.stringify({
          action: '_set_model_show',
          params: {
            model: model,
            model_show: model_show,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取当前账号在线客户端列表
   * @param no_cache 是否无视缓存
   */
  public get_online_clients(no_cache: boolean) {
    return new Promise((reslove) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        reslove(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'get_online_clients',
          params: {
            no_cache: no_cache,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取陌生人信息
   * @param user_id QQ 号
   * @param no_cache 默认值:false 是否不使用缓存（使用缓存可能更新不及时, 但响应更快）
   */
  public get_stranger_info(user_id: number, no_cache: boolean = false) {
    return new Promise((reslove) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        reslove(data);
      });

      this.bot.send(
        JSON.stringify({
          action: ' get_stranger_info',
          params: {
            user_id: user_id,
            no_cache: no_cache,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取好友列表
   * 该 API 无需参数
   */
  public get_friend_list() {
    return new Promise((reslove) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        reslove(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'get_friend_list',
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取单向好友列表
   * 该 API 无需参数
   */
  public get_unidirectional_friend_list() {
    return new Promise((reslove) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        reslove(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'get_unidirectional_friend_list',
          echo: echo,
        })
      );
    });
  }

  /**
   * 删除好友
   * 该 API 无响应数据
   * @param user_id 好友 QQ 号
   */
  public delete_friend(user_id: number) {
    return new Promise((reslove) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        reslove(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'delete_friend',
          params: {
            user_id: user_id,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 删除单向好友
   * 该 API 无响应数据
   * @param user_id 好友 QQ 号
   */
  public delete_unidirectional_friend(user_id: number) {
    return new Promise((reslove) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        reslove(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'delete_unidirectional_friend',
          params: {
            user_id: user_id,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 发送群消息
   * @param group_id 群号
   * @param msg 发送的信息
   * @param auto_escape 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
   */
  public send_group_msg(group_id: number, msg: string, auto_escape: boolean) {
    return new Promise((reslove) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        reslove(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'send_group_msg',
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
  public send_private_msg(user_id: number, msg: string, auto_escape: boolean) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'send_private_msg',
          params: {
            user_id: user_id,
            message: msg,
            auto_escape: auto_escape,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 发送消息
   * @param message 要发送的内容
   * @param message_type 消息类型, 支持 private、group , 分别对应私聊、群组, 如不传入, 则根据传入的 *_id 参数判断
   * @param user_id 对方 QQ 号 ( 消息类型为 private 时需要 )
   * @param group_id 群号 ( 消息类型为 group 时需要 )
   * @param auto_escape 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
   */
  public send_msg(
    message: string,
    message_type?: string,
    user_id?: number,
    group_id?: number,
    auto_escape: boolean = false
  ) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'send_msg',
          params: {
            message_type: message_type,
            group_id: group_id,
            user_id: user_id,
            message: message,
            auto_escape: auto_escape,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取消息
   * @param message_id 消息id
   */
  public get_msg(message_id: number) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'get_msg',
          params: {
            message_id: message_id,
          },
          echo: echo,
        })
      );
    });
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
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'delete_msg',
          params: {
            message_id: message_id,
          },
          echo: echo,
        })
      );
    });
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
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'mark_msg_as_read',
          params: {
            message_id: message_id,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取合并转发内容
   * 字段 message_id 对应合并转发中的 id 字段
   * @param message_id 消息id
   */
  public get_forward_msg(message_id: number) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'get_forward_msg',
          params: {
            message_id: message_id,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 发送合并转发 ( 群聊 )
   * @param group_id 群号
   * @param message 自定义转发消息, 具体看 https://docs.go-cqhttp.org/cqcode
   */
  public send_group_forward_msg(group_id: number, message: MessageType) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'send_group_forward_msg',
          params: {
            group_id: group_id,
            message: message,
          },
          echo: echo,
        })
      );
    });
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
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'send_private_forward_msg',
          params: {
            user_id: user_id,
            message: message,
          },
          echo: echo,
        })
      );
    });
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
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'get_group_msg_history',
          params: {
            group_id: group_id,
            message: message_seq,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取图片信息
   * @param file 图片缓存文件名
   */
  public get_image(file: string) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'get_image',
          params: {
            file: file,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 检查是否可以发送图片
   * 该 API 无需参数
   */
  public can_send_image() {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'can_send_image',
          echo: echo,
        })
      );
    });
  }

  /**
   * 图片 OCR
   * 目前图片OCR接口仅支持接受的图片
   * ocr_image API移除了实验模式, 目前版本 .ocr_image 和 ocr_image 均能访问, 后期将只保留后者.
   * @param image 图片id
   */
  public ocr_image(image: string) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'ocr_image',
          params: {
            image: image,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取语音
   * 要使用此接口, 通常需要安装 ffmpeg, 请参考 OneBot 实现的相关说明。
   * @param file 收到的语音文件名（消息段的 file 参数）, 如 0B38145AA44505000B38145AA4450500.silk
   * @param out_format 要转换到的格式, 目前支持 mp3、amr、wma、m4a、spx、ogg、wav、flac
   */
  public get_record(file: string, out_format: string) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });
      this.bot.send(
        JSON.stringify({
          action: 'get_record',
          params: {
            file: file,
            out_format: out_format,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 检查是否可以发送语音
   * 该 API 无需参数
   */
  public can_send_record() {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'can_send_record',
          echo: echo,
        })
      );
    });
  }

  /**
   * 处理加好友请求
   * @param flag 加好友请求的 flag（需从上报的数据中获得）
   * @param approve 是否同意请求 (默认:true)
   * @param remark 添加后的好友备注（仅在同意时有效,默认空）
   */
  public set_friend_add_request(
    flag: string,
    approve: boolean = true,
    remark: string = ''
  ) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'set_friend_add_request',
          params: {
            flag: flag,
            approve: approve,
            remark: remark,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 处理加群请求／邀请
   * @param flag 加好友请求的
   * @param sub_type
   * @param approve 是否同意请求 (默认:true)
   * @param reason 拒绝理由（仅在拒绝时有效,默认空)
   */
  public set_group_add_request(
    flag: string,
    sub_type: 'add' | 'invite',
    approve: boolean = true,
    reason: string = ''
  ) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'set_group_add_request',
          params: {
            flag: flag,
            sub_type: sub_type,
            approve: approve,
            reason: reason,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取群信息
   * @param group_id 群号
   * @param no_cache 是否不使用缓存（使用缓存可能更新不及时, 但响应更快,默认:false)
   */
  public get_group_info(group_id: number, no_cache: boolean = false) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'get_group_info',
          params: {
            group_id: group_id,
            no_cache: no_cache,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取群列表
   * @param no_cache 是否不使用缓存（使用缓存可能更新不及时, 但响应更快,默认:false)
   */
  public get_group_list(no_cache: boolean = false) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'get_group_list',
          params: {
            no_cache: no_cache,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取群成员信息
   * @param group_id 群号
   * @param user_id QQ号
   * @param no_cache 是否不使用缓存（使用缓存可能更新不及时, 但响应更快,默认:false)
   */
  public get_group_member_info(
    group_id: number,
    user_id: number,
    no_cache: boolean = false
  ) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'get_group_member_info',
          params: {
            group_id: group_id,
            user_id: user_id,
            no_cache: no_cache,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取群成员列表
   * @param group_id 群号
   * @param no_cache 是否不使用缓存（使用缓存可能更新不及时, 但响应更快,默认:false)
   */
  public get_group_member_list(group_id: number, no_cache: boolean = false) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'get_group_member_list',
          params: {
            group_id: group_id,
            no_cache: no_cache,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取群成员列表
   * @param group_id 群号
   * @param type 	要获取的群荣誉类型, 可传入 talkative performer legend strong_newbie emotion 以分别获取单个类型的群荣誉数据, 或传入 all 获取所有数据
   */
  public get_group_honor_info(
    group_id: number,
    type:
      | 'talkactive'
      | 'performer'
      | 'legend'
      | 'strong_newbie'
      | 'emotion'
      | 'all'
  ) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'get_group_honor_info',
          params: {
            group_id: group_id,
            type: type,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取群系统消息
   * 应该是没有参数，毕竟go-cq文档没写
   */
  public get_group_system_msg() {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'get_group_system_msg',
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取精华消息列表
   * @param group_id 群号
   */
  public get_essence_msg_list(group_id: number) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'get_essence_msg_list',
          params: {
            group_id: group_id,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取群 \@全体成员 剩余次数
   * @param group_id 群号
   */
  public get_group_at_all_remain(group_id: number) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'get_group_at_all_remain',
          params: {
            group_id: group_id,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 设置群名
   * 该 API 无响应数据
   * @param group_id 群号
   * @param group_name 新群名
   */
  public set_group_name(group_id: number, group_name: string) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'set_group_name',
          params: {
            group_id: group_id,
            group_name: group_name,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 设置群头像
   * @param group_id 群号
   * @param file 图片文件名
   * @param cache 表示是否使用已缓存的文件
   */
  public set_group_portrait(group_id: number, file: string, cache: number = 1) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'set_group_portrait',
          params: {
            group_id: group_id,
            file: file,
            cache: cache,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 设置群管理员
   * 该 API 无响应数据
   * @param group_id 群号
   * @param user_id 要设置管理员的 QQ 号
   * @param enable true 为设置, false 为取消
   */
  public set_group_admin(
    group_id: number,
    user_id: number,
    enable: boolean = true
  ) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'set_group_admin',
          params: {
            group_id: group_id,
            user_id: user_id,
            enable: enable,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 设置群名片 ( 群备注 )
   * 该 API 无响应数据
   * @param group_id 群号
   * @param user_id 要设置的 QQ 号
   * @param card 群名片内容, 不填或空字符串表示删除群名片
   */
  public set_group_card(group_id: number, user_id: number, card: string = '') {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'set_group_card',
          params: {
            group_id: group_id,
            user_id: user_id,
            card: card,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 设置群组专属头衔
   * 该 API 无响应数据
   * @param group_id 群号
   * @param user_id 要设置的 QQ 号
   * @param special_title 专属头衔, 不填或空字符串表示删除专属头衔
   * @param duration 专属头衔有效期, 单位秒, -1 表示永久, 不过此项似乎没有效果, 可能是只有某些特殊的时间长度有效, 有待测试
   */
  public set_group_special_title(
    group_id: number,
    user_id: number,
    special_title: string = '',
    duration: number = -1
  ) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'set_group_special_title',
          params: {
            group_id: group_id,
            user_id: user_id,
            special_title: special_title,
            duration: duration,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 群单人禁言
   * 该 API 无响应数据
   * @param group_id 群号
   * @param user_id 要禁言的 QQ 号
   * @param duration 禁言时长, 单位秒, 0 表示取消禁言
   */
  public set_group_ban(
    group_id: number,
    user_id: number,
    duration: number = 30 * 60
  ) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'set_group_ban',
          params: {
            group_id: group_id,
            user_id: user_id,
            duration: duration,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 群全员禁言
   * 该 API 无响应数据
   * @param group_id 群号
   * @param enable 是否禁言
   */
  public set_group_whole_ban(group_id: number, enable: boolean = true) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'set_group_whole_ban',
          params: {
            group_id: group_id,
            enable: enable,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 群匿名用户禁言
   * 该 API 从 go-cqhttp-v0.9.36 开始支持
   * 该 API 无响应数据
   * 上面的 anonymous 和 anonymous_flag 两者任选其一传入即可, 若都传入, 则使用 anonymous。
   * @param group_id 群号
   * @param duration 禁言时长, 单位秒, 无法取消匿名用户禁言
   * @param anonymous 可选, 要禁言的匿名用户的 flag（需从群消息上报的数据中获得
   * @param flag 可选, 要禁言的匿名用户对象（群消息上报的 anonymous 字段）
   */
  public set_group_anonymous_ban(
    group_id: number,
    duration: number,
    anonymous?: Anonymous,
    flag?: string
  ) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'set_group_anonymous_ban',
          params: {
            group_id: group_id,
            anonymous: anonymous,
            flag: flag,
            duration: duration,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 设置精华消息
   * 该 API 没有响应数据
   * @param message_id 消息ID
   */
  public set_essence_msg(message_id: number) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'set_essence_msg',
          params: {
            message_id: message_id,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 移出精华消息
   * 该 API 没有响应数据
   * @param message_id 消息ID
   */
  public delete_essence_msg(message_id: number) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'delete_essence_msg',
          params: {
            message_id: message_id,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 移出精华消息
   * 该 API 没有响应数据
   * @param group_id 群号
   */
  public send_group_sign(group_id: number) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'send_group_sign',
          params: {
            message_id: group_id,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 群设置匿名
   * 该 API 无响应数据
   * @param group_id 群号
   * @param enable 是否禁言
   */
  public set_group_anonymous(group_id: number, enable: boolean = true) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'set_group_anonymous',
          params: {
            group_id: group_id,
            enable: enable,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 发送群公告
   * 该 API 没有响应数据
   * @param group_id 群号
   * @param content 公告内容
   * @param image 图片路径(可选)
   */
  public _send_group_notice(group_id: number, content: string, image?: string) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: '_send_group_notice',
          params: {
            group_id: group_id,
            content: content,
            image: image
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 获取群公告
   * @param group_id 群号
   */
  public _get_group_notice(group_id: number) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: '_get_group_notice',
          params: {
            group_id: group_id,
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 群组踢人
   * 该 API 无响应数据
   * @param group_id 群号
   * @param user_id 要踢的 QQ 号
   * @param reject_add_request 拒绝此人的加群请求
   */
  public set_group_kick(group_id: number, user_id: number, reject_add_request: boolean) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'set_group_kick',
          params: {
            group_id: group_id,
            user_id: user_id,
            reject_add_request: reject_add_request
          },
          echo: echo,
        })
      );
    });
  }

  /**
   * 退出群组
   * 该 API 无响应数据
   * @param group_id 群号
   * @param is_dismiss 是否解散, 如果登录号是群主, 则仅在此项为 true 时能够解散
   */
  public set_group_leave(group_id: number, is_dismiss: boolean = false) {
    return new Promise((resolve) => {
      const echo = uuid.v4();

      this.echoEvent.once(echo, (data) => {
        resolve(data);
      });

      this.bot.send(
        JSON.stringify({
          action: 'set_group_kick',
          params: {
            group_id: group_id,
            is_dismiss: is_dismiss
          },
          echo: echo,
        })
      );
    });
  }
}
