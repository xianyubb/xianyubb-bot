### 编写须知

1. 目前仅支持单个加载js插件
2. 必须放置在 **plugins** 文件夹下


### 插件示例

```js
let bot = require("../app").bot

bot.BotEvents.on("onReceiveGroupMessage", (msg) => {
   console.log(msg)
})
```
这是一个简单的插件,其功能是监听群消息并打印在控制台

接下来你就可以开始编写插件了

[插件接口](interface.md)