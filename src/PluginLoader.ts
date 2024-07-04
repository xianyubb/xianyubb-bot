// import * as path from "path";
// import { FileTool } from "./File/FileTool";
// // import { bot } from "./bot";
// import { logger } from "../app";
//
// const PluginPath = "./plugins";
//
// export class PluginLoader {
//   static exports: any;
//
//   // eslint-disable-next-line @typescript-eslint/no-useless-constructor
//   constructor() { }
//
//   /** 获取插件 */
//   static async getPlugin() {
//     return FileTool.readdir(PluginPath);
//   }
//
//   /** 加载插件 */
//
//   //
//   // static async loadPlugin(file: string) {
//   //   this.exports = await import(`../plugins/${file}`);
//   // }
//
//   static async loadPlugin(file: string) {
//     try {
//       // 动态导入插件模块
//       this.exports = await import(`../plugins/${file}`);
//       logger.log(`Loaded plugin ${file} successfully`);
//     } catch (error) {
//       throw new Error(`Failed to load plugin ${file}: ${error}`);
//     }
//   }
// }
//
// export async function Load() {
//   const File = await FileTool.readdir("./plugins");
//   File.forEach(async (filename) => {
//     if (path.extname(`./plugins/${filename}`) === ".js") {
//       logger.log(`正在尝试加载插件: ${filename}`);
//       try {
//         await PluginLoader.loadPlugin(filename);
//         logger.log(`加载插件 ${filename} 成功`);
//       } catch (error) {
//         logger.error(error);
//         logger.error(`加载插件 ${filename} 失败`);
//       }
//     }
//   });
// }
//
// bot.bot.on("open", () => {
//   bot.get_login_info().then((v) => {
//     logger.log(`成功连接到 BOT: ${v.data.nickname} , QQ: ${v.data.user_id}`);
//     Load();
//   });
// });
//
//

import * as path from 'path';
import * as chokidar from 'chokidar';
import * as fs from 'fs';
import * as tsnode from 'ts-node';
import { logger } from '../app';
import { FileTool } from './File/FileTool';

const PluginPath = './plugins';
const PluginTsPath = './plugins_ts';



let _exports: any;
// 加载插件
async function loadPlugin(file: string) {

  try {
    _exports = await import(`../plugins/${file}`);
    if (_exports.unLoad) {
      _exports.unLoad();
    }
    delete require.cache[require.resolve(`../plugins/${file}`)];
    _exports = await import(`../plugins/${file}`);
    _exports.onEnable();
    logger.log(`加载插件: ${file} 成功`);
  } catch (error) {
    throw new Error(`加载插件: ${file} 失败 原因: ${error}`);
  }
}

async function loadtsPlugin(file: string) {
  try {
    // 清除之前加载的缓存
    delete require.cache[require.resolve(`../plugins_ts/${file}`)];
    // 使用 ts-node 动态加载 TypeScript 文件
    _exports = tsnode.register().compile(fs.readFileSync(`./plugins_ts/${file}`, "utf-8").toString(), file);
    const index = _exports.indexOf("//# sourceMappingURL"); // 找到字符 "3" 的位置
    let newStr = "";
    if (index !== -1) {
      newStr = _exports.slice(0, index); // 使用 slice 方法获取从开头到指定位置的子字符串
      // console.log(newStr); 
    } else {
      // console.log("未找到指定字符");
    }
    fs.writeFileSync(`./plugins/${file}`.replace("ts", "js"), newStr, "utf-8");
    // logger.log(`加载插件: ${file} 成功`);
  } catch (error) {
    throw new Error(`加载插件: ${file} 失败 原因: ${error}`);
  }
}


export async function Load() {
  const files = await FileTool.readdir(PluginPath);

  files.forEach(async (filename) => {
    if (path.extname(filename) === '.js') {
      logger.log(`试图加载插件: ${filename}`);
      try {
        await loadPlugin(filename);
      } catch (error) {
        logger.error(`加载插件: ${filename} 失败 原因: ${error}`);
      }
    }
  });

  // 监听插件文件夹变化
  const watcher = chokidar.watch(PluginPath);

  watcher.on('change', async (filePath) => {
    const filename = path.basename(filePath);
    if (path.extname(filename) === '.js') {
      // logger.log(`插件: ${filename} 已经改变, 重新加载插件...`);
      try {
        await loadPlugin(filename);
        // delete require.cache[require.resolve(`../plugins/${filename}`)];

        // loadPlugin(filename) as any;
        // delete require.cache[require.resolve(`../plugins/${filename}`)];
        // eslint-disable-next-line import/no-dynamic-require
        // const Module = require(`../plugins/${filename}`);
        // this.exports = import(`../plugins/${file}`).then((v) => {
        // logger.debug(JSON.stringify(_exports));
        // Module.removeListener();

        // Module.onEnable();

        // logger.log(`重新加载插件: ${filename} 成功`);
      } catch (error) {
        logger.error(`重新加载插件: ${filename} 失败 原因: ${error}`);
      }
    }
  });

  watcher.on('error', (error) => {
    logger.error(`Watcher error: ${error}`);
  });
}




export async function Loadts() {
  const files = await FileTool.readdir(PluginTsPath);

  files.forEach(async (filename) => {
    if (path.extname(filename) === '.ts') {
      // logger.log(`试图加载插件: ${filename}`);
      try {
        await loadtsPlugin(filename);
      } catch (error) {
        // logger.error(`加载插件: ${filename} 失败 原因: ${error}`);
      }
    }
  });

  // 监听插件文件夹变化
  const watcher = chokidar.watch(PluginTsPath);

  watcher.on('change', async (filePath) => {
    const filename = path.basename(filePath);
    if (path.extname(filename) === '.ts') {
      // logger.log(`插件: ${filename} 已经改变, 重新加载插件...`);
      try {

        await loadtsPlugin(filename);
        // logger.log(`重新加载插件: ${filename} 成功`);
      } catch (error) {
        logger.error(`重新加载插件: ${filename} 失败 原因: ${error}`);
      }
    }
  });

  watcher.on('error', (error) => {
    logger.error(`Watcher error: ${error}`);
  });
}