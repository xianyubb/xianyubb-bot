# QQ_BOT 官方 QQ BOT 对接

> **_[Gensokyo](https://github.com/Hoshinonyaruko/Gensokyo)_**

请前往 release 下载

第一次启动用法与 gocq 基本一致

请修改 config.json

7 8 9 32 行内容

32 行 `port` 即 `xianyubb-bot config.json` 需要填写的 port

具体方法参考 gocq

#### 小改动

在 xianyubb-bot config.json 中 ws 配置项需要这样填写

```json
{
  "ws": "ws://您的IP:Gensokyo 32行port端口/ws",
  "bds": { "use": false, "port": 8081 }
}
```

可用 api 请参考 Gensokyo 文档

### xianyubb-bot 支持大部分 Gensokyo 的 api

### 频道同样支持，原来 gocq 的 q 群 or 私人 api 在频道同样适用
