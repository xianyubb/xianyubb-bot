import { EventEmitter } from "events";
import * as data from "./data";

export interface WebSocketEvent extends EventEmitter {
  on(event: "message", listener: (msg: data.Data) => void): any;
  on(event: "connect", listener: () => void): any;

  emit(event: "message", msg: data.Data): any;
  emit(event: "connect"): any;

  addListener(event: "message", listener: (msg: data.Data) => void): any;
  addListener(event: "connect", listener: () => void): any;

  removeAllListeners(event: "message"): any;
  removeAllListeners(event: "connect"): any;

  once(event: "message", listener: (msg: data.Data) => void): any;
  once(event: "connect", listener: () => void): any;
}

export interface BotEvent extends EventEmitter {
  emit(Event: "onReceiveGroupMessage", msg: data.GroupMessage): any;
  emit(Event: "onReceivePrivateMessage", msg: data.PrivateMessage): any;
  emit(Event: "onPrivateDeleteMsg", msg: data.PrivateDeleteMsg): any;
  emit(Event: "onGroupDeteleMsg", msg: data.GroupDeleteMsg): any;
  emit(Event: "onGroupMemberAdd", msg: data.GroupMemberAdd): any;
  emit(Event: "onGroupMemberDecrease", msg: data.GroupMemberDecrease): any;
  emit(Event: "onGroupAdminChange", msg: data.GroupAdminChange): any;
  emit(Event: "onGroupFileUpload", msg: data.GroupFileUpload): any;
  emit(Event: "onGroupBan", msg: data.GroupBan): any;
  emit(Event: "onFriendAdd", msg: data.FrienAdd): any;
  emit(Event: "onNotify", msg: data.Notify): any;
  emit(Event: "onGroupRedbagLuckyKing", msg: data.GroupRedbagLuckyKing): any;
  emit(
    Event: "onGroupMemberHonorChange",
    msg: data.GroupMemberHonorChange
  ): any;
  emit(
    Event: "onGroupMemberTitleChange",
    msg: data.GroupMemberTitleChange
  ): any;
  emit(Event: "onGroupCardChange", msg: data.GroupCardChange): any;
  emit(Event: "onReceiveOfflineFile", msg: data.ReceiveOfflineFile): any;
  emit(Event: "onClientStatusChange", msg: data.ClientStatusChange): any;
  emit(Event: "onEssenceMessageChange", msg: data.EssenceMessageChange): any;
  emit(Event: "onAddFriendRequest", msg: data.AddFriendRequest): any;
  emit(Event: "onAddGroupRequest", msg: data.AddGroupRequest): any;
  emit(Event: "onHeartBeat", msg: data.HeartBeat): any;
  emit(Event: "onLifeCycle", msg: data.LifeCycle): any;
  emit(Event: "echo", msg: data.Returnecho): any;

  on(
    Event: "onReceiveGroupMessage",
    listener: (msg: data.GroupMessage) => void
  ): any;
  on(
    Event: "onReceivePrivateMessage",
    listener: (msg: data.PrivateMessage) => void
  ): any;
  on(
    Event: "onPrivateDeleteMsg",
    listener: (msg: data.PrivateDeleteMsg) => void
  ): any;
  on(
    Event: "onGroupDeteleMsg",
    listener: (msg: data.GroupDeleteMsg) => void
  ): any;
  on(
    Event: "onGroupMemberAdd",
    listener: (msg: data.GroupMemberAdd) => void
  ): any;
  on(
    Event: "onGroupMemberDecrease",
    listener: (msg: data.GroupMemberDecrease) => void
  ): any;
  on(
    Event: "onGroupAdminChange",
    listener: (msg: data.GroupAdminChange) => void
  ): any;
  on(
    Event: "onGroupFileUpload",
    listener: (msg: data.GroupFileUpload) => void
  ): any;
  on(Event: "onGroupBan", listener: (msg: data.GroupBan) => void): any;
  on(Event: "onFriendAdd", listener: (msg: data.FrienAdd) => void): any;
  on(Event: "onNotify", listener: (msg: data.Notify) => void): any;
  on(
    Event: "onGroupRedbagLuckyKing",
    listener: (msg: data.GroupRedbagLuckyKing) => void
  ): any;
  on(
    Event: "onGroupMemberHonorChange",
    listener: (msg: data.GroupMemberHonorChange) => void
  ): any;
  on(
    Event: "onGroupMemberTitleChange",
    listener: (msg: data.GroupMemberTitleChange) => void
  ): any;
  on(
    Event: "onGroupCardChange",
    listener: (msg: data.GroupCardChange) => void
  ): any;
  on(
    Event: "onReceiveOfflineFile",
    listener: (msg: data.ReceiveOfflineFile) => void
  ): any;
  on(
    Event: "onClientStatusChange",
    listener: (msg: data.ClientStatusChange) => void
  ): any;
  on(
    Event: "onEssenceMessageChange",
    listener: (msg: data.EssenceMessageChange) => void
  ): any;
  on(
    Event: "onAddFriendRequest",
    listener: (msg: data.AddFriendRequest) => void
  ): any;
  on(
    Event: "onAddGroupRequest",
    listener: (msg: data.AddGroupRequest) => void
  ): any;
  on(Event: "onHeartBeat", listener: (msg: data.HeartBeat) => void): any;
  on(Event: "onLifeCycle", listener: (msg: data.LifeCycle) => void): any;
  on(Event: "echo", listener: (msg: data.Returnecho) => void): any;

