/// <reference types="node" />


interface Data {
  /** 事件发生的unix时间戳 */
  time: number;
  /** 收到事件的机器人的 QQ 号 */
  self_id: number;
  /** 表示该上报的类型 */
  post_type: string;
}

interface Anonymous {
  /** 匿名用户 ID */
  id: number;
  /** 匿名用户名称 */
  name: string;
  /** 匿名用户 flag, 在调用禁言 API 时需要传入 */
  flag: string;
}

// message消息
interface MessageType {
  type: string;
  data: {
    text?: string;
    id?: number | string;
    file?: string;
    at?: number;
    url?: string;
    title?: string;
    content?: string;
    image?: string;
    type?: "qq" | "group";
    lat?: string | number;
    lon?: string | number;
    audio?: string;
    qq?: number;
    time?: number;
    uin?: number;
    seq?: MessageType;
  };
}
interface Sender {
  /** 发送者 QQ 号 */
  user_id: number;
  /** 昵称 */
  nickname: string;
  /** 性别 */
  sex?: string;
  /** 年龄 */
  age?: number;
  /** 临时群消息来源群号 */
  group_id?: number;
  /** 群名片/备注 */
  card?: string;
  /** 地区 */
  area?: string;
  /** 成员等级 */
  level?: string;
  /** 角色 */
  role?: string;
  /** 专属头衔 */
  title?: string;
}

interface Message extends Data {
  group_id: number;
  message_type: "private" | "group";
  sub_type: string;
  message_id: number;
  /** QQ 号 */
  user_id: number;
  message: string | MessageType[];
  raw_message: string;
  font: number;
  sender: Sender;
  target_id: number;
  anonymous: null | Anonymous;
  temp_source: number;
}

/** 群消息 */
interface GroupMessage extends Data {
  /** 消息子类型 */
  sub_type: string;
  /** 消息 ID */
  message_id: number;
  /** 发送者 QQ 号 */
  user_id: number;
  /** 消息内容 */
  message: string | MessageType[];
  /** 原始消息内容 */
  raw_message: string;
  /** 字体 */
  font: number;
  /** 发送者信息 */
  sender: Sender;
  /** 群号 */
  group_id: number;
  /** 匿名信息, 如果不是匿名消息则为 null */
  anonymous: null | Anonymous;
}
/** 私聊消息 */
interface PrivateMessage extends Data {
  /** 消息子类型 */
  sub_type: string;
  /** 消息 ID */
  message_id: number;
  /** 发送者 QQ 号 */
  user_id: number;
  /** 消息内容 */
  message: string | MessageType[];
  /** 原始消息内容  */
  raw_message: string;
  /** 字体 */
  font: number;
  /** 发送者信息 */
  sender: Sender;
  /** 接受者 QQ 号 */
  target_id: number;
  /** 临时会话来源 */
  temp_source: number;
}

// notice消息
interface Notice extends Data {
  notice_type: string;
  /** QQ 号 */
  user_id: number;
  group_id: number;
  sub_type: string;
  operator_id: number;
  message_id: number;
  file: file;
  duration: number;
  sender_id: number;
  target_id: number;
  honor_type: "talkative" | "performer" | "emotion";
  title: string;
  card_new: string;
  card_old: string;
  client: any;
  online: boolean;
}

interface file {
  /** 文件 ID */
  id?: string;
  /** 文件名 */
  name: string;
  /** 文件大小（字节数） */
  size: number;
  /** 下载链接 */
  url?: string;
  /** busid（目前不清楚有什么用） */
  busid?: number;
}

/** 私聊消息撤回 */
interface PrivateDeleteMsg extends Data {
  /** 好友 QQ 号 */
  user_id: number;
  /** 被撤回的消息 ID */
  message_id: number;
}
/** 群消息撤回 */
interface GroupDeleteMsg extends Data {
  /** 群号 */
  group_id: number;
  /** 操作者QQ号  */
  operator_id: number;
  /** QQ 号 */
  user_id: number;
  /** 被撤回的消息 ID */
  message_id: number;
}

/** 群成员增加 */
interface GroupMemberAdd extends Data {
  /** 事件子类型 */
  sub_type: string;
  /** 加入者 QQ 号 */
  user_id: number;
  /** 群号 */
  group_id: number;
  /** 操作者QQ号  */
  operator_id: number;
}

