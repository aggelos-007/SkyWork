import { Client, Collection, ClientOptions, IntentsBitField, Partials } from 'discord.js';
import { SWStatus } from './status';
export interface SWClientOptions extends ClientOptions {
    token?: string;
    prefix?: string[];
}
declare module 'discord.js' {
    interface Client {
        bot: Collection<string, any>;
        config: Collection<string, any>;
    }
}
export declare class SkyWork {
    options: (Omit<ClientOptions, "intents" & "partials"> & {
        partials: Partials;
    } & {
        intents: IntentsBitField;
    }) & SWClientOptions;
    client: Client;
    constructor(options: SWClientOptions);
    config(name: string, options: object): void;
    eventLoader(dir: string): void;
    commandLoader(dir: string): void;
    clientStatus(status: Array<SWStatus>, time: string): void;
}
//# sourceMappingURL=client.d.ts.map