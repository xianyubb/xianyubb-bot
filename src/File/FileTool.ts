import * as fs from "fs"

export class FileTool {
    constructor() { }

    /** 读入文件的所有内容 */
    static async readFrom(path: string) {
        return fs.readFileSync(path)
    }

    /** 向指定文件写入内容 */
    static writeTo(path: string, text: string) {
        fs.writeFileSync(path, text)

    }
    /** 文件是否存在 */
    static isexists(path: string) {
        return fs.existsSync(path)
    }

    /** 创建文件夹 */
    static mkdir(path: string) {
        fs.mkdirSync(path)
    }

    /** 读取文件夹下的文件 */
    static async readdir(path: string) {
        return await fs.promises.readdir(path)
    }
}