/** 群成员减少 */
interface GroupMemberDecrease extends Data {
  /** 事件子类型 */
  sub_type: string;
  /** 群号 */
  group_id: number;
  /** 操作者 QQ 号 */
  operator_id: number;
  /** 离开者 QQ 号 */
  user_id: number;
}

/** 群管理员变动 */
interface GroupAdminChange extends Data {
  /** 事件子类型 */
  sub_type: string;
  /** 群号 */
  group_id: number;
  /** 管理员 QQ 号 */
  user_id: number;
}

/** 群文件上传 */
interface GroupFileUpload extends Data {
  /** 群号 */
  group_id: number;
  /** 发送者 QQ 号 */
  user_id: number;
  /** 文件信息 */
  file: file;
}

/** 群禁言 */
interface GroupBan extends Data {
  /** 事件子类型 */
  sub_type: string;
  /** 群号 */
  group_id: number;
  /** 操作者 QQ 号 */
  operator_id: number;
  /** 被禁言 QQ 号 */
  user_id: number;
  /** 禁言时长 */
  duration: number;
}

/** 好友添加 */
interface FrienAdd extends Data {
  /** 新添加好友 QQ 号 */
  user_id: number;
}

/** 戳一戳 */
interface Notify extends Data {
  /** 发送者 QQ 号 */
  sender_id?: number;
  /** 发送者 QQ 号 */
  user_id: number;
  /** 被戳者 QQ 号 */
  target_id: number;
  /** 群号 */
  group_id?: number;
}

/** 群红包运气王提示 */
interface GroupRedbagLuckyKing extends Data {
  /** 群号 */
  group_id: number;
  /** QQ 号 */
  user_id: number;
  /** 运气王 ID */
  target_id: number;
}

/** 群成员荣誉变更提示 */
interface GroupMemberHonorChange extends Data {
  /** 群号 */
  group_id: number;
  /** 成员 ID */
  user_id: number;
  /** 荣誉类型 */
  honor_type: string;
}

/** 群成员头衔变更 */
interface GroupMemberTitleChange extends Data {
  /** 群号 */
  group_id: number;
  /** 变更头衔的用户 QQ 号 */
  user_id: number;
  /** 获得的新头衔 */
  title: string;
}

/** 群成员名片更新 */
interface GroupCardChange extends Data {
  /** 群号 */
  group_id: number;
  /** 成员 ID  */
  user_id: number;
  /** 新名片 */
  card_new: string;
  /** 旧名片 */
  card_old: string;
}

/** 接收到离线文件 */
interface ReceiveOfflineFile extends Data {
  /** 发送者 ID */
  user_id: number;
  /** 文件数据 */
  file: file;
}

/** 其他客户端在线状态变更 */
interface ClientStatusChange extends Data {
  /** 客户端信息 */
  client: any;
  /** 当前是否在线 */
  online: boolean;
}

/** 精华消息变更 */
interface EssenceMessageChange extends Data {
  /** 事件子类型 */
  sub_type: string;
  /** 群号 */
  group_id: number;
  /** 消息发送者 ID  */
  sender_id: number;
  /** 操作者 ID */
  operator_id: number;
  /** 消息 ID */
  message_id: number;
}

// request消息
interface Request extends Data {
  request_type: string;
  /** QQ 号 */
  user_id: number;
  comment: string;
  flag: string;
  sub_type: string;
  /** 群号 */ group_id: number;
}

/** 加好友请求 */
interface AddFriendRequest extends Data {
  /** 发送请求的 QQ 号 */
  user_id: number;
  /** 验证信息 */
  comment: string;
  /** 请求 flag, 在调用处理请求的 API 时需要传入 */
  flag: string;
}

/** 加群请求／邀请 */
interface AddGroupRequest extends Data {
  /** 发送请求的 QQ 号 */
  user_id: number;
  /** 群号 */
  group_id: number;
  /** 验证信息 */
  comment: string;
  /** 请求子类型 */
  sub_type: string;
  /** 请求 flag, 在调用处理请求的 API 时需要传入 */
  flag: string;
}

// meta_event
interface MetaEvent extends Data {
  meta_event_type: string;
  status: Status;
  interval: number;
  sub_type: string;
}

interface Status {
  /** 程序是否初始化完毕 */
  app_initialized: boolean;
  /** 程序是否可用 */
  app_enabled: boolean;
  /** 插件正常(可能为 null) */
  plugins_good: boolean;
  /** 程序正常 */
  app_good: boolean;
  /** 是否在线 */
  online: boolean;
  /** 统计信息 */
  stat: boolean;
}

