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
exports.commandLoader = exports.eventLoader = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const color = __importStar(require("../auxiliar/colors"));
const discord_js_1 = require("discord.js");
class eventLoader {
    constructor(client, dir, defaultEvents) {
        const eventsPath = dir;
        const eventFiles = (0, fs_1.readdirSync)(eventsPath).filter((file) => file.endsWith('.js'));
        const def = defaultEvents === true ? `${color.default.cyan}default ` : '';
        console.log(`${color.default.FrameWork} ╭ Loading ${def}${color.default.green}events${color.default.white}...`);
        for (const file of eventFiles) {
            const filePath = (0, path_1.join)(eventsPath, file);
            const event = require(filePath);
            if (event.default.once) {
                client.once(event.default.name, (...args) => event.default.code(client, ...args));
                console.log(`${color.default.FrameWork} ├ Loaded ${color.default.blue + file + color.default.white} for ${color.default.red + 'once'}`);
            }
            else {
                client.on(event.default.name, (...args) => event.default.code(client, ...args));
                console.log(`${color.default.FrameWork} ├ Loaded ${color.default.blue + file + color.default.white}`);
            }
        }
        console.log(`${color.default.FrameWork} ╰ Events ${color.default.green}Loaded`);
    }
}
exports.eventLoader = eventLoader;
class commandLoader {
    client;
    constructor(client, dir) {
        this.client = client;
        client.commands = new discord_js_1.Collection();
        console.log(`${color.default.FrameWork} ╭ Loading ${color.default.green}commands${color.default.white}...`);
        this.#load(dir).then(() => console.log(`${color.default.FrameWork} ╰ Commands ${color.default.green}Loaded`));
    }
    async #load(dir) {
        const root = process.cwd(), files = (0, fs_1.readdirSync)((0, path_1.join)(root, dir));
        for (const file of files) {
            if ((0, fs_1.lstatSync)((0, path_1.join)(root, dir, file)).isDirectory()) {
                await this.#load((0, path_1.join)(dir, file));
                continue;
            }
            const command = require((0, path_1.join)(root, dir, file));
            if (!command)
                continue;
            if (command.data) {
                if (command.code && command.data.name || command.data.alwaysExecute) {
                    command.directory = dir;
                    this.client.commands.set(`${dir}/${file}`, command);
                    console.log(`${color.default.FrameWork} ├ Loaded ${color.default.blue + file + color.default.white}`);
                }
                else {
                    console.log(`${color.default.FrameWork + color.default.red} ├ Failed to load ${color.default.blue + file + color.default.red} missing ${color.default.blue}data options`);
                }
            }
            else {
                console.log(`${color.default.FrameWork + color.default.red} ├ Failed to load ${color.default.blue + file + color.default.red} missing ${color.default.blue}data ${color.default.red + 'or' + color.default.blue} code ${color.default.red}field(s)`);
            }
        }
    }
}
exports.commandLoader = commandLoader;
//# sourceMappingURL=loaders.js.map