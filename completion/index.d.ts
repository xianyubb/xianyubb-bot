import * as data from "./data";

declare namespace bot {
  namespace BotEvents {
    /** 收到群聊消息 */
    function on(
      event: "onReceiveGroupMessage",
      listener: (msg: data.GroupMessage) => void
    ): any;
    /** 收到私聊消息 */
    function on(
      event: "onReceivePrivateMessage",
      listener: (msg: data.PrivateMessage) => void
    ): any;
    /** 私聊消息撤回 */
    function on(
      Event: "onPrivateDeleteMsg",
      listener: (msg: data.PrivateDeleteMsg) => void
    ): any;
    /** 群聊消息撤回 */
    function on(
      Event: "onGroupDeteleMsg",
      listener: (msg: data.GroupDeleteMsg) => void
    ): any;
    /** 群聊成员增加 */
    function on(
      Event: "onGroupMemberAdd",
      listener: (msg: data.GroupMemberAdd) => void
    ): any;
    /** 群聊成员减少 */
    function on(
      Event: "onGroupMemberDecrease",
      listener: (msg: data.GroupMemberDecrease) => void
    ): any;
    /** 群聊管理员变动 */
    function on(
      Event: "onGroupAdminChange",
      listener: (msg: data.GroupAdminChange) => void
    ): any;
    /** 群聊文件上传 */
    function on(
      Event: "onGroupFileUpload",
      listener: (msg: data.GroupFileUpload) => void
    ): any;
    /** 群聊禁言 */
    function on(
      Event: "onGroupBan",
      listener: (msg: data.GroupBan) => void
    ): any;
    /** 好友添加 */
    function on(
      Event: "onFriendAdd",
      listener: (msg: data.FrienAdd) => void
    ): any;
    /** 戳一戳
     * 此事件无法在手表协议上触发
     */
    function on(Event: "onNotify", listener: (msg: data.Notify) => void): any;
    /** 群聊红包运气王提示
     * 此事件无法在手表协议上触发
     */
    function on(
      Event: "onGroupRedbagLuckyKing",
      listener: (msg: data.GroupRedbagLuckyKing) => void
    ): any;
    /** 群聊成员荣誉变更提示
     * 此事件无法在手表协议上触发
     */
    function on(
      Event: "onGroupMemberHonorChange",
      listener: (msg: data.GroupMemberHonorChange) => void
    ): any;
    /** 群聊成员头衔变更 */
    function on(
      Event: "onGroupMemberTitleChange",
      listener: (msg: data.GroupMemberTitleChange) => void
    ): any;
    /** 群聊成员名片更新
     * 此事件不保证时效性, 仅在收到消息时校验卡片
     */
    function on(
      Event: "onGroupCardChange",
      listener: (msg: data.GroupCardChange) => void
    ): any;
    /** 接收到离线文件 */
    function on(
      Event: "onReceiveOfflineFile",
      listener: (msg: data.ReceiveOfflineFile) => void
    ): any;
    /** 其他客户端在线状态变更 */
    function on(
      Event: "onClientStatusChange",
      listener: (msg: data.ClientStatusChange) => void
    ): any;
    /** 精华消息变更 */
    function on(
      Event: "onEssenceMessageChange",
      listener: (msg: data.EssenceMessageChange) => void
    ): any;
    /** 加好友请求 */
    function on(
      Event: "onAddFriendRequest",
      listener: (msg: data.AddFriendRequest) => void
    ): any;
    /** 加群聊/邀请 */
    function on(
      Event: "onAddGroupRequest",
      listener: (msg: data.AddGroupRequest) => void
    ): any;
    /** 心跳包 */
    function on(
      Event: "onHeartBeat",
      listener: (msg: data.HeartBeat) => void
    ): any;
    /** 生命周期 */
    function on(
      Event: "onLifeCycle",
      listener: (msg: data.LifeCycle) => void
    ): any;
  }
  /** 获取登录号信息 */
  function get_login_info(): Promise<any>;
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
  ):Promise<any>

}