  addListener(
    Event: "onReceiveGroupMessage",
    listener: (msg: data.GroupMessage) => void
  ): this;
  addListener(
    Event: "onReceivePrivateMessage",
    listener: (msg: data.PrivateMessage) => void
  ): this;
  addListener(
    Event: "onPrivateDeleteMsg",
    listener: (msg: data.PrivateDeleteMsg) => void
  ): this;
  addListener(
    Event: "onGroupDeteleMsg",
    listener: (msg: data.GroupDeleteMsg) => void
  ): this;
  addListener(
    Event: "onGroupMemberAdd",
    listener: (msg: data.GroupMemberAdd) => void
  ): this;
  addListener(
    Event: "onGroupMemberDecrease",
    listener: (msg: data.GroupMemberDecrease) => void
  ): this;
  addListener(
    Event: "onGroupAdminChange",
    listener: (msg: data.GroupAdminChange) => void
  ): this;
  addListener(
    Event: "onGroupFileUpload",
    listener: (msg: data.GroupFileUpload) => void
  ): this;
  addListener(
    Event: "onGroupBan",
    listener: (msg: data.GroupBan) => void
  ): this;
  addListener(
    Event: "onFriendAdd",
    listener: (msg: data.FrienAdd) => void
  ): this;
  addListener(Event: "onNotify", listener: (msg: data.Notify) => void): this;
  addListener(
    Event: "onGroupRedbagLuckyKing",
    listener: (msg: data.GroupRedbagLuckyKing) => void
  ): this;
  addListener(
    Event: "onGroupMemberHonorChange",
    listener: (msg: data.GroupMemberHonorChange) => void
  ): this;
  addListener(
    Event: "onGroupMemberTitleChange",
    listener: (msg: data.GroupMemberTitleChange) => void
  ): this;
  addListener(
    Event: "onGroupCardChange",
    listener: (msg: data.GroupCardChange) => void
  ): this;
  addListener(
    Event: "onReceiveOfflineFile",
    listener: (msg: data.ReceiveOfflineFile) => void
  ): this;
  addListener(
    Event: "onClientStatusChange",
    listener: (msg: data.ClientStatusChange) => void
  ): this;
  addListener(
    Event: "onEssenceMessageChange",
    listener: (msg: data.EssenceMessageChange) => void
  ): this;
  addListener(
    Event: "onAddFriendRequest",
    listener: (msg: data.AddFriendRequest) => void
  ): this;
  addListener(
    Event: "onAddGroupRequest",
    listener: (msg: data.AddGroupRequest) => void
  ): this;
  addListener(
    Event: "onHeartBeat",
    listener: (msg: data.HeartBeat) => void
  ): this;
  addListener(
    Event: "onLifeCycle",
    listener: (msg: data.LifeCycle) => void
  ): this;
  addListener(Event: "echo", listener: (msg: data.Returnecho) => void): this;

