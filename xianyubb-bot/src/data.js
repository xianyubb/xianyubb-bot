"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = (msg, callback) => {
    switch (msg.post_type) {
        case "message":
            message(msg, callback);
            break;
        case "notice":
    }
};
//# sourceMappingURL=data.js.map