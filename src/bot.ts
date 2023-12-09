import * as fs from "fs"
import { Bot } from "./api";

const data_ = JSON.parse(fs.readFileSync("./config/config.json").toString())


// eslint-disable-next-line import/no-mutable-exports
export let bot = new Bot(data_.ws)



bot.bot.onopen = () => {
    console.log("连接成功")
}



console.log("正在启动xianyubb-bot")
console.log("正在连接go-cqhttp...")



bot.bot.on("error", (error) => {
    console.error("WebSocket 连接错误:", error);
    console.log("正在尝试重连...")
    bot = new Bot(data_.ws)
    bot.bot.on("error", (err) => {
        console.error("WebSocket重接错误:", err.message);

    })
});
// 监听连接关闭事件
bot.bot.on("close", (code, reason) => {
    console.log("WebSocket已关闭，状态码:", code, "原因:", reason.toString());
    // 在连接关闭时执行适当的处理逻辑
    // 例如，可以尝试重新连接WebSocket
});