/** 心跳包 */
interface HeartBeat {
  /** 应用程序状态 */
  status: Status;
  /** 距离上一次心跳包的时间(单位是毫秒) */
  interval: number;
}

/** 生命周期 */
interface LifeCycle {
  /** 子类型 */
  sub_type: string;
}

// echo
interface Returnecho {
  status: string;
  retcode: number;
  uuid: string;
}

// Bot 账号

interface Device {
  /** 客户端ID */
  app_id: number;
  /** 设备名称 */
  device_name: string;
  /** 设备类型 */
  device_kind: string;
}

interface get_login_infoEcho extends Returnecho {
  /** 响应数据 */
  data: {
    /** QQ 号 */
    user_id: number;
    /** QQ昵称 */
    nickname: string;
  };
}

interface set_qq_profileEcho extends Returnecho { }

interface qidian_get_account_infoEcho extends Returnecho {
  /** 响应数据 */
  data: {
    /** QQ 号 */
    user_id: number;
    /** QQ昵称 */
    nickname: string;
  };
}

interface _get_model_showEcho extends Returnecho {
  /** 响应数据 */
  data: {
    variants: [model_show: string, need_pay: boolean];
  };
}

interface _set_model_showEcho extends Returnecho { }

interface get_online_clientsEcho extends Returnecho {
  /** 响应数据 */
  data: {
    /** 在线客户端列表 */
    clients: Device[];
  };
}

// 好友信息

interface get_stranger_infoEcho extends Returnecho {
  /** 响应数据 */
  data: {
    /** QQ号 */
    user_id: number;
    /** 昵称 */
    nickname: string;
    /** 性别, male 或 female 或 unknown */
    sex: string;
    /** 年龄 */
    age: number;
    /** qid ID身份卡 */
    qid: string;
    /** 等级 */
    level: number;
    /** 官网写的等级，我认为是注册天数 */
    login_days: number;
  };
}

interface get_friend_listEcho extends Returnecho {
  /** 响应数据 */
  data: {
    /** QQ号 */
    user_id: number;
    /** 昵称 */
    nickname: string;
    /** 备注名 */
    remark: string;
  };
}

interface get_unidirectional_friend_listEcho extends Returnecho {
  /** 响应数据 */
  data: {
    /** QQ号 */
    user_id: number;
    /** 昵称 */
    nickname: string;
    /** 来源 */
    source: string;
  };
}

declare namespace bot {
  namespace BotEvents {
    function removeListener(
      event: string | symbol,
      listener: (...args: any[]) => void
    );

