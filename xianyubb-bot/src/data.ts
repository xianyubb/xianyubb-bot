export interface Data {
  time: number,
  self_id: number,
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
  anonymous: (null | Anonymous)
}

export interface GroupMessage {
  sub_type: string,
  message_id: number,
  user_id: number,
  message: string | MessageType[],
  raw_message: string,
  font: number,
  sender: Sender,
  target_id: number,
  group_id: number,
  anonymous: (null | Anonymous)
}

export interface PrivateMessage {
  sub_type: string,
  message_id: number,
  user_id: number,
  message: string | MessageType[],
  raw_message: string,
  font: number,
  sender: Sender,
  target_id: number,
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
        target_id: data.target_id,
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
        target_id: data.target_id
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
  file: File,
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

export interface File {
  id: string,
  name: string,
  size: number,
  url: string,
  busi: number
}

export interface PrivateDeleteMsg {
  user_id: number
  message_id: number
}

export interface GroupDeleteMsg {
  group_id: number,
  operator_id: number
  user_id: number
  message_id: number
}

export interface GroupMemberAdd {
  sub_type: string
  user_id: number
  group_id: number,
  operator_id: number,
}

export interface GroupMemberDecrease {
  sub_type: string
  group_id: number,
  operator_id: number,
  user_id: number
}

export interface GroupAdminChange {
  sub_type: string,
  group_id: number,
  user_id: number
}

export interface GroupFileUpload {
  group_id: number,
  user_id: number,
  file: File
}
export interface GroupBan {
  sub_type: string,
  group_id: number,
  operator_id: number,
  user_id: number,
  duration: number
}

export interface FrienAdd {
  user_id: number
}

export interface Notify {
  sender_id: number,
  user_id: number,
  target_id: number
  group_id: number
}

export interface GroupRedbagLuckyKing {
  group_id: number,
  user_id: number,
  target_id: number
}

export interface GroupMemberHonorChange {
  group_id: number,
  user_id: number,
  honor_type: string
}

export interface GroupMemberTitleChange {
  group_id: number,
  user_id: number,
  title: string
}

export interface GroupCardChange {
  group_id: number,
  user_id: number,
  card_new: string,
  card_old: string,
}

export interface ReceiveOfflineFile {
  user_id: number,
  file: File
}

export interface ClientStatusChange {
  client: any,
  online: boolean
}

export interface EssenceMessageChange {
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
        message_id: data.message_id
      }
      callback("onPrivateDeleteMsg", PrivateDeleteMsg)
      break;
    case "group_recall":
      const GroupDeleteMsg: GroupDeleteMsg = {
        group_id: data.group_id,
        operator_id: data.operator_id,
        user_id: data.user_id,
        message_id: data.message_id,
      }
      callback("onGroupDeleteMsg", GroupDeleteMsg)
      break
    case "group_increase":
      const GroupMemberAdd: GroupMemberAdd = {
        sub_type: data.sub_type,
        group_id: data.group_id,
        user_id: data.user_id,
        operator_id: data.operator_id
      }
      callback("onGroupMemberAdd", GroupMemberAdd)
      break
    case "group_decrease":
      const GroupMemberDecrease: GroupMemberDecrease = {
        sub_type: data.sub_type,
        group_id: data.group_id,
        operator_id: data.operator_id,
        user_id: data.user_id
      }
      callback("onGroupMemberDecrease", GroupMemberDecrease)
      break;
    case "group_admin":
      const GroupAdminChange: GroupAdminChange = {
        user_id: data.user_id,
        group_id: data.group_id,
        sub_type: data.sub_type
      }
      callback("onGroupAdminChange", GroupAdminChange)
      break;
    case "group_upload":
      const GroupFileUpload: GroupFileUpload = {
        group_id: data.group_id,
        file: data.file,
        user_id: data.user_id
      }
      callback("onGroupFileUpload", GroupFileUpload)
      break;
    case "group_ban":
      const GroupBan: GroupBan = {
        user_id: data.user_id,
        group_id: data.group_id,
        operator_id: data.operator_id,
        sub_type: data.sub_type,
        duration: data.duration
      }
      callback("onGroupBan", GroupBan)
      break;
    case "friend_add":
      const FriendAdd: FrienAdd = {
        user_id: data.user_id,
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
            sender_id: data.sender_id
          }
          callback("onNotify", Notify)
          break;
        case "lucky_king":
          const GroupRedbagLuckyKing: GroupRedbagLuckyKing = {
            group_id: data.group_id,
            user_id: data.user_id,
            target_id: data.target_id
          }
          callback("onGroupRedbagLuckyKing", GroupRedbagLuckyKing)
          break
        case "honor":
          const GroupMemberHonorChange: GroupMemberHonorChange = {
            group_id: data.group_id,
            user_id: data.user_id,
            honor_type: data.honor_type
          }
          callback("onGroupMemberHonorChange", GroupMemberHonorChange)
          break;
        case "title":
          const GroupMemberTitleChange: GroupMemberTitleChange = {
            group_id: data.group_id,
            user_id: data.user_id,
            title: data.title
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
        card_old: data.card_old
      }
      callback("onGroupCardChange", GroupCardChange)
      break;
    case "offline_file":
      const ReceiveOfflineFile: ReceiveOfflineFile = {
        user_id: data.user_id,
        file: data.file
      }
      callback("onReceiveOfflineFile", ReceiveOfflineFile)
      break;
    case "client_status":
      const ClientStatusChange: ClientStatusChange = {
        client: data.client,
        online: data.online,
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

export interface AddFriendRequest {
  user_id: number,
  comment: string,
  flag: string
}

export interface AddGroupRequest {
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
        flag: data.flag
      }
      callback("onAddFriendRequest", AddFriendRequest)
      break;
    case "group":
      const AddGroupRequest: AddGroupRequest = {
        group_id: data.group_id,
        user_id: data.user_id,
        comment: data.comment,
        flag: data.flag,
        sub_type: data.sub_type
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
