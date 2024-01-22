export interface Data {
  /** 事件发生的unix时间戳 */
  time: number;
  /** 收到事件的机器人的 QQ 号 */
  self_id: number;
  /** 表示该上报的类型 */
  post_type: string;
}

export interface Anonymous {
  /** 匿名用户 ID */
  id: number;
  /** 匿名用户名称 */
  name: string;
  /** 匿名用户 flag, 在调用禁言 API 时需要传入 */
  flag: string;
}

// message消息
export interface MessageType {
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
export interface Sender {
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

export interface Message extends Data {
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
export interface GroupMessage extends Data {
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
export interface PrivateMessage extends Data {
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

const message = (
  data: Message,
  callback: (Event: string, data: any) => void
) => {
  switch (data.message_type) {
    case "group": {
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
        post_type: data.post_type,
      };
      callback("onReceiveGroupMessage", GroupMessage);
      break;
    }
    case "private": {
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
        post_type: data.post_type,
      };
      callback("onReceivePrivateMessage", PrivateMessage);
      break;
    }
    default:
      break;
  }
};

// notice消息
export interface Notice extends Data {
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

export interface file {
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
export interface PrivateDeleteMsg extends Data {
  /** 好友 QQ 号 */
  user_id: number;
  /** 被撤回的消息 ID */
  message_id: number;
}
/** 群消息撤回 */
export interface GroupDeleteMsg extends Data {
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
export interface GroupMemberAdd extends Data {
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
export interface GroupMemberDecrease extends Data {
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
export interface GroupAdminChange extends Data {
  /** 事件子类型 */
  sub_type: string;
  /** 群号 */
  group_id: number;
  /** 管理员 QQ 号 */
  user_id: number;
}

/** 群文件上传 */
export interface GroupFileUpload extends Data {
  /** 群号 */
  group_id: number;
  /** 发送者 QQ 号 */
  user_id: number;
  /** 文件信息 */
  file: file;
}

/** 群禁言 */
export interface GroupBan extends Data {
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
export interface FrienAdd extends Data {
  /** 新添加好友 QQ 号 */
  user_id: number;
}

/** 戳一戳 */
export interface Notify extends Data {
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
export interface GroupRedbagLuckyKing extends Data {
  /** 群号 */
  group_id: number;
  /** QQ 号 */
  user_id: number;
  /** 运气王 ID */
  target_id: number;
}

/** 群成员荣誉变更提示 */
export interface GroupMemberHonorChange extends Data {
  /** 群号 */
  group_id: number;
  /** 成员 ID */
  user_id: number;
  /** 荣誉类型 */
  honor_type: string;
}

/** 群成员头衔变更 */
export interface GroupMemberTitleChange extends Data {
  /** 群号 */
  group_id: number;
  /** 变更头衔的用户 QQ 号 */
  user_id: number;
  /** 获得的新头衔 */
  title: string;
}

/** 群成员名片更新 */
export interface GroupCardChange extends Data {
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
export interface ReceiveOfflineFile extends Data {
  /** 发送者 ID */
  user_id: number;
  /** 文件数据 */
  file: file;
}

/** 其他客户端在线状态变更 */
export interface ClientStatusChange extends Data {
  /** 客户端信息 */
  client: any;
  /** 当前是否在线 */
  online: boolean;
}

/** 精华消息变更 */
export interface EssenceMessageChange extends Data {
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

export const notice = (
  data: Notice,
  callback: (Events: string, msg: any) => void
) => {
  switch (data.notice_type) {
    case "friend_recall": {
      const PrivateDeleteMsg: PrivateDeleteMsg = {
        user_id: data.user_id,
        message_id: data.message_id,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type,
      };
      callback("onPrivateDeleteMsg", PrivateDeleteMsg);
      break;
    }
    case "group_recall": {
      const GroupDeleteMsg: GroupDeleteMsg = {
        group_id: data.group_id,
        operator_id: data.operator_id,
        user_id: data.user_id,
        message_id: data.message_id,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type,
      };
      callback("onGroupDeleteMsg", GroupDeleteMsg);
      break;
    }
    case "group_increase": {
      const GroupMemberAdd: GroupMemberAdd = {
        sub_type: data.sub_type,
        group_id: data.group_id,
        user_id: data.user_id,
        operator_id: data.operator_id,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type,
      };
      callback("onGroupMemberAdd", GroupMemberAdd);
      break;
    }
    case "group_decrease": {
      const GroupMemberDecrease: GroupMemberDecrease = {
        sub_type: data.sub_type,
        group_id: data.group_id,
        operator_id: data.operator_id,
        user_id: data.user_id,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type,
      };
      callback("onGroupMemberDecrease", GroupMemberDecrease);
      break;
    }
    case "group_admin": {
      const GroupAdminChange: GroupAdminChange = {
        user_id: data.user_id,
        group_id: data.group_id,
        sub_type: data.sub_type,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type,
      };
      callback("onGroupAdminChange", GroupAdminChange);
      break;
    }
    case "group_upload": {
      const GroupFileUpload: GroupFileUpload = {
        group_id: data.group_id,
        file: data.file,
        user_id: data.user_id,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type,
      };
      callback("onGroupFileUpload", GroupFileUpload);
      break;
    }
    case "group_ban": {
      const GroupBan: GroupBan = {
        user_id: data.user_id,
        group_id: data.group_id,
        operator_id: data.operator_id,
        sub_type: data.sub_type,
        duration: data.duration,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type,
      };
      callback("onGroupBan", GroupBan);
      break;
    }
    case "friend_add": {
      const FriendAdd: FrienAdd = {
        user_id: data.user_id,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type,
      };
      callback("onFriendAdd", FriendAdd);
      break;
    }
    case "notify": {
      switch (data.sub_type) {
        case "poke": {
          const Notify: Notify = {
            group_id: data.group_id,
            target_id: data.target_id,
            user_id: data.user_id,
            sender_id: data.sender_id,
            time: data.time,
            self_id: data.self_id,
            post_type: data.post_type,
          };
          callback("onNotify", Notify);
          break;
        }
        case "lucky_king": {
          const GroupRedbagLuckyKing: GroupRedbagLuckyKing = {
            group_id: data.group_id,
            user_id: data.user_id,
            target_id: data.target_id,
            time: data.time,
            self_id: data.self_id,
            post_type: data.post_type,
          };
          callback("onGroupRedbagLuckyKing", GroupRedbagLuckyKing);
          break;
        }
        case "honor": {
          const GroupMemberHonorChange: GroupMemberHonorChange = {
            group_id: data.group_id,
            user_id: data.user_id,
            honor_type: data.honor_type,
            time: data.time,
            self_id: data.self_id,
            post_type: data.post_type,
          };
          callback("onGroupMemberHonorChange", GroupMemberHonorChange);
          break;
        }
        case "title": {
          const GroupMemberTitleChange: GroupMemberTitleChange = {
            group_id: data.group_id,
            user_id: data.user_id,
            title: data.title,
            time: data.time,
            self_id: data.self_id,
            post_type: data.post_type,
          };
          callback("onGroupMemberTitleChange", GroupMemberTitleChange);
          break;
        }
        default:
          break;
      }
      break;
    }
    case "group_card": {
      const GroupCardChange: GroupCardChange = {
        group_id: data.group_id,
        user_id: data.user_id,
        card_new: data.card_new,
        card_old: data.card_old,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type,
      };
      callback("onGroupCardChange", GroupCardChange);
      break;
    }
    case "offline_file": {
      const ReceiveOfflineFile: ReceiveOfflineFile = {
        user_id: data.user_id,
        file: data.file,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type,
      };
      callback("onReceiveOfflineFile", ReceiveOfflineFile);
      break;
    }
    case "client_status": {
      const ClientStatusChange: ClientStatusChange = {
        client: data.client,
        online: data.online,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type,
      };
      callback("onClientStatusChange", ClientStatusChange);
      break;
    }
    case "essencs": {
      const EssenceMessageChange: EssenceMessageChange = {
        sender_id: data.sender_id,
        group_id: data.group_id,
        sub_type: data.sub_type,
        operator_id: data.operator_id,
        message_id: data.message_id,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type,
      };
      callback("onEssenceMessageChange", EssenceMessageChange);
      break;
    }
    default:
      break;
  }
};
// request消息
export interface Request extends Data {
  request_type: string;
  /** QQ 号 */
  user_id: number;
  comment: string;
  flag: string;
  sub_type: string;
  /** 群号 */ group_id: number;
}

/** 加好友请求 */
export interface AddFriendRequest extends Data {
  /** 发送请求的 QQ 号 */
  user_id: number;
  /** 验证信息 */
  comment: string;
  /** 请求 flag, 在调用处理请求的 API 时需要传入 */
  flag: string;
}

/** 加群请求／邀请 */
export interface AddGroupRequest extends Data {
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

const request = (
  data: Request,
  callback: (Events: string, msg: any) => void
) => {
  switch (data.request_type) {
    case "friend": {
      const AddFriendRequest: AddFriendRequest = {
        user_id: data.user_id,
        comment: data.comment,
        flag: data.flag,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type,
      };
      callback("onAddFriendRequest", AddFriendRequest);
      break;
    }
    case "group": {
      const AddGroupRequest: AddGroupRequest = {
        group_id: data.group_id,
        user_id: data.user_id,
        comment: data.comment,
        flag: data.flag,
        sub_type: data.sub_type,
        time: data.time,
        self_id: data.self_id,
        post_type: data.post_type,
      };
      callback("onAddGroupRequest", AddGroupRequest);
      break;
    }
    default:
      break;
  }
};

// meta_event
export interface MetaEvent extends Data {
  meta_event_type: string;
  status: Status;
  interval: number;
  sub_type: string;
}

export interface Status {
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
export interface HeartBeat {
  /** 应用程序状态 */
  status: Status;
  /** 距离上一次心跳包的时间(单位是毫秒) */
  interval: number;
}

/** 生命周期 */
export interface LifeCycle {
  /** 子类型 */
  sub_type: string;
}

const metaevent = (
  data: MetaEvent,
  callback: (Events: string, msg: any) => void
) => {
  switch (data.meta_event_type) {
    case "heartbeat": {
      const HeartBeat: HeartBeat = {
        status: data.status,
        interval: data.interval,
      };
      callback("onHeartBeat", HeartBeat);
      break;
    }
    case "lifecycle": {
      const LifeCycle: LifeCycle = {
        sub_type: data.sub_type,
      };
      callback("onLifeCycle", LifeCycle);
      break;
    }
    default:
      break;
  }
};

// echo
export interface Returnecho {
  status: string;
  retcode: number;
  uuid: string;
}

export default (msg: any, callback: (Events: string, data: any) => void) => {
  if (msg.post_type) {
    switch (msg.post_type) {
      case "message": {
        message(msg, callback);
        break;
      }
      case "notice": {
        notice(msg, callback);
        break;
      }
      case "request": {
        request(msg, callback);

        break;
      }
      case "meta_event": {
        metaevent(msg, callback);
        break;
      }
      default:
        break;
    }
  } else if (msg.echo) {
    callback("echo", {
      uuid: msg.echo,
      data: msg.data,
    });
  }
};
