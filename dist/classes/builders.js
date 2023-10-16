"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBuilder = exports.SlashBuilder = void 0;
const discord_js_1 = require("discord.js");
class SlashBuilder extends discord_js_1.SlashCommandBuilder {
    devOnly;
    adminOnly;
    ownerOnly;
    type = "slash";
    setDevOnly() {
        this.devOnly = true;
        return this;
    }
    setAdminOnly() {
        this.adminOnly = true;
        return this;
    }
    setOwnerOnly() {
        this.ownerOnly = true;
        return this;
    }
}
exports.SlashBuilder = SlashBuilder;
class CommandBuilder {
    name;
    aliases;
    description;
    devOnly;
    adminOnly;
    ownerOnly;
    alwaysExecutes;
    disabled;
    type;
    setName(name) {
        this.name = name;
        return this;
    }
    setAliases(aliases) {
        this.aliases = aliases;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setDevOnly() {
        this.devOnly = true;
        return this;
    }
    setAdminOnly() {
        this.adminOnly = true;
        return this;
    }
    setOwnerOnly() {
        this.ownerOnly = true;
        return this;
    }
    alwaysExecute() {
        this.alwaysExecutes = true;
        return this;
    }
    setDisabled() {
        this.disabled = true;
        return this;
    }
    setType(type) {
        this.type = type;
        return this;
    }
}
exports.CommandBuilder = CommandBuilder;
//# sourceMappingURL=builders.js.map