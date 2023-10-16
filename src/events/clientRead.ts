import { Events, ActivityType, REST, Routes } from 'discord.js';
import * as color from '../auxiliar/colors';


export default {
    name: Events.ClientReady,
    once: true,
    code: async (client:any) => {
        console.log(`${color.default.FrameWork} Client running as ${color.default.magenta + client.user.tag}`)
        
        const slashes: { options: any; name: any; name_localizations: any; description: any; description_localizations: any; default_permission: any; default_member_permissions: any; dm_permission: any; nsfw: any; }[] = []
        client.commands.filter((cmds: any) => cmds.data.type == "slash")
        .map((s:any) => s.data)
        .forEach((s:any) => {slashes.push({ options: s.options, name: s.name, name_localizations: s.name_localizations,description: s.description,description_localizations: s.description_localizations,default_permission: s.default_permission,default_member_permissions: s.default_member_permissions,dm_permission: s.dm_permission,nsfw: s.nsfw})})
        
        const rest = new REST().setToken(client.token);
        const data = await rest.put(
			Routes.applicationCommands(client.user.id),
			{ body: slashes },
		);
    }
}