    /** 收到群聊消息 */
    function on(
      event: "onReceiveGroupMessage",
      listener: (msg: GroupMessage) => void
    ): any;
    /** 收到私聊消息 */
    function on(
      event: "onReceivePrivateMessage",
      listener: (msg: PrivateMessage) => void
    ): any;
    /** 私聊消息撤回 */
    function on(
      Event: "onPrivateDeleteMsg",
      listener: (msg: PrivateDeleteMsg) => void
    ): any;
    /** 群聊消息撤回 */
    function on(
      Event: "onGroupDeteleMsg",
      listener: (msg: GroupDeleteMsg) => void
    ): any;
    /** 群聊成员增加 */
    function on(
      Event: "onGroupMemberAdd",
      listener: (msg: GroupMemberAdd) => void
    ): any;
    /** 群聊成员减少 */
    function on(
      Event: "onGroupMemberDecrease",
      listener: (msg: GroupMemberDecrease) => void
    ): any;
    /** 群聊管理员变动 */
    function on(
      Event: "onGroupAdminChange",
      listener: (msg: GroupAdminChange) => void
    ): any;
    /** 群聊文件上传 */
    function on(
      Event: "onGroupfileUpload",
      listener: (msg: GroupFileUpload) => void
    ): any;
    /** 群聊禁言 */
    function on(Event: "onGroupBan", listener: (msg: GroupBan) => void): any;
    /** 好友添加 */
    function on(Event: "onFriendAdd", listener: (msg: FrienAdd) => void): any;
    /** 戳一戳
     * 此事件无法在手表协议上触发
     */
    function on(Event: "onNotify", listener: (msg: Notify) => void): any;
    /** 群聊红包运气王提示
     * 此事件无法在手表协议上触发
     */
    function on(
      Event: "onGroupRedbagLuckyKing",
      listener: (msg: GroupRedbagLuckyKing) => void
    ): any;
    /** 群聊成员荣誉变更提示
     * 此事件无法在手表协议上触发
     */
    function on(
      Event: "onGroupMemberHonorChange",
      listener: (msg: GroupMemberHonorChange) => void
    ): any;
    /** 群聊成员头衔变更 */
    function on(
      Event: "onGroupMemberTitleChange",
      listener: (msg: GroupMemberTitleChange) => void
    ): any;
    /** 群聊成员名片更新
     * 此事件不保证时效性, 仅在收到消息时校验卡片
     */
    function on(
      Event: "onGroupCardChange",
      listener: (msg: GroupCardChange) => void
    ): any;
    /** 接收到离线文件 */
    function on(
      Event: "onReceiveOfflinefile",
      listener: (msg: ReceiveOfflineFile) => void
    ): any;
    /** 其他客户端在线状态变更 */
    function on(
      Event: "onClientStatusChange",
      listener: (msg: ClientStatusChange) => void
    ): any;
    /** 精华消息变更 */
    function on(
      Event: "onEssenceMessageChange",
      listener: (msg: EssenceMessageChange) => void
    ): any;
    /** 加好友请求 */
    function on(
      Event: "onAddFriendRequest",
      listener: (msg: AddFriendRequest) => void
    ): any;
    /** 加群聊/邀请 */
    function on(
      Event: "onAddGroupRequest",
      listener: (msg: AddGroupRequest) => void
    ): any;
    /** 心跳包 */
    function on(Event: "onHeartBeat", listener: (msg: HeartBeat) => void): any;
    /** 生命周期 */
    function on(Event: "onLifeCycle", listener: (msg: LifeCycle) => void): any;
  }

  /** 获取登录号信息 */
  function get_login_info(): Promise<get_login_infoEcho>;
  /**
   * 设置登录号资料 (该api没有响应数据)
   * @param nickname 名称
   * @param company 公司
   * @param email 邮箱
   * @param college 学校
   * @param personal_note 个人说明
   */
  function set_qq_profile(
    nickname: string,
    company: string,
    email: string,
    college: string,
    personal_note: string
  ): Promise<Returnecho>;

  /**
   * 获取企点账号信息 (该API只有企点协议可用)
   */
  function qidian_get_account_info(): Promise<qidian_get_account_infoEcho>;

  /**
   * 获取在线机型 (有关例子可从 https://github.com/Mrs4s/go-cqhttp/pull/872#issuecomment-831180149 找到)
   * @param model 机型名称
   */
  function _get_model_show(model: string): Promise<_get_model_showEcho>;

  /**
   * 设置在线机型 (有关例子可从 https://github.com/Mrs4s/go-cqhttp/pull/872#issuecomment-831180149 找到)
   * 该 API 没有响应数据
   * @param model 机型名称
   * @param model_show
   */
  function _set_model_show(
    model: string,
    model_show: string
  ): Promise<_set_model_showEcho>;
  /**
   * 获取当前账号在线客户端列表
   * @param no_cache 是否无视缓存
   */
  function get_online_clients(
    no_cache: boolean
  ): Promise<get_online_clientsEcho>;

  /**
   * 获取陌生人信息
   * @param user_id QQ 号
   * @param no_cache 默认值:false 是否不使用缓存（使用缓存可能更新不及时, 但响应更快）
   */
  function get_stranger_info(
    user_id: number,
    no_cache: boolean
  ): Promise<get_stranger_infoEcho>;

  /**
   * 获取好友列表
   * 该 API 无需参数
   */
  function get_friend_list(): Promise<get_friend_listEcho>;

  /**
   * 获取单向好友列表
   * 该 API 无需参数
   */
  function get_unidirectional_friend_list(): Promise<get_unidirectional_friend_listEcho>;

  /**
   * 删除好友
   * 该 API 无响应数据
   * @param user_id 好友 QQ 号
   */
  function delete_friend(user_id: number): Promise<Returnecho>;

  /**
   * 删除单向好友
   * 该 API 无响应数据
   * @param user_id 好友 QQ 号
   */
  function delete_unidirectional_friend(user_id: number): Promise<Returnecho>;

