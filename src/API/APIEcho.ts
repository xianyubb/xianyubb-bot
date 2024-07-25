import { Returnecho } from "../data";

// Bot 账号

interface Device {
  /** 客户端ID */
  app_id: number;
  /** 设备名称 */
  device_name: string;
  /** 设备类型 */
  device_kind: string;
}

export interface get_login_infoEcho extends Returnecho {
  /** 响应数据 */
  data: {
    /** QQ 号 */
    user_id: number;
    /** QQ昵称 */
    nickname: string;
  };
}

export interface set_qq_profileEcho extends Returnecho {}

export interface qidian_get_account_infoEcho extends Returnecho {
  /** 响应数据 */
  data: {
    /** QQ 号 */
    user_id: number;
    /** QQ昵称 */
    nickname: string;
  };
}

export interface _get_model_showEcho extends Returnecho {
  /** 响应数据 */
  data: {
    variants: [model_show: string, need_pay: boolean];
  };
}

export interface _set_model_showEcho extends Returnecho {}

export interface get_online_clientsEcho extends Returnecho {
  /** 响应数据 */
  data: {
    /** 在线客户端列表 */
    clients: Device[];
  };
}

// 好友信息

export interface get_stranger_infoEcho extends Returnecho {
  /** 响应数据 */
  data: {
    /** QQ号 */
    user_id: number;
    /** 昵称 */
    nickname: string;
    /** 性别, male 或 female 或 unknown */
    sex: string;
    /** 年龄 */
    age: number;
    /** qid ID身份卡 */
    qid: string;
    /** 等级 */
    level: number;
    /** 官网写的等级，我认为是注册天数 */
    login_days: number;
  };
}

export interface get_friend_listEcho extends Returnecho {
  /** 响应数据 */
  data: {
    /** QQ号 */
    user_id: number;
    /** 昵称 */
    nickname: string;
    /** 备注名 */
    remark: string;
  };
}

export interface get_unidirectional_friend_listEcho extends Returnecho {
  /** 响应数据 */
  data: {
    /** QQ号 */
    user_id: number;
    /** 昵称 */
    nickname: string;
    /** 来源 */
    source: string;
  };
}
