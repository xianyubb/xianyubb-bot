interface Data {
  /** 事件发生的unix时间戳 */
  time: number;
  /** 收到事件的机器人的 QQ 号 */
  self_id: number;
  /** 表示该上报的类型, 消息, 消息发送, 请求, 通知, 或元事件 */
  post_type: string
}

interface Anonymous {
  id: number;
  name: string;
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
  user_id: number;
  nickname: string;
  sex?: string;
  age?: number;
  group_id?: number;
  card?: string;
  area?: string;
  level?: string;
  role?: string;
  title?: string;
}

interface Message extends Data {
  group_id: number;
  message_type: "private" | "group";
  sub_type: string;
  message_id: number;
  user_id: number;
  message: string | MessageType[];
  raw_message: string;
  font: number;
  sender: Sender;
  target_id: number;
  anonymous: null | Anonymous;
}

interface GroupMessage extends Data {
  sub_type: string;
  message_id: number;
  user_id: number;
  message: string | MessageType[];
  raw_message: string;
  font: number;
  sender: Sender;
  target_id: number;
  /** 群号 */
  group_id: number;
  anonymous: null | Anonymous;
}

interface PrivateMessage {
  sub_type: string;
  message_id: number;
  user_id: number;
  message: string | MessageType[];
  raw_message: string;
  font: number;
  sender: Sender;
  target_id: number;
}

// notice消息
interface Notice extends Data {
  notice_type: string;
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
  id: string,
  name: string,
  size: number,
  url: string,
  busi: number
}

interface PrivateDeleteMsg {
  user_id: number;
  message_id: number;
}

interface GroupDeleteMsg {
  group_id: number;
  operator_id: number;
  user_id: number;
  message_id: number;
}

interface GroupMemberAdd {
  sub_type: string;
  user_id: number;
  group_id: number;
  operator_id: number;
}

interface GroupMemberDecrease {
  sub_type: string;
  group_id: number;
  operator_id: number;
  user_id: number;
}

interface GroupAdminChange {
  sub_type: string;
  group_id: number;
  user_id: number;
}

interface GroupfileUpload {
  group_id: number;
  user_id: number;
  file: file;
}
interface GroupBan {
  sub_type: string;
  group_id: number;
  operator_id: number;
  user_id: number;
  duration: number;
}

interface FrienAdd {
  user_id: number;
}

interface Notify {
  sender_id: number;
  user_id: number;
  target_id: number;
  group_id: number;
}

interface GroupRedbagLuckyKing {
  group_id: number;
  user_id: number;
  target_id: number;
}

interface GroupMemberHonorChange {
  group_id: number;
  user_id: number;
  honor_type: string;
}

interface GroupMemberTitleChange {
  group_id: number;
  user_id: number;
  title: string;
}

interface GroupCardChange {
  group_id: number;
  user_id: number;
  card_new: string;
  card_old: string;
}

interface ReceiveOfflinefile {
  user_id: number;
  file: file;
}

interface ClientStatusChange {
  client: any;
  online: boolean;
}

interface EssenceMessageChange {
  sub_type: string;
  group_id: number;
  sender_id: number;
  operator_id: number;
  message_id: number;
}

// request消息
interface Request extends Data {
  request_type: string;
  user_id: number;
  comment: string;
  flag: string;
  sub_type: string;
  group_id: number;
}

interface AddFriendRequest {
  user_id: number;
  comment: string;
  flag: string;
}

interface AddGroupRequest {
  user_id: number;
  group_id: number;
  comment: string;
  sub_type: string;
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
  app_initialized: boolean;
  app_enabled: boolean;
  plugins_good: boolean;
  app_good: boolean;
  online: boolean;
  stat: boolean;
}

interface HeartBeat {
  status: Status;
  interval: number;
}

interface LifeCycle {
  sub_type: string;
}

// echo
interface Returnecho {
  status: string;
  retcode: number;
  data: any;
  uuid: string;
}

declare namespace bot {
  namespace BotEvents {
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
      listener: (msg: GroupfileUpload) => void
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
      listener: (msg: ReceiveOfflinefile) => void
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
  function get_login_info(): Promise<Returnecho>
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
  ): Promise<Returnecho>
}
