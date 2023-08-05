import { off } from "process"

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
    content?: string | MessageType,
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
  online:boolean
}

export interface File{
  id:string,
  name: string,
  size: number,
  url: string,
  busi:number
}

export interface PrivateDeleteMsg{
  user_id:number
  message_id:number
}

export interface GroupDeleteMsg {
  group_id: number,
  operator_id:number
  user_id: number
  message_id: number
}

export interface GroupMenberAdd {
  sub_type:string
  user_id:number
  group_id: number,
  operator_id: number,
}

export interface GroupMenberDecrease {
  sub_type:string
  group_id: number,
  operator_id: number,
  user_id:number
}

export interface GroupAdminChange{
  sub_type: string,
  group_id: number,
  user_id:number
}

export interface GroupFileUpload{
  group_id: number,
  user_id: number,
  file:File
}
export interface GroupBan{
  sub_type: string,
  group_id: number,
  operator_id: number,
  user_id: number,
  duration:number
}

export interface FrienAdd{
  user_id:number
}

export interface Notify{
  sub_type: string,
  sender_id: number,
  user_id: number,
  target_id: number
  group_id:number
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
        message_id:data.message_id,
      }
      callback("onGroupDeleteMsg", GroupDeleteMsg)
      break
    case "group_increase":
      const GroupMenberAdd: GroupMenberAdd = {
        sub_type:data.sub_type,
        group_id: data.group_id,
        user_id: data.user_id,
        operator_id: data.operator_id
      }
      callback("onGroupMenberAdd", GroupMenberAdd)
      break
    case "group_decrease":
      const GroupMenberDecrease: GroupMenberDecrease = {
        sub_type: data.sub_type,
        group_id: data.group_id,
        operator_id: data.operator_id,
        user_id: data.user_id
      }
      callback("onGroupMenberDecrease", GroupMenberDecrease)
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
      const Notify: Notify = {
        sub_type: data.sub_type,
        group_id: data.group_id,
        target_id: data.target_id,
        user_id: data.user_id,
        sender_id: data.sender_id
      }
      callback("onNotify", Notify)
      break;
  }
}
// request消息

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
    }
  } else if (msg.echo) {
    callback('echo', {
      uuid: msg.echo,
      data: msg.data
    });
  }
}
