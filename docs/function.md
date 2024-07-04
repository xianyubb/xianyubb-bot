# 插件

## 编写须知

1. 仅能加载 `js/ts` 插件
2. js 插件请放置于 `plugins` 目录下
3. ts 插件请放置于 `plugins_ts` 目录下
4. ts 插件导入补全请使用绝对路径
5. 插件必须导出一些函数
6. 插件可以热加载 实时监听改变重新加载

### 插件补全

```js
/// <reference path="index.d.ts" />

bot.BotEvents.on();
```

```ts
/// <reference path="D:\Dev\Xianyubb-bot_Dev\xianyubb-bot\completion/index.d.ts" />
// ts 插件导入补全请使用绝对路径

bot.BotEvents.on();
```

### 注册插件

```js
let Plugin = require("../src/plugins").Plugins;

const plugins = new Plugin("test", "test", [0, 1, 0], { author: "hhh" });

// 暂时废弃
```

### 导出函数

```ts
/// <reference path="D:\Dev\Xianyubb-bot_Dev\xianyubb-bot\completion/index.d.ts" />
// 例如我监听了一个事件

// 原写法
bot.BotEvents.on("onReceiveGroupMessage", (msg: GroupMessage) => {
  // 回调函数
});

// 现在写法
// 函数名可以自定义
function onReceiveGroupMessage(msg: GroupMessage) {
  // 回调函数
}

export function onEnable() {
  bot.BotEvents.on("onReceiveGroupMessage", onReceiveGroupMessage);
}

// 必须导出这个函数
export function unLoad() {
  bot.BotEvents.removeListener("onReceiveGroupMessage", onReceiveGroupMessage);
}
// 可以看出这肯定麻烦了不少
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
