# SkyWork
SkyWork is a framework which helps you build both slash and prefix commands with ease and it doesn't even need to make events as you can use default ones! It is the best way to make commands  for your bots, easy way to add status and handle easier the commands.
## Navigation
- [Home](https://github.com/aggelos-007/SkyWork#skywork)
- [Installation](https://github.com/aggelos-007/SkyWork#installation)
- [Initializing client](https://github.com/aggelos-007/SkyWork)
- [Creating Commands](https://github.com/aggelos-007/SkyWork#creating-commands)
    1. [Prefix](https://github.com/aggelos-007/SkyWork#prefix-commands)
    2. [Slash](https://github.com/aggelos-007/SkyWork#slash-commands)
    3. [Extras](https://github.com/aggelos-007/SkyWork#extra-fields)
- [Adding Status](https://github.com/aggelos-007/SkyWork#client-status)
- [Custom events](https://github.com/aggelos-007/SkyWork#client-status)
    - [Disable Default Events](https://github.com/aggelos-007/SkyWork#remove-default-events)

## Installation
Make sure that you've installed **node.js**, and it's version `v16.x` or above. Once done, open your folder ( from any IDE or Terminal ) and run this script:
```bash
npm i github:aggelos-007/SkyWork discord.js
```
## Making your bot
This section will guide you in initializing a client, creating commands and logging into your bot client.
### Initializing client
It's as simple as stealing a candy from a kid.
You'll have to write the following code to initialize a  basic bot client, in a `index.js` file:
```js
const { SkyWork } = require('skywork')

const client = new SkyWork({
    token: 'TOKEN',
    intents: [ "Intents from discord.js" ], // you have to add the intents manually
    partials: [ Partials ],
    prefix: 'PREFIX', // or prefix: ['prefix1', 'prefix2' etc.]
    developers: ['Your ID here'] // you can add more ID(s) by doing developers: ['ID1', 'ID2' etc.]
})
```
### Creating commands
How do you make commands? You'll have to load them first by adding this line in your code
```js
client.commandLoader('/commands')
```
Now that you've loaded commands, you've got to create a folder named `commands` you've to create a command. Now commands are of two types:
1. Prefix
2. Slash

#### Prefix commands
To create an example prefix command you will have to write the following code in a `ping_prefix.js` file:
```js
const { CommandBuilder } = require("skywork")

module.exports = {
    data: new CommandBuilder().setName('ping').setDescription('An example ping command to see how to create prefix commands'),
    code: async (client, msg) => { // or async (client, message)
        msg.reply(`Pong! ${client.ws.ping}ms`)
    }
}
```

#### Slash commands
To create an example slash command you will have to write the following code in a `ping_slash.js` file:
```js
const { SlashBuilder } = require("skywork")
//works like SlashCommandBuilder from discord.js
module.exports = {
    data: new SlashBuilder().setName('ping').setDescription('An example ping command to see how to create slash commands'),
    code: async (client, int) => { // or async (client, interaction)
        int.reply(`Pong! ${client.ws.ping}ms`)
    }
}
```
#### Extra fields
So you can add some extra fields **prefix** command builders that will make your life easier than laughing when you see a funny meme.
```js
new CommandBuilder()
.setName(name)
.setAliases([aliases]) //an array of aliases for the command to run
.setDescription(description) // optional but you can make mapped commands with this
.setDevOnly() //Dev only commands
.setAdminOnly() //Admin only commands
.setOwnerOnly() //Server owner only commands
.setDisabled() //In case you don't want to delete the command but you don't want anyone to use it also
```
There are some other ways:
```js
//AlwaysExecute commands
new CommandBuilder().alwaysExecute()
//Interaction commands
new CommandBuilder().setType('interaction')
```
For slash commands the fields are the same as discord.js slash builder **but** it has some optional fields and you **can** run code with it directly in the same file.
```js
new SlashBuilder()
.setDevOnly()
.setAdminOnly()
.setOwnerOnly()
```

### Client status
Adding status using SkyWork is super easy. You just have to write this little peice of code in your main file ( eg. `main.js` ):
```js
client.clientStatus("an array of the below json", "Time")
{
  text: "text", // available: ["{members}", "guilds"]
  type: ActivityType,
  status: "status" // available: "online"/"offline"/"dnd"/"idle"
}
```

#### Example
```js
const { ActivityType } = require('discord.js')

client.clientStatus([{
  text: "{members} members and {guilds} guilds",
  type: ActivityType.Watching,
  status: "idle"
}], "15s")
```
<br>

### Client events
Using SkyWork you can add your own custom events. You can use them in your bot by creating a folder named `events` in your directory and adding events in it.
To load the events write the following line of code in your main file ( eg. `main.js` )
To add your own custom events you have to assign them with this
```js
client.eventLoader("/events")
``` 
And then creating files inside the `events` folder likes this 
```js
const { Events } = require('discord.js');

module.exports =  {
    name: Events.ClientReady,
    once: true,
    code: async (client) => {
        console.log(`Client read at ${client.user.tag}`)
    }
}
```
#### Remove default events
To remove default events just go to your SkyWork client and add this field
```js
const { SkyWork } = require('skywork')

const client = new SkyWork({
    ...,
    disableDefaults: true
})
```
# Thanks
Thank you so much for reading it till the very end. You can contribute to this project by opening a pull request!
