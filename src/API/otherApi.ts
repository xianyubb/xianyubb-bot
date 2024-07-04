interface CQCode {
  type: string;
  data: object;
}

/** 生成特定的 CQ 码类型消息 */
export class OtherAPI {
  /**
   * [CQ:face]
   * @param id QQ 表情 ID
   * @param otherCode 其他的CQCode，数组形式
   * @returns CQ码，直接在message参数一栏填写即可，不需要转成字符串
   */
  static face(id: number, otherCode?: CQCode[]): CQCode[] {
    const atObject: CQCode = {
      type: "face",
      data: {
        id,
      },
    };

    if (otherCode) {
      return [atObject, ...otherCode];
    }

    return [atObject];
  }

  /**
   * [CQ:record]
   * @param file 语音文件名
   * @param magic 发送时可选，默认 0，设置为 1 表示变声
   * @param cache 只在通过网络 URL 发送时有效，表示是否使用已缓存的文件，默认 1
   * @param proxy 只在通过网络 URL 发送时有效，表示是否通过代理下载文件（需通过环境变量或配置文件配置代理），默认 1
   * @param otherCode 其他的CQCode，数组形式
   * @returns CQ码，直接在message参数一栏填写即可，不需要转成字符串
   */
  static record(file: string, magic = 0, cache = 1, proxy = 1, otherCode?: CQCode[]) {
    const atObject: CQCode = {
      type: "record",
      data: {
        file,
        magic,
        cache,
        proxy,
      },
    };

    if (otherCode) {
      return [atObject, ...otherCode];
    }

    return [atObject];
  }

  /**
   * [CQ:at]
   * @param qq at人的QQ号
   * @param otherCode 其他的CQCode，数组形式
   * @returns CQ码，直接在message参数一栏填写即可，不需要转成字符串
   */
  static at(qq: string, otherCode?: CQCode[]): CQCode[] {
    const atObject = {
      type: "at",
      data: {
        qq,
      },
    };

    if (otherCode) {
      return [atObject, ...otherCode];
    }

    return [atObject];
  }

  /**
   * [CQ:reply]
   * @param id 回复时所引用的消息id, 必须为本群消息
   * @param otherCode 其他的CQCode，数组形式
   * @returns CQ码，直接在message参数一栏填写即可，不需要转成字符串
   */
  static reply(id: number, otherCode: CQCode[]): CQCode[] {
    const atObject = {
      type: "reply",
      data: {
        id,
      },
    };

    if (otherCode) {
      return [atObject, ...otherCode];
    }

    return [atObject];
  }

  /**
   * [CQ:image]
   * @param file 图片文件名
   * @param cache 只在通过网络 URL 发送时有效，表示是否使用已缓存的文件，默认 1
   * @param proxy 只在通过网络 URL 发送时有效，表示是否通过代理下载文件（需通过环境变量或配置文件配置代理），默认 1
   * @param type 图片类型，flash 表示闪照，无此参数表示普通图片
   * @param otherCode 其他的CQCode，数组形式
   * @returns CQ码，直接在message参数一栏填写即可，不需要转成字符串
   */
  static image(file: string, cache = 1, proxy = 1, type?: string, otherCode?: CQCode[]) {
    const atObject: CQCode = {
      type: "image",
      data: {
        file,
        type,
        cache,
        proxy,
      },
    };

    if (otherCode) {
      return [atObject, ...otherCode];
    }

    return [atObject];
  }
}
