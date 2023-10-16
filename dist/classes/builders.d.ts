declare class CommandBuilder {
    name?: string;
    aliases?: string[];
    description?: string;
    devOnly?: boolean;
    adminOnly?: boolean;
    alwaysExecutes?: boolean;
    disabled?: boolean;
    type?: string;
    setName(name: string): this;
    setAliases(aliases: string[]): this;
    setDescription(description: string): this;
    setDevOnly(): this;
    setAdminOnly(): this;
    alwaysExecute(): this;
    setDisabled(): this;
    setType(type: string): this;
}
export { CommandBuilder };
//# sourceMappingURL=builders.d.ts.map