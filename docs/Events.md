# 事件系统


## 🔔 监听 API
注册指定的监听函数。<br/>
当游戏中的某种事件发生时，你设置的对应的监听函数将被引擎调用，这时候你可以对相关事件进行处理。

## 注册监听器

`bot.BotEvents(Event,callback)`

参数：

Event : String
要监听的事件名（见下方监听事件列表）

callback : Function
注册的监听函数（函数相关参数见下）

## 统一回调函数

 `function(msg)`

* 参数:
  - msg : 监听返回的数据
  - 具体请看 [go-cqhttp 文档](https://docs.go-cqhttp.org)

## 监听事件列表

### 消息上报
 
#### `onReceiveGroupMessage`-收到群消息

#### `onReceivePrivateMessage`-收到私聊消息

### 通知上报

#### `onGroupMenberAdd`-群成员增加