  /**
   * 发送群消息
   * @param group_id 群号
   * @param msg 发送的信息
   * @param auto_escape 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
   */
  function send_group_msg(
    group_id: number,
    msg: string | CQCode[],
    auto_escape?: boolean
  ): Promise<Returnecho>;

  /**
   * 发送私聊消息
   * @param user_id QQ号
   * @param msg 发送的信息
   * @param auto_escape 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
   */
  function send_private_msg(
    user_id: number,
    msg: string | CQCode[],
    auto_escape?: boolean
  ): Promise<Returnecho>;

  /**
   * 发送消息
   * @param message 要发送的内容
   * @param message_type 消息类型, 支持 private、group , 分别对应私聊、群组, 如不传入, 则根据传入的 *_id 参数判断
   * @param user_id 对方 QQ 号 ( 消息类型为 private 时需要 )
   * @param group_id 群号 ( 消息类型为 group 时需要 )
   * @param auto_escape 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
   */
  function send_msg(
    message: string | CQCode[],
    auto_escape: boolean,
    message_type?: string,
    user_id?: number,
    group_id?: number
  ): Promise<Returnecho>;

  /**
   * 获取消息
   * @param message_id 消息id
   */
  function get_msg(message_id: number): Promise<Returnecho>;

  /**
   * 撤回消息
   * 该 API 无响应数据
   * @param message_id 消息id
   */
  function delete_msg(message_id: number): Promise<Returnecho>;

  /**
   * 标记消息已读
   * 该 API 无响应数据
   * @param message_id 消息id
   */
  function nark_msg_as_resd(message_id: number): Promise<Returnecho>;

  /**
   * 获取合并转发内容
   * 字段 message_id 对应合并转发中的 id 字段
   * @param message_id 消息id
   */
  function get_forward_msg(message_id: number): Promise<Returnecho>;

  /**
   * 发送合并转发 ( 群聊 )
   * @param group_id 群号
   * @param message 自定义转发消息, 具体看 https://docs.go-cqhttp.org/cqcode
   */
  function send_group_forward_msg(
    group_id: number,
    message: MessageType
  ): Promise<Returnecho>;

  /**
   * 发送合并转发 ( 好友 )
   * @param user_id 好友QQ号
   * @param message 自定义转发消息, 具体看 https://docs.go-cqhttp.org/cqcode
   */
  function send_private_forward_msg(
    user_id: number,
    message: MessageType
  ): Promise<Returnecho>;

  /**
   * 获取群消息历史记录
   * 不提供起始序号将默认获取最新的消息
   * @param group_id 群号
   * @param message_seq 起始消息序号, 可通过 get_msg 获得
   */
  function get_group_msg_history(
    group_id: number,
    message_seq?: number
  ): Promise<Returnecho>;

  /**
   * 获取图片信息
   * @param file 图片缓存文件名
   */
  function get_image(file: string): Promise<Returnecho>;

  /**
   * 检查是否可以发送图片
   * 该 API 无需参数
   */
  function can_send_image(): Promise<Returnecho>;

  /**
   * 图片 OCR
   * 目前图片OCR接口仅支持接受的图片
   * ocr_image API移除了实验模式, 目前版本 .ocr_image 和 ocr_image 均能访问, 后期将只保留后者.
   * @param image 图片id
   */
  function ocr_image(image: string): Promise<Returnecho>;

  /**
   * 获取语音
   * 要使用此接口, 通常需要安装 ffmpeg, 请参考 OneBot 实现的相关说明。
   * @param file 收到的语音文件名（消息段的 file 参数）, 如 0B38145AA44505000B38145AA4450500.silk
   * @param out_format 要转换到的格式, 目前支持 mp3、amr、wma、m4a、spx、ogg、wav、flac
   */
  function get_record(file: string, out_format: string): Promise<Returnecho>;

  /**
   * 检查是否可以发送语音
   * 该 API 无需参数
   */
  function can_send_record(): Promise<Returnecho>;

  /**
   * 处理加好友请求
   * @param flag 加好友请求的 flag（需从上报的数据中获得）
   * @param approve 是否同意请求 (默认:true)
   * @param remark 添加后的好友备注（仅在同意时有效,默认空）
   */
  function set_friend_add_request(
    flag: string,
    approve: boolean,
    remark: string
  ): Promise<Returnecho>;

