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
        case "friend_recall":
            const PrivateDeleteMsg = {
                user_id: data.user_id,
                message_id: data.message_id
            };
            callback("onPrivateDeleteMsg", PrivateDeleteMsg);
            break;
        case "group_recall":
            const GroupDeleteMsg = {
                group_id: data.group_id,
                operator_id: data.operator_id,
                user_id: data.user_id,
                message_id: data.message_id,
            };
            callback("onGroupDeleteMsg", GroupDeleteMsg);
            break;
        case "group_increase":
            const GroupMenberAdd = {
                sub_type: data.sub_type,
                group_id: data.group_id,
                user_id: data.user_id,
                operator_id: data.operator_id
            };
            callback("onGroupMenberAdd", GroupMenberAdd);
            break;
        case "group_decrease":
            const GroupMenberDecrease = {
                sub_type: data.sub_type,
                group_id: data.group_id,
                operator_id: data.operator_id,
                user_id: data.user_id
            };
            callback("onGroupMenberDecrease", GroupMenberDecrease);
            break;
        case "group_admin":
            const GroupAdminChange = {
                user_id: data.user_id,
                group_id: data.group_id,
                sub_type: data.sub_type
            };
            callback("onGroupAdminChange", GroupAdminChange);
            break;
        case "group_upload":
            const GroupFileUpload = {
                group_id: data.group_id,
                file: data.file,
                user_id: data.user_id
            };
            callback("onGroupFileUpload", GroupFileUpload);
            break;
        case "group_ban":
            const GroupBan = {
                user_id: data.user_id,
                group_id: data.group_id,
                operator_id: data.operator_id,
                sub_type: data.sub_type,
                duration: data.duration
            };
            callback("onGroupBan", GroupBan);
            break;
        case "friend_add":
            const FriendAdd = {
                user_id: data.user_id,
            };
            callback("onFriendAdd", FriendAdd);
            break;
        case "notify":
            switch (data.sub_type) {
                case "poke":
                    const Notify = {
                        group_id: data.group_id,
                        target_id: data.target_id,
                        user_id: data.user_id,
                        sender_id: data.sender_id
                    };
                    callback("onNotify", Notify);
                    break;
                case "lucky_king":
                    const GroupRedbagLuckyKing = {
                        group_id: data.group_id,
                        user_id: data.user_id,
                        target_id: data.target_id
                    };
                    callback("onGroupRedbagLuckyKing", GroupRedbagLuckyKing);
                    break;
                case "honor":
                    const GroupMenberHonorChange = {
                        group_id: data.group_id,
                        user_id: data.user_id,
                        honor_type: data.honor_type
                    };
                    callback("onGroupMenberHonorChange", GroupMenberHonorChange);
                    break;
                case "title":
                    const GroupMenberTitleChange = {
                        group_id: data.group_id,
                        user_id: data.user_id,
                        title: data.title
                    };
                    callback("onGroupMenberTitleChange", GroupMenberTitleChange);
                    break;
            }
            break;
        case "group_card":
            const GroupCardChange = {
                group_id: data.group_id,
                user_id: data.user_id,
                card_new: data.card_new,
                card_old: data.card_old
            };
            callback("onGroupCardChange", GroupCardChange);
            break;
        case "offline_file":
            const ReceiveOfflineFile = {
                user_id: data.user_id,
                file: data.file
            };
            callback("onReceiveOfflineFile", ReceiveOfflineFile);
            break;
        case "client_status":
            const ClientStatusChange = {
                client: data.client,
                online: data.online,
            };
            callback("onClientStatusChange", ClientStatusChange);
            break;
        case "essencs":
            const EssenceMessageChange = {
                sender_id: data.sender_id,
                group_id: data.group_id,
                sub_type: data.sub_type,
                operator_id: data.operator_id,
                message_id: data.message_id,
            };
            callback("onEssenceMessageChange", EssenceMessageChange);
            break;
    }
};
exports.notice = notice;
const request = (data, callback) => {
    switch (data.request_type) {
        case "friend":
            const AddFriendRequest = {
                user_id: data.user_id,
                comment: data.comment,
                flag: data.flag
            };
            callback("onAddFriendRequest", AddFriendRequest);
            break;
        case "group":
            const AddGroupRequest = {
                group_id: data.group_id,
                user_id: data.user_id,
                comment: data.comment,
                flag: data.flag,
                sub_type: data.sub_type
            };
            callback("onAddGroupRequest", AddGroupRequest);
            break;
    }
};
const metaevent = (data, callback) => {
    switch (data.meta_event_type) {
        case "heartbeat":
            const HeartBeat = {
                status: data.status,
                interval: data.interval
            };
            callback("onHeartBeat", HeartBeat);
            break;
        case "lifecycle":
            const LifeCycle = {
                sub_type: data.sub_type
            };
            callback("onLifeCycle", LifeCycle);
            break;
    }
};
exports.default = (msg, callback) => {
    if (msg.post_type) {
        switch (msg.post_type) {
            case "message":
                message(msg, callback);
                break;
            case "notice":
                (0, exports.notice)(msg, callback);
                break;
            case "request":
                request(msg, callback);
                break;
            case "meta_event":
                metaevent(msg, callback);
                break;
        }
    }
    else if (msg.echo) {
        callback('echo', {
            uuid: msg.echo,
            data: msg.data
        });
    }
};
//# sourceMappingURL=data.js.map