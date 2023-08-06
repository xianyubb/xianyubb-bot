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

#### `onPrivateDeleteMsg`-私聊消息撤回

#### `onGroupDeteleMsg`-群消息撤回

#### `onGroupMenberAdd`-群成员增加

#### `onGroupMenberDecrease`-群成员减少

#### `onGroupAdminChange`-群管理员变动

#### `onGroupFileUpload`-群文件上传

#### `onGroupBan`-群禁言

#### `onFriendAdd`-好友添加

#### `onNotify`-戳一戳

> 此事件无法在手表协议上触发

#### `onGroupRedbagLuckyKing`-群红包运气王提示

> 此事件无法在手表协议上触发

#### `onGroupMenberHonorChange`-群成员荣誉变更提示

> 此事件无法在手表协议上触发

#### `onGroupMenberTitleChange`-群成员头衔变更

#### `onGroupCardChange`-群成员名片更新

> 此事件不保证时效性, 仅在收到消息时校验卡片

#### `onReceiveOfflineFile`-接收到离线文件

#### `onClientStatusChange`-其他客户端在线状态变更

#### `onEssenceMessageChange`-精华消息变更

### 请求上报

#### `onAddFriendRequest`-加好友请求

#### `onAddGroupRequest`-加群请求/邀请

### 元事件上报

#### `onHeartBeat`-心跳包

#### `onLifeCycle`-生命周期