  /**
   * 处理加群请求／邀请
   * @param flag 加好友请求的
   * @param sub_type
   * @param approve 是否同意请求 (默认:true)
   * @param reason 拒绝理由（仅在拒绝时有效,默认空)
   */
  function set_group_add_request(
    flag: string,
    sub_type: "add" | "invite",
    approve: boolean,
    reason: string
  ): Promise<Returnecho>;

  /**
   * 获取群信息
   * @param group_id 群号
   * @param no_cache 是否不使用缓存（使用缓存可能更新不及时, 但响应更快,默认:false)
   */
  function get_group_info(
    group_id: number,
    no_cache: boolean
  ): Promise<Returnecho>;

  /**
   * 获取群列表
   * @param no_cache 是否不使用缓存（使用缓存可能更新不及时, 但响应更快,默认:false)
   */
  function get_group_list(no_cache: boolean): Promise<Returnecho>;

  /**
   * 获取群成员信息
   * @param group_id 群号
   * @param user_id QQ号
   * @param no_cache 是否不使用缓存（使用缓存可能更新不及时, 但响应更快,默认:false)
   */
  function get_group_member_info(
    group_id: number,
    user_id: number,
    no_cache: boolean
  ): Promise<Returnecho>;

  /**
   * 获取群成员列表
   * @param group_id 群号
   * @param no_cache 是否不使用缓存（使用缓存可能更新不及时, 但响应更快,默认:false)
   */
  function get_group_member_list(
    group_id: number,
    no_cache: boolean
  ): Promise<Returnecho>;

  /**
   * 获取群荣誉信息
   * @param group_id 群号
   * @param type 	要获取的群荣誉类型, 可传入 talkative performer legend strong_newbie emotion 以分别获取单个类型的群荣誉数据, 或传入 all 获取所有数据
   */
  function get_group_honor_info(
    group_id: number,
    type:
      | "talkactive"
      | "performer"
      | "legend"
      | "strong_newbie"
      | "emotion"
      | "all"
  ): Promise<Returnecho>;

  /**
   * 获取群系统消息
   * 应该是没有参数，毕竟go-cq文档没写
   */
  function get_group_system_msg(): Promise<Returnecho>;

  /**
   * 获取精华消息列表
   * @param group_id 群号
   */
  function get_essence_msg_list(group_id: number): Promise<Returnecho>;

  /**
   * 获取群 \@全体成员 剩余次数
   * @param group_id 群号
   */
  function get_group_at_all_remain(group_id: number): Promise<Returnecho>;

  /**
   * 设置群名
   * 该 API 无响应数据
   * @param group_id 群号
   * @param group_name 新群名
   */
  function set_group_name(
    group_id: number,
    group_name: string
  ): Promise<Returnecho>;

  /**
   * 设置群头像
   * @param group_id 群号
   * @param file 图片文件名
   * @param cache 表示是否使用已缓存的文件
   */
  function set_group_portrait(
    group_id: number,
    file: string,
    cache: number
  ): Promise<Returnecho>;

  /**
   * 设置群管理员
   * 该 API 无响应数据
   * @param group_id 群号
   * @param user_id 要设置管理员的 QQ 号
   * @param enable true 为设置, false 为取消
   */
  function set_group_admin(
    group_id: number,
    user_id: number,
    enable: boolean
  ): Promise<Returnecho>;

  /**
   * 设置群名片 ( 群备注 )
   * 该 API 无响应数据
   * @param group_id 群号
   * @param user_id 要设置的 QQ 号
   * @param card 群名片内容, 不填或空字符串表示删除群名片
   */
  function set_group_card(
    group_id: number,
    user_id: number,
    card: string
  ): Promise<Returnecho>;

  /**
   * 设置群组专属头衔
   * 该 API 无响应数据
   * @param group_id 群号
   * @param user_id 要设置的 QQ 号
   * @param special_title 专属头衔, 不填或空字符串表示删除专属头衔
   * @param duration 专属头衔有效期, 单位秒, -1 表示永久, 不过此项似乎没有效果, 可能是只有某些特殊的时间长度有效, 有待测试
   */
  function set_group_special_title(
    group_id: number,
    user_id: number,
    special_title: string,
    duration: number
  ): Promise<Returnecho>;

  /**
   * 群单人禁言
   * 该 API 无响应数据
   * @param group_id 群号
   * @param user_id 要禁言的 QQ 号
   * @param duration 禁言时长, 单位秒, 0 表示取消禁言
   */
  function set_group_ban(
    group_id: number,
    user_id: number,
    duration: number
  ): Promise<Returnecho>;

