"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    name: discord_js_1.Events.MessageCreate,
    code: async (client, message) => {
        if (client.bot.find((s) => s.token).disableDefaults)
            return;
        let bot = client.bot.get(client.token);
        let prefix = bot.prefix;
        let multiprefix = bot.multiprefix;
        if (message.author.id == client.user.id)
            return;
        const args = message.content.trim().split(/ +/);
        let elargs = args.shift().toLowerCase();
        const found_prefix = (multiprefix?.length ? multiprefix.find((x) => elargs.startsWith(x)) : null) || (elargs.startsWith(prefix) ? prefix : null);
        if (!found_prefix) {
            const commands = client.commands.filter((cmds) => cmds.data.alwaysExecute == true);
            if (!commands)
                return;
            commands.forEach((cmd) => {
                if (cmd.data.alwaysExecute) {
                    cmd.code(client, message);
                }
            });
        }
        else {
            elargs = elargs.slice(found_prefix.length);
            const command = client.commands.filter((cmds) => cmds.data.type == undefined);
            const commands = command.filter((cmds) => cmds.data.name == elargs || cmds.data.aliases && cmds.data.aliases.includes(elargs) || cmds.data.alwaysExecute == true);
            if (!commands)
                return;
            commands.forEach((cmd) => {
                if (cmd.data.alwaysExecute == true) {
                    cmd.code(client, message);
                }
                else {
                    if (cmd.data.disabled || message.author.bot || message.channel.type == discord_js_1.ChannelType.DM)
                        return;
                    if (cmd.data.devOnly == true) {
                        if (!bot.developers.some((d) => d.id.includes(message.author.id)))
                            message.reply(':x: You are not my developer!').then((s) => setTimeout(() => s.delete().catch((err) => err), 5000));
                        else
                            cmd.code(client, message, args);
                    }
                    else if (cmd.data.adminOnly == true) {
                        if (!message.member.permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator))
                            message.reply(':x: You are not an Admin').then((s) => setTimeout(() => s.delete().catch((err) => err), 5000));
                        else
                            cmd.code(client, message, args);
                    }
                    else if (cmd.data.ownerOnly == true) {
                        if (message.guild.ownerId != message.author.id)
                            message.reply(':x: You are not the server owner').then((s) => setTimeout(() => s.delete().catch((err) => err), 5000));
                        else
                            cmd.code(client, message, args);
                    }
                    else {
                        cmd.code(client, message, args);
                    }
                }
            });
        }
    }
};
//# sourceMappingURL=messageCreate.js.map