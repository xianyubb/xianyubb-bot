import * as data from "./data"
import { EventEmitter } from 'events';

export interface WebSocketEvent extends EventEmitter {
  on(event: "message", listener: (msg: data.Data) => void): any
  on(event: "connect", listener: () => void): any


  emit(event: "message", msg: data.Data): any
  emit(event: "connect"): any

  addListener(event: "message", listener: (msg: data.Data) => void): any
  addListener(event: "connect", listener: () => void): any

  removeAllListeners(event: "message"): any
  removeAllListeners(event: "connect"): any

  once(event: "message", listener: (msg: data.Data) => void): any
  once(event: "message", listener: () => void): any
}

export interface BotEvent extends EventEmitter {
  emit(Event: "onReceiveGroupMessage", msg: data.GroupMessage): any
  emit(Event: "onReceivePrivateMessage", msg: data.PrivateMessage): any
  emit(Event: "onPrivateDeleteMsg", msg: data.PrivateDeleteMsg): any
  emit(Event: "onGroupDeteleMsg", msg: data.GroupDeleteMsg): any
  emit(Event: "onGroupMenberAdd", msg: data.GroupMenberAdd): any
  emit(Event: "onGroupMenberDecrease", msg: data.GroupMenberDecrease): any
  emit(Event: "onGroupAdminChange", msg: data.GroupAdminChange): any
  emit(Event: "onGroupFileUpload", msg: data.GroupFileUpload): any
  emit(Event: "onGroupBan", msg: data.GroupBan): any
  emit(Event: "onFriendAdd", msg: data.FrienAdd): any
  emit(Event: "onNotify", msg: data.Notify): any
  emit(Event: "echo", msg: data.Returnecho): any


  on(Event: "onReceiveGroupMessage", listener: (msg: data.GroupMessage) => void): any
  on(Event: "onReceivePrivateMessage", listener: (msg: data.PrivateMessage) => void): any
  on(Event: "onPrivateDeleteMsg", listener: (msg: data.PrivateDeleteMsg) => void): any
  on(Event: "onGroupDeteleMsg", listener: (msg: data.GroupDeleteMsg) => void): any
  on(Event: "onGroupMenberAdd", listener: (msg: data.GroupMenberAdd) => void): any
  on(Event: "onGroupMenberDecrease", listener: (msg: data.GroupMenberDecrease) => void): any
  on(Event: "onGroupAdminChange", listener: (msg: data.GroupAdminChange) => void): any
  on(Event: "onGroupFileUpload", listener: (msg: data.GroupFileUpload) => void): any
  on(Event: "onGroupBan", listener: (msg: data.GroupBan) => void): any
  on(Event: "onFriendAdd", listener:(msg: data.FrienAdd)=>void): any
  on(Event: "onNotify", listener: (msg: data.Notify) => void): any
  on(Event: "echo", listener: (msg: data.Returnecho) => void): any


  addListener(Event: "onReceiveGroupMessage", listener: (msg: data.GroupMessage) => void): this;
  addListener(Event: "onReceivePrivateMessage", listener: (msg: data.PrivateMessage) => void): this
  addListener(Event: "onPrivateDeleteMsg", listener: (msg: data.PrivateDeleteMsg) => void): this
  addListener(Event: "onGroupDeteleMsg", listener: (msg: data.GroupDeleteMsg) => void): this
  addListener(Event: "onGroupMenberAdd", listener: (msg: data.GroupMenberAdd) => void): this
  addListener(Event: "onGroupMenberDecrease", listener: (msg: data.GroupMenberDecrease) => void): this
  addListener(Event: "onGroupAdminChange", listener: (msg: data.GroupAdminChange) => void): this
  addListener(Event: "onGroupFileUpload", listener: (msg: data.GroupFileUpload) => void): this
  addListener(Event: "onGroupBan", listener: (msg: data.GroupBan) => void): this
  addListener(Event: "onFriendAdd", listener: (msg: data.FrienAdd) => void): this
  addListener(Event: "onNotify", listener: (msg: data.Notify) => void): this
  addListener(Event: "echo", listener: (msg: data.Returnecho) => void): this

  removeAllListeners(Event: "onReceiveGroupMessage"): any;
  removeAllListeners(Event: "onReceivePrivateMessage"): any;
  removeAllListeners(Event: "onPrivateDeleteMsg"): any
  removeAllListeners(Event: "onGroupDeteleMsg"): any
  removeAllListeners(Event: "onGroupMenberAdd"): any
  removeAllListeners(Event: "onGroupMenberDecrease"): any
  removeAllListeners(Event: "onGroupAdminChange"): any
  removeAllListeners(Event: "onGroupFileUpload"): any
  removeAllListeners(Event: "onGroupBan"): any
  removeAllListeners(Event: "onFriendAdd"): any
  removeAllListeners(Event: "onNotify"): any
  removeAllListeners(Event: "echo"): any;


  once(Event: "onReceiveGroupMessage", listener: (msg: data.GroupMessage) => void): any
  once(Event: "onReceivPrivateMessage", listener: (msg: data.PrivateMessage) => void): any
  once(Event: "onPrivateDeleteMsg", listener: (msg: data.PrivateDeleteMsg) => void): any
  once(Event: "onGroupDeteleMsg", listener: (msg: data.GroupDeleteMsg) => void): any
  once(Event: "onGroupMenberAdd", listener: (msg: data.GroupMenberAdd) => void): any
  once(Event: "onGroupMenberDecrease", listener: (msg: data.GroupMenberDecrease) => void): any
  once(Event: "onGroupAdminChange", listener: (msg: data.GroupAdminChange) => void): any
  once(Event: "onGroupFileUpload", listener: (msg: data.GroupFileUpload) => void): any
  once(Event: "onGroupBan", listener: (msg: data.GroupBan) => void): any
  once(Event: "onFriendAdd", listener: (msg: data.FrienAdd) => void):any
  once(Event: "onNotify", listener: (msg: data.Notify) => void): any
  once(Event: "echo", listener: (msg: data.Returnecho) => void): any;
}

export const bot: BotEvent = new EventEmitter()
export const wsevent: WebSocketEvent = new EventEmitter()
export const echo: EventEmitter = new EventEmitter()
