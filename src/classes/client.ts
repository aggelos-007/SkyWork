import * as color from '../auxiliar/colors'
import { Client, Collection, ClientOptions, GatewayIntentBits, IntentsBitField, Partials } from 'discord.js';
import { eventLoader, commandLoader } from './loaders';

export interface SWClientOptions extends ClientOptions {
    token?: string,
    prefix?: string[],
    mobile?: boolean,
}

declare module 'discord.js' {
    interface Client {
        bot: Collection<string, any>;
    }
}

class SkyWork extends Client {
    public declare options: (Omit<ClientOptions, "intents" & "partials"> & { partials: Partials } & { intents: IntentsBitField }) & SWClientOptions
    public client: any
    
    constructor(options: SWClientOptions){
        super(options)
        let { token, intents, mobile, prefix, partials } = options;
        //Configuring djs client
        const client = new Client({
            intents: intents,
            partials: partials
        });
        this.client = client
        client.bot = new Collection()
        client.bot.set(token ?? '', options)
        console.log(color.default.white + 'Booting up...')
        client.login(token)
        console.log(`${color.default.FrameWork} Core is running...`)
    }
    config(name: string, options: object){
        this.client.config = new Collection()
        this.client.config.set(name, options)
    }
    async eventLoader(dir: string){
        new eventLoader(this.client, dir)
    }
    async commandLoader(dir: string){
        new commandLoader(this.client, dir)
    }
}

export { SkyWork }