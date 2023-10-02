export interface Data {
  /** 事件发生的unix时间戳 */
  time: number;
  /** 收到事件的机器人的 QQ 号 */
  self_id: number;
  /** 表示该上报的类型, 消息, 消息发送, 请求, 通知, 或元事件 */
  post_type: string
}

export interface Anonymous {
  id: number,
  name: string,
  flag: string
}

// message消息
export interface MessageType {
  type: string,
  data: {
    text?: string,
    id?: number | string,
    file?: string,
    at?: number,
    url?: string,
    title?: string,
    content?: string,
    image?: string,
    type?: "qq" | "group",
    lat?: string | number,
    lon?: string | number,
    audio?: string,
    qq?: number,
    time?: number,
    uin?: number,
    seq?: MessageType
  }
}
export interface Sender {
  user_id: number,
  nickname: string,
  sex?: string,
  age?: number,
  group_id?: number,
  card?: string,
  area?: string,
  level?: string,
  role?: string,
  title?: string
}

export interface Message extends Data {
  group_id: number
  message_type: "private" | "group"
  sub_type: string,
  message_id: number,
  user_id: number,
  message: string | MessageType[],
  raw_message: string,
  font: number,
  sender: Sender,
  target_id: number,
  anonymous: (null | Anonymous),
  temp_source: number
}

export interface GroupMessage extends Data {
  /** 消息子类型, 正常消息是 normal, 匿名消息是 anonymous, 系统提示 ( 如「管理员已禁止群内匿名聊天」 ) 是 notice */
  sub_type: string,
  /** 消息 ID */
  message_id: number,
  /** 发送者 QQ 号 */
  user_id: number,
  /** 消息内容 */
  message: string | MessageType[],
  /** 原始消息内容 */
  raw_message: string,
  /** 字体 */
  font: number,
  /** 发送者信息 */
  sender: Sender,
  /** 群号 */
  group_id: number,
  /** 匿名信息, 如果不是匿名消息则为 null */
  anonymous: (null | Anonymous)
}

export interface PrivateMessage extends Data {
  /** 消息子类型, 如果是好友则是 friend, 如果是群临时会话则是 group, 如果是在群中自身发送则是 group_self */
  sub_type: string,
  /** 消息 ID */
  message_id: number,
  /** 发送者 QQ 号 */
  user_id: number,
  /** 消息内容 */
  message: string | MessageType[],
  /** 原始消息内容  */
  raw_message: string,
  /** 字体 */
  font: number,
  /** 发送者信息 */
  sender: Sender,
  /** 接受者 QQ 号 */
  target_id: number,
  /** 临时会话来源 */
  temp_source: number
}

const message = (data: Message, callback: (Event: string, data: any) => void) => {
  switch (data.message_type) {
    case "group":
      const GroupMessage: GroupMessage = {
        message_id: data.message_id,
        sub_type: data.sub_type,
        font: data.font,
        user_id: data.user_id,
        message: data.message,
        group_id: data.group_id,
        raw_message: data.raw_message,
        sender: data.sender,
        anonymous: data.anonymous,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type
      }
      callback("onReceiveGroupMessage", GroupMessage)
      break;
    case "private":
      const PrivateMessage: PrivateMessage = {
        user_id: data.user_id,
        sub_type: data.sub_type,
        message_id: data.message_id,
        message: data.message,
        raw_message: data.raw_message,
        font: data.font,
        sender: data.sender,
        target_id: data.target_id,
        temp_source: data.temp_source,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type
      }
      callback("onReceivePrivateMessage", PrivateMessage)
      break;
  }
}

// notice消息
export interface Notice extends Data {
  notice_type: string,
  user_id: number,
  group_id: number,
  sub_type: string,
  operator_id: number,
  message_id: number,
  file: file,
  duration: number,
  sender_id: number,
  target_id: number,
  honor_type: "talkative" | "performer" | "emotion",
  title: string
  card_new: string,
  card_old: string,
  client: any,
  online: boolean
}

export interface file {
  id: string,
  name: string,
  size: number,
  url: string,
  busi: number
}

export interface PrivateDeleteMsg extends Data {
  user_id: number
  message_id: number
}

export interface GroupDeleteMsg extends Data {
  group_id: number,
  operator_id: number
  user_id: number
  message_id: number
}

export interface GroupMemberAdd extends Data {
  sub_type: string
  user_id: number
  group_id: number,
  operator_id: number,
}

