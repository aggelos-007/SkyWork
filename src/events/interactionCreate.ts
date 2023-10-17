import { Events, PermissionsBitField } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    code: async (client:any, interaction:any) => {
        if(client.bot.find((s:any) => s.token).disableDefaults) return;
        const slashes = client.commands.filter((cmd:any) => cmd.data.type == 'slash' && cmd.data.name == interaction.commandName)
        slashes.forEach((cmd:any) => {
            if(cmd.data.devOnly){
                if(!client.developers.some((d:any) => d.id.includes(client.author.id))) interaction.reply({content: ':x: You are not my developer!', ephemeral:true});
                else cmd.code(client, interaction)
            } else if(cmd.data.adminOnly) {
                if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) interaction.reply({content: ':x: You are not an Admin', ephemeral: true});
                else cmd.code(client, interaction)
            } else if(cmd.data.ownerOnly) {
                if(interaction.guild.ownerId != interaction.user.id) interaction.reply({content: ':x: You are not the server owner', ephemeral: true});
                else cmd.code(client, interaction)
            } else {
                cmd.code(client, interaction)
            }
        });

        const commands = client.commands.filter((cmd:any) => cmd.data.type == 'interaction')
        commands.forEach((cmd:any) => {
            cmd.code(client, interaction)
        });
    }
}