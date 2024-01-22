### 编写须知

1. 目前仅支持加载单个 js 文件
2. 必须放置在 **plugins** 文件夹下

### 插件补全

```js
/// <reference path="index.d.ts" />

bot.BotEvents.on();
```

### 注册插件

```js
let Plugin = require("../src/plugins").Plugins;

const plugins = new Plugin("test", "test", [0, 1, 0], { author: "hhh" });

// 暂时废弃
```

### 插件示例

```js
/// <reference path="index.d.ts" />

bot.BotEvents.on("onReceiveGroupMessage", (msg) => {
  console.log(msg);
});
```

这是一个简单的插件,其功能是监听群消息并打印在控制台

接下来你就可以开始编写插件了

[插件接口](interface.md)
