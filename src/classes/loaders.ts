import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';
import * as color from '../auxiliar/colors';
import { cwd } from 'process';
import { Collection } from 'discord.js';

export class eventLoader {
    constructor(client: any, dir: string, defaultEvents?: boolean) {
        const eventsPath = cwd() + dir;
        const eventFiles = readdirSync(eventsPath).filter((file: any) => file.endsWith('.js'));
        const def = defaultEvents === true ? `${color.default.cyan}default ` : ''
		console.log(`${color.default.FrameWork} ╭ Loading ${def}${color.default.green}events${color.default.white}...`)
        for (const file of eventFiles) {
        	const filePath = join(eventsPath, file);
        	const event = require(filePath);
        	if (event.default.once) {
        		client.once(event.default.name, (...args: any) => event.default.code(client, ...args));
				console.log(`${color.default.FrameWork} ├ Loaded ${color.default.blue + file + color.default.white} for ${color.default.red + 'once'}`)
        	} else {
        		client.on(event.default.name, (...args: any) => event.default.code(client, ...args));
				console.log(`${color.default.FrameWork} ├ Loaded ${color.default.blue + file + color.default.white}`)
        	}
        }
		console.log(`${color.default.FrameWork} ╰ Events ${color.default.green}Loaded`)
    }
}

export class commandLoader {
    private client
    constructor(client: any, dir: string) {
        this.client = client;
		client.commands = new Collection();
        console.log(`${color.default.FrameWork} ╭ Loading ${color.default.green}commands${color.default.white}...`)
        this.#load(dir).then(() => console.log(`${color.default.FrameWork} ╰ Commands ${color.default.green}Loaded`));
    }

    async #load(dir: string) {
		const root = process.cwd(), files = readdirSync(join(root, dir));
        for (const file of files) {
			if (lstatSync(join(root, dir, file)).isDirectory()) { await this.#load(join(dir, file)); continue; }
            const command = require(join(root, dir, file));
            if (!command) continue;
            if(command.data){
                if(command.code && command.data.name || command.data.alwaysExecute){
                    command.directory = dir
                    this.client.commands.set(`${dir}/${file}`, command);
                    console.log(`${color.default.FrameWork} ├ Loaded ${color.default.blue + file + color.default.white}`)
                } else {console.log(`${color.default.FrameWork + color.default.red} ├ Failed to load ${color.default.blue + file + color.default.red} missing ${color.default.blue}data options`)}
            } else {console.log(`${color.default.FrameWork + color.default.red} ├ Failed to load ${color.default.blue + file + color.default.red} missing ${color.default.blue}data ${color.default.red + 'or' +color.default.blue} code ${color.default.red}field(s)`)}
        }
    }
}