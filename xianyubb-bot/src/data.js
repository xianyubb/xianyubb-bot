"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notice = void 0;
const message = (data, callback) => {
    switch (data.message_type) {
        case "group":
            const GroupMessage = {
                message_id: data.message_id,
                sub_type: data.sub_type,
                font: data.font,
                user_id: data.user_id,
                message: data.message,
                group_id: data.group_id,
                raw_message: data.raw_message,
                sender: data.sender,
                anonymous: data.anonymous,
                target_id: data.target_id,
            };
            callback("onReceiveGroupMessage", GroupMessage);
            break;
        case "private":
            const PrivateMessage = {
                user_id: data.user_id,
                sub_type: data.sub_type,
                message_id: data.message_id,
                message: data.message,
                raw_message: data.raw_message,
                font: data.font,
                sender: data.sender,
                target_id: data.target_id
            };
            callback("onReceivePrivateMessage", PrivateMessage);
            break;
    }
};
const notice = (data, callback) => {
    switch (data.notice_type) {
        case "group_increase":
            const GroupMenberAdd = {
                sub_type: data.sub_type,
                group_id: data.group_id,
                user_id: data.user_id,
                operator_id: data.operator_id
            };
            return callback("onGroupMenberAdd", GroupMenberAdd);
    }
};
exports.notice = notice;
// request消息
exports.default = (msg, callback) => {
    switch (msg.post_type) {
        case "message":
            message(msg, callback);
            break;
        case "notice":
            (0, exports.notice)(msg, callback);
            break;
    }
};
//# sourceMappingURL=data.js.map