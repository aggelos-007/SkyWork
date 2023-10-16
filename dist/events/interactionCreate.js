"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    code: async (client, interaction) => {
        const slashes = client.commands.filter((cmd) => cmd.data.type == 'slash' && cmd.data.name == interaction.commandName);
        slashes.forEach((cmd) => {
            const int = interaction;
            cmd.code(client, int);
        });
        const commands = client.commands.filter((cmd) => cmd.data.type == 'interaction');
        commands.forEach((cmd) => {
            const int = interaction;
            cmd.code(client, int);
        });
    }
};
//# sourceMappingURL=interactionCreate.js.map