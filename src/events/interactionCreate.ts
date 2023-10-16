import { Events } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    code: async (client:any, interaction:any) => {
        const slashes = client.commands.filter((cmd:any) => cmd.data.type == 'slash' && cmd.data.name == interaction.commandName)
        slashes.forEach((cmd:any) => {
            const int = interaction
            cmd.code(client, int)
        });

        const commands = client.commands.filter((cmd:any) => cmd.data.type == 'interaction')
        commands.forEach((cmd:any) => {
            const int = interaction
            cmd.code(client, int)
        });
    }
}