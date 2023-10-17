"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    code: async (client, interaction) => {
        if (client.bot.find((s) => s.token).disableDefaults)
            return;
        const slashes = client.commands.filter((cmd) => cmd.data.type == 'slash' && cmd.data.name == interaction.commandName);
        slashes.forEach((cmd) => {
            if (cmd.data.devOnly == true) {
                if (!client.developers.some((d) => d.id.includes(client.author.id)))
                    interaction.reply({ content: ':x: You are not my developer!', ephemeral: true });
                else
                    cmd.code(client, interaction);
            }
            else if (cmd.data.adminOnly == true) {
                if (!interaction.member.permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator))
                    interaction.reply({ content: ':x: You are not an Admin', ephemeral: true });
                else
                    cmd.code(client, interaction);
            }
            else if (cmd.data.ownerOnly == true) {
                if (interaction.guild.ownerId != interaction.user.id)
                    interaction.reply({ content: ':x: You are not the server owner', ephemeral: true });
                else
                    cmd.code(client, interaction);
            }
            else {
                cmd.code(client, interaction);
            }
        });
        const commands = client.commands.filter((cmd) => cmd.data.type == 'interaction');
        commands.forEach((cmd) => {
            cmd.code(client, interaction);
        });
    }
};
//# sourceMappingURL=interactionCreate.js.map