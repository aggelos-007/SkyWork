import { Events, PermissionsBitField } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    code: async (client:any, interaction:any) => {
        const slashes = client.commands.filter((cmd:any) => cmd.data.type == 'slash' && cmd.data.name == interaction.commandName)
        slashes.forEach((cmd:any) => {
            const int = interaction
            if(cmd.data.devOnly == true){
                if(!client.developers.some((d:any) => d.id.includes(client.author.id))) interaction.reply({content: ':x: You are not my developer!', ephemeral:true});
                else cmd.code(client, int)
            } else if(cmd.data.adminOnly == true) {
                if(!int.member.permissions.has(PermissionsBitField.Flags.Administrator)) interaction.reply({content: ':x: You are not an Admin', ephemeral: true});
                else cmd.code(client, int)
            } else if(cmd.data.ownerOnly == true) {
                if(int.guild.ownerId != int.author.id) interaction.reply({content: ':x: You are not the server owner', ephemeral: true});
                else cmd.code(client, int)
            } else {
                cmd.code(client, int)
            }
        });

        const commands = client.commands.filter((cmd:any) => cmd.data.type == 'interaction')
        commands.forEach((cmd:any) => {
            const int = interaction
            cmd.code(client, int)
        });
    }
}