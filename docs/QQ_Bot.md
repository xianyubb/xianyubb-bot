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

可用api请参考Gensokyo文档

### xianyubb-bot支持大部分Gensokyo的api
### 频道同样支持，原来gocq的q群or私人api在频道同样适用

