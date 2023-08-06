"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugins = void 0;
class Plugins {
    constructor(name, description, version, otherinformation) {
        this.name = name;
        this.description = description;
        this.version = version;
        this.otherinformation = otherinformation;
        console.log("加载插件: " + this.name + "\n版本: " + this.version + "\n描述: " + this.description + "\n其他信息: " + JSON.stringify(this.otherinformation));
    }
}
exports.Plugins = Plugins;
//# sourceMappingURL=plugins.js.map