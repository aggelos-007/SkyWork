"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const color = __importStar(require("../auxiliar/colors"));
exports.default = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    code: async (client) => {
        console.log(`${color.default.FrameWork} Client running as ${color.default.magenta + client.user.tag}`);
        const slashes = [];
        client.commands.filter((cmds) => cmds.data.type == "slash")
            .map((s) => s.data)
            .forEach((s) => { slashes.push({ options: s.options, name: s.name, name_localizations: s.name_localizations, description: s.description, description_localizations: s.description_localizations, default_permission: s.default_permission, default_member_permissions: s.default_member_permissions, dm_permission: s.dm_permission, nsfw: s.nsfw }); });
        const rest = new discord_js_1.REST().setToken(client.token);
        const data = await rest.put(discord_js_1.Routes.applicationCommands(client.user.id), { body: slashes });
    }
};
//# sourceMappingURL=clientReady.js.map