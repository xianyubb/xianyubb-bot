# API接口

提供了对qq号的操作接口<br/>
具体响应数据请看 [go-cqhttp 文档](https://docs.go-cqhttp.org)<br/>
某些 API 没有响应数据

您在编写插件的时候就能看到各参数的具体详情了

### Bot帐号

#### 获取登录号信息

> `bot.get_login_info()`

该 API 无需参数

#### 设置登录号资料

> `bot.set_qq_profile(nickname,company,email,college,personal.note)`

该 API 没有响应数据

#### 获取企点账号信息

> `bot.qidian_get_account_info()`

该API只有企点协议可用
该 API 无需参数

#### 获取在线机型

> `bot._get_model_show(model)`

有关例子可从[这个链接](https://github.com/Mrs4s/go-cqhttp/pull/872#issuecomment-831180149)找到

#### 设置在线机型

> `bot._set_model_show(model,model_show)`

有关例子可从[这个链接](https://github.com/Mrs4s/go-cqhttp/pull/872#issuecomment-831180149)找到

#### 获取当前账号在线客户端列表

> `bot.get_online_clients(no_cache)`

### 好友信息

#### 获取陌生人信息

> `bot.get_stranger_info(user_id,no_cache)`

#### 获取好友列表

> `bot.get_friend_list()`

该 API 无需参数

#### 获取单向好友列表

> `bot.get_unidirectional_friend_list()`

该 API 无需参数

### 好友操作

#### 删除好友

> `bot.delete_friend(user_id)`

该 API 无响应数据

#### 删除单向好友

> `bot.delete_unidirectional_friend(user_id)`

该 API 没有响应数据

### 消息

#### 发送私聊消息

> `bot.send_private_msg(user_id, message,auto_escape)`

#### 发送群消息

> `bot.send_group_msg(group_id, message,auto_escape)`

#### 发送消息

> `bot.send_msg(message[,message_type,user_id,group_id,auto_escape])`

#### 获取消息

> `bot.get_msg(message_id)`

#### 撤回消息

> `bot.delete_msg(message_id)`

#### 标记消息已读

> `bot.mark_msg_as_read(message_id)`

#### 获取合并转发内容

> `bot.get_forward_msg(message_id)`

字段 message_id 对应[合并转发](https://docs.go-cqhttp.org/cqcode)中的 id 字段

#### 发送合并转发 (群聊)

> `bot.send_group_forward_msg(group_id,messages)`

#### 发送合并转发 (好友)

> `bot.send_private_forward_msg(group_id,messages)`

#### 获取群消息历史记录

> `bot.get_group_msg_history(message_seq,group_id)`

不提供起始序号将默认获取最新的消息