  removeAllListeners(Event: "onReceiveGroupMessage"): any;
  removeAllListeners(Event: "onReceivePrivateMessage"): any;
  removeAllListeners(Event: "onPrivateDeleteMsg"): any;
  removeAllListeners(Event: "onGroupDeteleMsg"): any;
  removeAllListeners(Event: "onGroupMemberAdd"): any;
  removeAllListeners(Event: "onGroupMemberDecrease"): any;
  removeAllListeners(Event: "onGroupAdminChange"): any;
  removeAllListeners(Event: "onGroupFileUpload"): any;
  removeAllListeners(Event: "onGroupBan"): any;
  removeAllListeners(Event: "onFriendAdd"): any;
  removeAllListeners(Event: "onNotify"): any;
  removeAllListeners(Event: "onGroupRedbagLuckyKing"): any;
  removeAllListeners(Event: "onGroupMemberHonorChange"): any;
  removeAllListeners(Event: "onGroupMemberTitleChange"): any;
  removeAllListeners(Event: "onGroupCardChange"): any;
  removeAllListeners(Event: "onReceiveOfflineFile"): any;
  removeAllListeners(Event: "onClientStatusChange"): any;
  removeAllListeners(Event: "onEssenceMessageChange"): any;
  removeAllListeners(Event: "onAddFriendRequest"): any;
  removeAllListeners(Event: "onAddGroupRequest"): any;
  removeAllListeners(Event: "onHeartBeat"): any;
  removeAllListeners(Event: "onLifeCycle"): any;
  removeAllListeners(Event: "echo"): any;

  once(
    Event: "onReceiveGroupMessage",
    listener: (msg: data.GroupMessage) => void
  ): any;
  once(
    Event: "onReceivPrivateMessage",
    listener: (msg: data.PrivateMessage) => void
  ): any;
  once(
    Event: "onPrivateDeleteMsg",
    listener: (msg: data.PrivateDeleteMsg) => void
  ): any;
  once(
    Event: "onGroupDeteleMsg",
    listener: (msg: data.GroupDeleteMsg) => void
  ): any;
  once(
    Event: "onGroupMemberAdd",
    listener: (msg: data.GroupMemberAdd) => void
  ): any;
  once(
    Event: "onGroupMemberDecrease",
    listener: (msg: data.GroupMemberDecrease) => void
  ): any;
  once(
    Event: "onGroupAdminChange",
    listener: (msg: data.GroupAdminChange) => void
  ): any;
  once(
    Event: "onGroupFileUpload",
    listener: (msg: data.GroupFileUpload) => void
  ): any;
  once(Event: "onGroupBan", listener: (msg: data.GroupBan) => void): any;
  once(Event: "onFriendAdd", listener: (msg: data.FrienAdd) => void): any;
  once(Event: "onNotify", listener: (msg: data.Notify) => void): any;
  once(
    Event: "onGroupRedbagLuckyKing",
    listener: (msg: data.GroupRedbagLuckyKing) => void
  ): any;
  once(
    Event: "onGroupMemberHonorChange",
    listener: (msg: data.GroupMemberHonorChange) => void
  ): any;
  once(
    Event: "onGroupMemberTitleChange",
    listener: (msg: data.GroupMemberTitleChange) => void
  ): any;
  once(
    Event: "onGroupCardChange",
    listener: (msg: data.GroupCardChange) => void
  ): any;
  once(
    Event: "onReceiveOfflineFile",
    listener: (msg: data.ReceiveOfflineFile) => void
  ): any;
  once(
    Event: "onClientStatusChange",
    listener: (msg: data.ClientStatusChange) => void
  ): any;
  once(
    Event: "onEssenceMessageChange",
    listener: (msg: data.EssenceMessageChange) => void
  ): any;
  once(
    Event: "onAddFriendRequest",
    listener: (msg: data.AddFriendRequest) => void
  ): any;
  once(
    Event: "onAddGroupRequest",
    listener: (msg: data.AddGroupRequest) => void
  ): any;
  once(Event: "onHeartBeat", listener: (msg: data.HeartBeat) => void): any;
  once(Event: "onLifeCycle", listener: (msg: data.LifeCycle) => void): any;
  once(Event: "echo", listener: (msg: data.Returnecho) => void): any;
}

export const BotEvents: BotEvent = new EventEmitter();
export const wsevent: WebSocketEvent = new EventEmitter();
export const echo: EventEmitter = new EventEmitter();
