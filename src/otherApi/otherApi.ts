interface CQCode {
    "type": string
    "data": object

}

export class OtherApi {

    /**
     * 
     * @param id QQ 表情 ID
     * @returns 
     */
    static face(id: number) {
        return `[CQ:face,id=${id}]`
    }

    /**
     * 
     * @param qq at人的QQ号
     * @param otherCode 其他的CQCode，数组形式
     * @returns CQ码，直接在message参数一栏填写即可，不需要转成字符串
     */
    static at(qq: string, otherCode?: CQCode[]): CQCode[] {
        const atObject = {
            "type": "at",
            "data": {
                "qq": qq
            }
        };

        if (otherCode) {
            return [atObject, ...otherCode];
        }

        return [atObject];
    }

    /**
     * [CQ:reply] (废弃状态)
     * @param id 回复时所引用的消息id, 必须为本群消息
     * @param text 自定义回复的信息
     * @param qq 自定义回复时的自定义QQ, 如果使用自定义信息必须指定
     * @param time 自定义回复时的时间, 格式为Unix时间
     * @param seq 起始消息序号, 可通过 get_msg 获得
     * @returns 完成的CQ码
     */
    static reply(id?: number, text?: string, qq?: number, time?: number, seq?: number): string {
        const params = [
            { name: 'id', value: id },
            { name: 'text', value: text },
            { name: 'qq', value: qq },
            { name: 'time', value: time },
            { name: 'seq', value: seq }
        ];

        const filteredParams = params.filter(param => param.value !== undefined);
        const paramString = filteredParams.map(param => `${param.name}=${param.value}`).join(',');

        return `[CQ:reply${paramString ? `,${paramString}` : ''} ]`;
    }


}