  /**
   * 群全员禁言
   * 该 API 无响应数据
   * @param group_id 群号
   * @param enable 是否禁言
   */
  function set_group_whole_ban(
    group_id: number,
    enable: boolean
  ): Promise<Returnecho>;

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
  function set_group_anonymous_ban(
    group_id: number,
    duration: number,
    anonymous?: Anonymous,
    flag?: string
  ): Promise<Returnecho>;

  /**
   * 设置精华消息
   * 该 API 没有响应数据
   * @param message_id 消息ID
   */
  function set_essence_msg(message_id: number): Promise<Returnecho>;

  /**
   * 移出精华消息
   * 该 API 没有响应数据
   * @param message_id 消息ID
   */
  function delete_essence_msg(message_id: number): Promise<Returnecho>;

  /**
   * 群打卡
   * 该 API 没有响应数据
   * @param group_id 群号
   */
  function send_group_sign(group_id: number): Promise<Returnecho>;

  /**
   * 群设置匿名
   * 该 API 无响应数据
   * @param group_id 群号
   * @param enable 是否禁言
   */
  function set_group_anonymous(
    group_id: number,
    enable: boolean
  ): Promise<Returnecho>;

  /**
   * 发送群公告
   * 该 API 没有响应数据
   * @param group_id 群号
   * @param content 公告内容
   * @param image 图片路径(可选)
   */
  function _send_group_notice(
    group_id: number,
    content: string,
    image?: string
  ): Promise<Returnecho>;

  /**
   * 获取群公告
   * @param group_id 群号
   */
  function _get_group_notice(group_id: number): Promise<Returnecho>;

  /**
   * 群组踢人
   * 该 API 无响应数据
   * @param group_id 群号
   * @param user_id 要踢的 QQ 号
   * @param reject_add_request 拒绝此人的加群请求
   */
  function set_group_kick(
    group_id: number,
    user_id: number,
    reject_add_request: boolean
  ): Promise<Returnecho>;

  /**
   * 退出群组
   * 该 API 无响应数据
   * @param group_id 群号
   * @param is_dismiss 是否解散, 如果登录号是群主, 则仅在此项为 true 时能够解散
   */
  function set_group_leave(
    group_id: number,
    is_dismiss: boolean
  ): Promise<Returnecho>;
}

interface CQCode {
  type: string;
  data: object;
}

declare class OtherAPI {
  /**
   * [CQ:face]
   * @param id QQ 表情 ID
   * @returns
   */
  static face(id: number, otherCode?: CQCode[]): CQCode[];

  static record(
    file: string,
    url?: string,
    magic?: number,
    cache?: number,
    proxy?: number
  ): CQCode[];

  /**
   * [CQ:at]
   * @param qq at人的QQ号
   * @param otherCode 其他的CQCode，数组形式
   * @returns CQ码，直接在message参数一栏填写即可，不需要转成字符串
   */
  static at(qq: string, otherCode?: CQCode[]): CQCode[];
  /**
   * [CQ:reply]
   * @param id 回复时所引用的消息id, 必须为本群消息
   * @param otherCode 其他的CQCode，数组形式
   * @returns CQ码，直接在message参数一栏填写即可，不需要转成字符串
   */
  static reply(id: number, otherCode: CQCode[]): CQCode[];
}

declare enum LoggerLevels {
  Error = "error",
  Warn = "warn",
  Info = "info",
  Debug = "debug",
}

declare class Logger {
  constructor(logLevel?: LoggerLevels, useColors?: boolean);

  log(message: string): void;

  error(message: string): void;

  warn(message: string): void;

  debug(message: string): void;
}

/** BDS 连接信息 */
interface ConnectMessage {
  /** 客户端 uuid */
  uuid: string;
  /** 客户端连接序号 (从 1 开始 断联后不会进位) */
  connectNum: number;
  /** 客户端 ws */
  WebSocket: NodeJS.EventEmitter;
}

declare namespace bds {
  /**
   * 向所有 BDS 发送数据
   * @param data 数据
   */
  function sendData(data: string): void;

  /** 关闭 WS 服务端 */
  function close(): void;

  /** 所有的 BDS 客户端 */
  function getClients(): Array<ConnectMessage>;

  /** 服务端自身 实际类型为 WebSocketServer */
  function getServer(): NodeJS.EventEmitter;
}
