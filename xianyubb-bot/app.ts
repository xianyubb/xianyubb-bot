import * as fs from "fs"
import * as path from 'path';
import { Bot } from "./src/api";


const Path = "./config/config.json"

let log = (...param: any) => {
  console.log(param)
}


const data_ = JSON.parse(fs.readFileSync(Path).toString())

export const bot = new Bot(`ws://${data_.address}:${data_.port}`)






function mkdir() {
  if (!fs.existsSync(Path)) {
    fs.mkdir("./config", (a) => {
    })
    fs.writeFile(Path, JSON.stringify({
      address: "127.0.0.1",
      port: 8080
    }), () => {
      log(`已在${Path}生成配置文件，请修改配置文件后开启`)
    })
  } if (!fs.existsSync("./plugins")) {
    fs.mkdir("./plugins", () => {
    })
  }
}


mkdir()



const pluginsDir = './plugins'; // plugins文件夹路径
// 扫描plugins文件夹下的所有js文件
fs.readdirSync(pluginsDir).forEach(file => {
  const pluginPath = path.join(pluginsDir, file);

  // 检查文件扩展名是否为.js
  setTimeout(() => {
    if (path.extname(pluginPath) === '.js') {
      // 导入并打印变量
     
      import(path.resolve(pluginPath)).then(plugin => {
        
      });
    }
  },300)
  
});