export interface GroupMemberDecrease extends Data {
  sub_type: string
  group_id: number,
  operator_id: number,
  user_id: number
}

export interface GroupAdminChange extends Data {
  sub_type: string,
  group_id: number,
  user_id: number
}

export interface GroupFileUpload extends Data {
  group_id: number,
  user_id: number,
  file: file
}
export interface GroupBan extends Data {
  sub_type: string,
  group_id: number,
  operator_id: number,
  user_id: number,
  duration: number
}

export interface FrienAdd extends Data {
  user_id: number
}

export interface Notify extends Data {
  sender_id: number,
  user_id: number,
  target_id: number
  group_id: number
}

export interface GroupRedbagLuckyKing extends Data {
  group_id: number,
  user_id: number,
  target_id: number
}

export interface GroupMemberHonorChange extends Data {
  group_id: number,
  user_id: number,
  honor_type: string
}

export interface GroupMemberTitleChange extends Data {
  group_id: number,
  user_id: number,
  title: string
}

export interface GroupCardChange extends Data {
  group_id: number,
  user_id: number,
  card_new: string,
  card_old: string,
}

export interface ReceiveOfflineFile extends Data {
  user_id: number,
  file: file
}

export interface ClientStatusChange extends Data {
  client: any,
  online: boolean
}

export interface EssenceMessageChange extends Data {
  sub_type: string,
  group_id: number,
  sender_id: number,
  operator_id: number,
  message_id: number
}


export const notice = (data: Notice, callback: (Events: string, msg: any) => void) => {
  switch (data.notice_type) {
    case "friend_recall":
      const PrivateDeleteMsg: PrivateDeleteMsg = {
        user_id: data.user_id,
        message_id: data.message_id,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type
      }
      callback("onPrivateDeleteMsg", PrivateDeleteMsg)
      break;
    case "group_recall":
      const GroupDeleteMsg: GroupDeleteMsg = {
        group_id: data.group_id,
        operator_id: data.operator_id,
        user_id: data.user_id,
        message_id: data.message_id,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type
      }
      callback("onGroupDeleteMsg", GroupDeleteMsg)
      break
    case "group_increase":
      const GroupMemberAdd: GroupMemberAdd = {
        sub_type: data.sub_type,
        group_id: data.group_id,
        user_id: data.user_id,
        operator_id: data.operator_id,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type
      }
      callback("onGroupMemberAdd", GroupMemberAdd)
      break
    case "group_decrease":
      const GroupMemberDecrease: GroupMemberDecrease = {
        sub_type: data.sub_type,
        group_id: data.group_id,
        operator_id: data.operator_id,
        user_id: data.user_id,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type
      }
      callback("onGroupMemberDecrease", GroupMemberDecrease)
      break;
    case "group_admin":
      const GroupAdminChange: GroupAdminChange = {
        user_id: data.user_id,
        group_id: data.group_id,
        sub_type: data.sub_type,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type
      }
      callback("onGroupAdminChange", GroupAdminChange)
      break;
    case "group_upload":
      const GroupFileUpload: GroupFileUpload = {
        group_id: data.group_id,
        file: data.file,
        user_id: data.user_id,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type
      }
      callback("onGroupFileUpload", GroupFileUpload)
      break;
    case "group_ban":
      const GroupBan: GroupBan = {
        user_id: data.user_id,
        group_id: data.group_id,
        operator_id: data.operator_id,
        sub_type: data.sub_type,
        duration: data.duration,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type
      }
      callback("onGroupBan", GroupBan)
      break;
    case "friend_add":
      const FriendAdd: FrienAdd = {
        user_id: data.user_id,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type
      }
      callback("onFriendAdd", FriendAdd)
      break
    case "notify":
      switch (data.sub_type) {
        case "poke":
          const Notify: Notify = {
            group_id: data.group_id,
            target_id: data.target_id,
            user_id: data.user_id,
            sender_id: data.sender_id,
            time: data.time,
            self_id: data.self_id,
            post_type: data.post_type
          }
          callback("onNotify", Notify)
          break;
        case "lucky_king":
          const GroupRedbagLuckyKing: GroupRedbagLuckyKing = {
            group_id: data.group_id,
            user_id: data.user_id,
            target_id: data.target_id,
            time: data.time,
            self_id: data.self_id,
            post_type: data.post_type
          }
          callback("onGroupRedbagLuckyKing", GroupRedbagLuckyKing)
          break
        case "honor":
          const GroupMemberHonorChange: GroupMemberHonorChange = {
            group_id: data.group_id,
            user_id: data.user_id,
            honor_type: data.honor_type,
            time: data.time,
            self_id: data.self_id,
            post_type: data.post_type
          }
          callback("onGroupMemberHonorChange", GroupMemberHonorChange)
          break;
        case "title":
          const GroupMemberTitleChange: GroupMemberTitleChange = {
            group_id: data.group_id,
            user_id: data.user_id,
            title: data.title,
            time: data.time,
            self_id: data.self_id,
            post_type: data.post_type
          }
          callback("onGroupMemberTitleChange", GroupMemberTitleChange)
          break
      }
      break
    case "group_card":
      const GroupCardChange: GroupCardChange = {
        group_id: data.group_id,
        user_id: data.user_id,
        card_new: data.card_new,
        card_old: data.card_old,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type
      }
      callback("onGroupCardChange", GroupCardChange)
      break;
    case "offline_file":
      const ReceiveOfflineFile: ReceiveOfflineFile = {
        user_id: data.user_id,
        file: data.file,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type
      }
      callback("onReceiveOfflineFile", ReceiveOfflineFile)
      break;
    case "client_status":
      const ClientStatusChange: ClientStatusChange = {
        client: data.client,
        online: data.online,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type
      }
      callback("onClientStatusChange", ClientStatusChange)
      break;
    case "essencs":
      const EssenceMessageChange: EssenceMessageChange = {
        sender_id: data.sender_id,
        group_id: data.group_id,
        sub_type: data.sub_type,
        operator_id: data.operator_id,
        message_id: data.message_id,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type
      }
      callback("onEssenceMessageChange", EssenceMessageChange)
      break
  }
}
// request消息
export interface Request extends Data {
  request_type: string,
  user_id: number,
  comment: string,
  flag: string,
  sub_type: string,
  group_id: number,
}

