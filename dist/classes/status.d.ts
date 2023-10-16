import { ActivityType } from "discord.js";
export interface SWStatus {
    text?: string;
    type?: ActivityType;
    status?: "online" | "idle" | "dnd" | "offline";
}
export declare class SkyStatus {
    constructor(bot: any, status: Array<SWStatus>, time: string);
}
//# sourceMappingURL=status.d.ts.map