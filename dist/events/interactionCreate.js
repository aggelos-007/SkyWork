"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    code: async (client, interaction) => {
        const slashes = client.commands.filter((cmd) => cmd.data.type == 'slash' && cmd.data.name == interaction.commandName);
        slashes.forEach((cmd) => {
            const int = interaction;
            if (cmd.data.devOnly == true) {
                if (!client.developers.some((d) => d.id.includes(client.author.id)))
                    interaction.reply({ content: ':x: You are not my developer!', ephemeral: true });
                else
                    cmd.code(client, int);
            }
            else if (cmd.data.adminOnly == true) {
                if (!int.member.permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator))
                    interaction.reply({ content: ':x: You are not an Admin', ephemeral: true });
                else
                    cmd.code(client, int);
            }
            else if (cmd.data.ownerOnly == true) {
                if (int.guild.ownerId != int.author.id)
                    interaction.reply({ content: ':x: You are not the server owner', ephemeral: true });
                else
                    cmd.code(client, int);
            }
            else {
                cmd.code(client, int);
            }
        });
        const commands = client.commands.filter((cmd) => cmd.data.type == 'interaction');
        commands.forEach((cmd) => {
            const int = interaction;
            cmd.code(client, int);
        });
    }
};
//# sourceMappingURL=interactionCreate.js.map