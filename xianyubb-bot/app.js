"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const fs = require("fs");
const path = require("path");
const api_1 = require("./src/api");
const Path = "./config/config.json";
let log = (...param) => {
    console.log(param);
};
const data_ = JSON.parse(fs.readFileSync(Path).toString());
exports.bot = new api_1.Bot(`ws://${data_.address}:${data_.port}`);
function mkdir() {
    if (!fs.existsSync(Path)) {
        fs.mkdir("./config", (a) => {
        });
        fs.writeFile(Path, JSON.stringify({
            address: "127.0.0.1",
            port: 8080
        }), () => {
            log(`已在${Path}生成配置文件，请修改配置文件后开启`);
        });
    }
    if (!fs.existsSync("./plugins")) {
        fs.mkdir("./plugins", () => {
        });
    }
}
mkdir();
const pluginsDir = './plugins'; // plugins文件夹路径
// 扫描plugins文件夹下的所有js文件
fs.readdirSync(pluginsDir).forEach(file => {
    const pluginPath = path.join(pluginsDir, file);
    // 检查文件扩展名是否为.js
    setTimeout(() => {
        var _a;
        if (path.extname(pluginPath) === '.js') {
            // 导入并打印变量
            (_a = path.resolve(pluginPath), Promise.resolve().then(() => require(_a))).then(plugin => {
            });
        }
    }, 300);
});
//# sourceMappingURL=app.js.map