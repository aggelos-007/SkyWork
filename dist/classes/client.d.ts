import { Client, Collection, ClientOptions, IntentsBitField, Partials } from 'discord.js';
export interface SWClientOptions extends ClientOptions {
    token?: string;
    prefix?: string[];
    mobile?: boolean;
}
declare module 'discord.js' {
    interface Client {
        bot: Collection<string, any>;
    }
}
declare class SkyWork extends Client {
    options: (Omit<ClientOptions, "intents" & "partials"> & {
        partials: Partials;
    } & {
        intents: IntentsBitField;
    }) & SWClientOptions;
    client: any;
    constructor(options: SWClientOptions);
    config(name: string, options: object): void;
    eventLoader(dir: string): Promise<void>;
    commandLoader(dir: string): Promise<void>;
}
export { SkyWork };
//# sourceMappingURL=client.d.ts.map