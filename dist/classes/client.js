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
exports.SkyWork = void 0;
const color = __importStar(require("../auxiliar/colors"));
const discord_js_1 = require("discord.js");
const loaders_1 = require("./loaders");
const process_1 = require("process");
class SkyWork extends discord_js_1.Client {
    client;
    constructor(options) {
        super(options);
        let { token, intents, mobile, prefix, partials } = options;
        //Configuring djs client
        const client = new discord_js_1.Client({
            intents: intents,
            partials: partials
        });
        this.client = client;
        client.bot = new discord_js_1.Collection();
        client.bot.set(token ?? '', options);
        console.log(color.default.white + 'Booting up...');
        new loaders_1.eventLoader(client, (0, process_1.cwd)() + '/node_modules/SkyWork/dist/events');
        client.login(token);
        console.log(`${color.default.FrameWork} Core is running...`);
    }
    config(name, options) {
        this.client.config = new discord_js_1.Collection();
        this.client.config.set(name, options);
    }
    async eventLoader(dir) {
        new loaders_1.eventLoader(this.client, dir);
    }
    async commandLoader(dir) {
        new loaders_1.commandLoader(this.client, dir);
    }
}
exports.SkyWork = SkyWork;
//# sourceMappingURL=client.js.map