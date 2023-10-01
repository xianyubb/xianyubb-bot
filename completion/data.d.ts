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


// echo 
export interface Returnecho {
  status: string,
  retcode: number,
  data: any,
  uuid: string
}
