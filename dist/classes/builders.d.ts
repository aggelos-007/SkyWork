import { SlashCommandBuilder } from "discord.js";
export declare class SlashBuilder extends SlashCommandBuilder {
    devOnly?: boolean;
    adminOnly?: boolean;
    ownerOnly?: boolean;
    disabled?: boolean;
    type: string;
    setDevOnly(): this;
    setAdminOnly(): this;
    setOwnerOnly(): this;
    setDisabled(): this;
}
export declare class CommandBuilder {
    name?: string;
    aliases?: string[];
    description?: string;
    devOnly?: boolean;
    adminOnly?: boolean;
    ownerOnly?: boolean;
    alwaysExecutes?: boolean;
    disabled?: boolean;
    type?: string;
    setName(name: string): this;
    setAliases(aliases: string[]): this;
    setDescription(description: string): this;
    setDevOnly(): this;
    setAdminOnly(): this;
    setOwnerOnly(): this;
    alwaysExecute(): this;
    setDisabled(): this;
    setType(type: string): this;
}
//# sourceMappingURL=builders.d.ts.map