export interface AddFriendRequest extends Data {
  user_id: number,
  comment: string,
  flag: string
}

export interface AddGroupRequest extends Data {
  user_id: number,
  group_id: number,
  comment: string,
  sub_type: string,
  flag: string
}

const request = (data: Request, callback: (Events: string, msg: any) => void) => {
  switch (data.request_type) {
    case "friend":
      const AddFriendRequest: AddFriendRequest = {
        user_id: data.user_id,
        comment: data.comment,
        flag: data.flag,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type
      }
      callback("onAddFriendRequest", AddFriendRequest)
      break;
    case "group":
      const AddGroupRequest: AddGroupRequest = {
        group_id: data.group_id,
        user_id: data.user_id,
        comment: data.comment,
        flag: data.flag,
        sub_type: data.sub_type,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type
      }
      callback("onAddGroupRequest", AddGroupRequest)
      break
  }
}

// meta_event
export interface MetaEvent extends Data {
  meta_event_type: string,
  status: Status,
  interval: number,
  sub_type: string
}

export interface Status {
  app_initialized: boolean,
  app_enabled: boolean,
  plugins_good: boolean,
  app_good: boolean,
  online: boolean,
  stat: boolean
}

export interface HeartBeat {
  status: Status,
  interval: number
}

export interface LifeCycle {
  sub_type: string
}

const metaevent = (data: MetaEvent, callback: (Events: string, msg: any) => void) => {
  switch (data.meta_event_type) {
    case "heartbeat":
      const HeartBeat: HeartBeat = {
        status: data.status,
        interval: data.interval
      }
      callback("onHeartBeat", HeartBeat)
      break
    case "lifecycle":
      const LifeCycle: LifeCycle = {
        sub_type: data.sub_type
      }
      callback("onLifeCycle", LifeCycle)
      break
  }
}

// echo 
export interface Returnecho {
  status: string,
  retcode: number,
  data: any,
  uuid: string
}

export default (msg: any, callback: (Events: string, data: any) => void) => {
  if (msg.post_type) {
    switch (msg.post_type) {
      case "message":
        message(msg, callback)
        break;
      case "notice":
        notice(msg, callback)
        break
      case "request":
        request(msg, callback)
        break;
      case "meta_event":
        metaevent(msg, callback)
        break
    }
  } else if (msg.echo) {
    callback('echo', {
      uuid: msg.echo,
      data: msg.data
    });
  }
}
