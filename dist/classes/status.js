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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkyStatus = void 0;
const discord_js_1 = require("discord.js");
const ms_1 = __importDefault(require("ms"));
const colors = __importStar(require("../auxiliar/colors"));
class SkyStatus {
    constructor(bot, status, time) {
        bot.on(discord_js_1.Events.ClientReady, (client) => {
            let text = status[0]?.text?.replace("{guilds}", Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(client.guilds.cache.size));
            text = text?.replace("{members}", Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(client.users.cache.size));
            client.user.setPresence({ activities: [{ name: text, type: status[0].type }], status: status[0].status });
            console.log(`${colors.default.FrameWork} ${colors.default.blue}Status ${colors.default.white}have been successfully set!`);
            setInterval(() => {
                status.forEach((status, number) => {
                    let text = status.text.replace("{guilds}", Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(client.guilds.cache.size));
                    text = text.replace("{members}", Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(client.users.cache.size));
                    setTimeout(() => {
                        client.user.setPresence({
                            activities: [{
                                    name: text,
                                    type: status.type,
                                    url: status.url ?? undefined
                                }],
                            status: status.status
                        });
                    }, (0, ms_1.default)(time) * number);
                });
            }, (0, ms_1.default)(time) * status.length);
        });
    }
}
exports.SkyStatus = SkyStatus;
//# sourceMappingURL=status.js.map