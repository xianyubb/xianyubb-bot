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

### 图片

#### 获取图片信息

> `bot.get_image(file)`

#### 检查是否可以发送图片

> `bot.can_send_image()`

#### 图片 OCR

> `bot.ocr_image(image)`

目前图片OCR接口仅支持接受的图片

### 语音

#### 获取语音

> `bot.get_record(file,out_format)`

要使用此接口, 通常需要安装 ffmpeg, 请参考 OneBot 实现的相关说明。

#### 检查是否可以发送语音

> `bot.can_send_record()`

该 API 无需参数

### 处理

#### 处理加好友请求

> `bot.set_friend_add_request(flag,approve,remark)`

该 API 无响应数据

#### 处理加群请求/邀请

> `bot.set_group_add_request(flag,sub_type,approve,reason)`

该 API 无响应数据

### 群信息

#### 获取群信息

> `bot.get_group_info(group_id,no_cache)`

如果机器人尚未加入群, group_create_time, group_level, max_member_count 和 member_count 将会为0

#### 获取群列表

> `bot.get_group_list(no_cache)`

响应内容为 json 数组, 每个元素和上面的 get_group_info 接口相同。

#获取

#### 获取群成员信息

> `botget_group_member_info(group_id,user_id,no_cache)`

#### 获取群成员列表

> `botget_group_member_list(group_id,no_cache)`

#### 获取群荣誉信息

> `bot.get_group_honor_info(gruop_id,type)`

#### 获取群系统消息

> `bot.get_group_system_msg()`

如果列表不存在任何消息, 将返回 `null`

#### 获取精华消息列表

> `bot.get_essence_msg_list(group_id)`

#### 获取群 @全体成员 剩余次数

> `bot.get_group_at_all_remain(group_id)`

### 群设置

#### 设置群名

> `bot.set_group_name(group_id,group_name)`

该 API 无响应数据

#### 设置群头像

> `bot.set_group_portrait(group_id,file,cache)`

[1] file 参数支持以下几种格式：

* 绝对路径, 例如 file:///C:\\Users\Richard\Pictures\1.png, 格式使用 file URI
* 网络 URL, 例如 http://i1.piimg.com/567571/fdd6e7b6d93f1ef0.jpg
* Base64 编码, 例如 base64://iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAIAAADJt1n/AAAAKElEQVQ4EWPk5+RmIBcwkasRpG9UM4mhNxpgowFGMARGEwnBIEJVAAAdBgBNAZf+QAAAAABJRU5ErkJggg==

[2] cache参数: 通过网络 URL 发送时有效, 1表示使用缓存, 0关闭关闭缓存, 默认 为1

[3] 目前这个API在登录一段时间后因cookie失效而失效, 请考虑后使用

#设置群

#### 设置群管理员

> `bot.set_group_admin(group_id,user_id,enable)`

该 API 无响应数据

#### 设置群名片 ( 群备注 )

> `bot.set_group_card(group_id,user_id,card)`

该 API 无响应数据

#### 设置群组专属头衔

> `bot.set_group_special_title(group_id,user_ifd,special_title,duration)`

该 API 无响应数据
