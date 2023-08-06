"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = exports.log = void 0;
const fs = require("fs");
const api_1 = require("./src/api");
const keypress = require("keypress");
const path = require("path");
const Path = "./config/config.json";
function mkdir() {
    if (!fs.existsSync(Path)) {
        fs.mkdirSync("./config");
        fs.writeFileSync(Path, JSON.stringify({
            address: "127.0.0.1",
            port: 8080
        }));
    }
    if (!fs.existsSync("./plugins")) {
        fs.mkdirSync("./plugins");
    }
}
mkdir();
function log(...param) {
    console.log(param);
}
exports.log = log;
const data_ = JSON.parse(fs.readFileSync(Path).toString());
exports.bot = new api_1.Bot(`ws://${data_.address}:${data_.port}`);
exports.bot.bot.onopen = () => {
    console.log("连接成功");
};
console.log("正在启动xianyubb-bot");
console.log("正在连接go-cqhttp...");
exports.bot.bot.on("error", (error) => {
    console.error("WebSocket连接错误:", error);
    console.log("正在尝试重连...");
    exports.bot = new api_1.Bot(`ws://${data_.address}:${data_.port}`);
    exports.bot.bot.on("error", (err) => {
        console.error("WebSocket重接错误:", error);
        exit();
    });
});
// 监听连接关闭事件
exports.bot.bot.on("close", (code, reason) => {
    console.log("WebSocket已关闭，状态码:", code, "原因:", reason.toString());
    // 在连接关闭时执行适当的处理逻辑
    // 例如，可以尝试重新连接WebSocket
});
function exit() {
    console.log("点击任意键退出");
    // 开启键盘输入的监听
    keypress(process.stdin);
    // 监听键盘按键事件
    process.stdin.on("keypress", (ch, key) => {
        // 只要有键盘按键，就退出程序
        process.exit();
    });
    // 开启标准输入流的输入
    process.stdin.setRawMode(true);
    process.stdin.resume();
}
exports.bot.bot.onopen = () => {
    console.log("连接成功");
    console.log("正在加载插件");
    const pluginsDir = './plugins'; // plugins文件夹路径
    let pluginarr = [];
    fs.readdirSync(pluginsDir).forEach(file => {
        var _a;
        const pluginPath = path.join(pluginsDir, file);
        if (path.extname(pluginPath) === '.js') {
            (_a = path.resolve(pluginPath), Promise.resolve().then(() => require(_a))).then(() => {
                let a = pluginarr.push(file);
                console.log("已加载插件: " + a + "个");
            });
        }
    });
};
//# sourceMappingURL=app.js.map