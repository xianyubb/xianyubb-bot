interface CQCode {
  type: string;
  data: object;
}

export class OtherAPI {
  /**
   * [CQ:face]
   * @param id QQ 表情 ID
   * @returns
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

  static record(file: string, url?: string, magic = 0, cache = 1, proxy = 1) {
    const atObject: CQCode = {
      type: "record",
      data: {
        file,
        url,
        magic,
        cache,
        proxy,
      },
    };

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
}
