"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBuilder = void 0;
class CommandBuilder {
    name;
    aliases;
    description;
    devOnly;
    adminOnly;
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