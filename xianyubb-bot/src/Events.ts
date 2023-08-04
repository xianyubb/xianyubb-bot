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
  emit(Event: "onGroupMenberAdd", msg: data.GroupMenberAdd): any
  emit(Event: "echo", msg: data.Returnecho): any


    on(Event: "onReceiveGroupMessage", listener: (msg: data.GroupMessage) => void): any
  on(Event: "onReceivePrivateMessage", listener: (msg: data.PrivateMessage) => void): any
  on(Event: "onGroupMenberAdd", listener: (msg: data.GroupMenberAdd) => void): any
  on(Event: "echo", listener: (msg: data.Returnecho) => void): any


    addListener(Event: "onReceiveGroupMessage", listener: (msg: data.GroupMessage) => void): this;
  addListener(Event: "onReceivePrivateMessage", listener: (msg: data.PrivateMessage) => void): this
  addListener(Event: "onGroupMenberAdd", listener: (msg: data.GroupMenberAdd) => void): this
  addListener(Event: "echo", listener: (msg: data.Returnecho) => void): this

  removeAllListeners(Event: "onReceiveGroupMessage"): any;
  removeAllListeners(Event: "onReceivePrivateMessage"): any;
  removeAllListeners(Event: "onGroupMenberAdd"): any;
  removeAllListeners(Event: "echo"): any;


    once(Event: "onReceiveGroupMessage", listener: (msg: data.GroupMessage) => void): any
  once(Event: "onReceivPrivateMessage", listener: (msg: data.PrivateMessage) => void): any
  once(Event: "onGroupMenberAdd", listener: (msg: data.GroupMenberAdd) => void): any
  once(Event: "echo", listener: (msg: data.Returnecho) => void): any;
}

export const bot: BotEvent = new EventEmitter()
export const wsevent: WebSocketEvent = new EventEmitter()
export const echo : EventEmitter = new EventEmitter()
