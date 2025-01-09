import * as path from "path";
import * as chokidar from "chokidar";
import * as fs from "fs";
import * as tsnode from "ts-node";
import { Logger } from "./Logger";
import { rootDir } from "../app";
import { FileTool } from "./File/FileTool";

const PluginPath = `${rootDir}\\plugins`;
const PluginTsPath = `${rootDir}\\plugins_ts`;

const logger = new Logger();


let _exports: any;
// 加载插件
async function loadPlugin(file: string) {
  try {
    _exports = await import(`${rootDir}/plugins/${file}`);
    if (_exports.unLoad) {
      _exports.unLoad();
    }
    delete require.cache[require.resolve(`${rootDir}/plugins/${file}`)];
    _exports = await import(`${rootDir}/plugins/${file}`);
    if (_exports.onEnable) {
      _exports.onEnable();
    }
    logger.log(`加载插件: ${file} 成功`);
  } catch (error) {
    throw new Error(`加载插件: ${file} 失败 原因: ${error}`);
  }
}

async function loadtsPlugin(file: string) {
  try {
    // 清除之前加载的缓存
    delete require.cache[require.resolve(`${rootDir}/plugins_ts/${file}`)];
    // 使用 ts-node 动态加载 TypeScript 文件
    _exports = tsnode
      .create({
        "compilerOptions": {
          "module": "CommonJS",
          "target": "ES2021",
          "lib": ["ES2021"],
          "resolveJsonModule": true
        }
      })
      .compile(
        fs.readFileSync(`${rootDir}/plugins_ts/${file}`, "utf-8").toString(),
        file,
      );
    const index = _exports.indexOf("//# sourceMappingURL"); // 找到字符 "3" 的位置
    let newStr = "";
    if (index !== -1) {
      newStr = _exports.slice(0, index); // 使用 slice 方法获取从开头到指定位置的子字符串
      // console.log(newStr);
    } else {
      // console.log("未找到指定字符");
    }
    fs.writeFileSync(
      `${rootDir}/plugins/${file}`.replace("ts", "js"),
      newStr,
      "utf-8"
    );
    // logger.log(`加载插件: ${file} 成功`);
  } catch (error) {
    throw new Error(`加载插件: ${file} 失败 原因: ${error}`);
  }
}

export async function Load() {
  const files = await FileTool.readdir(PluginPath);

  files.forEach(async (filename) => {
    if (path.extname(filename) === ".js") {
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

  watcher.on("change", async (filePath) => {
    const filename = path.basename(filePath);
    if (path.extname(filename) === ".js") {
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

  watcher.on("error", (error) => {
    logger.error(`Watcher error: ${error}`);
  });
}

export async function Loadts() {
  const files = await FileTool.readdir(PluginTsPath);

  files.forEach(async (filename) => {
    if (path.extname(filename) === ".ts") {
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

  watcher.on("change", async (filePath) => {
    const filename = path.basename(filePath);
    if (path.extname(filename) === ".ts") {
      // logger.log(`插件: ${filename} 已经改变, 重新加载插件...`);
      try {
        await loadtsPlugin(filename);
        // logger.log(`重新加载插件: ${filename} 成功`);
      } catch (error) {
        logger.error(`重新加载插件: ${filename} 失败 原因: ${error}`);
      }
    }
  });

  watcher.on("error", (error) => {
    logger.error(`Watcher error: ${error}`);
  });
}
