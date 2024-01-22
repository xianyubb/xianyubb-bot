// import { createOpenAPI, createWebsocket } from 'qq-guild-bot';

// const testConfig = {
//     appID: '102086038', // 申请机器人时获取到的机器人 BotAppID
//     token: 'r48dNJ9cOdnjh5VQit2m87uJnHRFlLOm', // 申请机器人时获取到的机器人 BotToken
//     intents: [], // 事件订阅,用于开启可接收的消息类型
//     sandbox: true, // 沙箱支持，可选，默认false. v2.7.0+
// };

// // 创建 client
// export const client = createOpenAPI(testConfig);

// // 创建 websocket 连接
// export const ws = createWebsocket(testConfig);

// ws.on('GUILD_MESSAGES', (data) => {
//     console.log('[GUILD_MESSAGES] 事件接收 :', data);
//     client
//         .messageApi
//         .postMessage(data.msg.channel_id, {
//             content: "test",
//             "message_reference": {
//                 message_id: data.msg.id
//             }
//         }).then(res => {
//             // 数据存储在data中
//             console.log(res.data);
//         })
//         .catch(err => {
//             // err信息错误码请参考API文档错误码描述
//             console.log(err);
//         });
// });
