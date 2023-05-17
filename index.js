const { Client, Gateway, GatewayIntentBits} = require('discord.js')
require('dotenv/config')


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})

client.on('ready', () => {
    console.log('estoy redy')
})


client.on('messageCreate',message => {
    if (message.content === 'alo'){
        message.reply('callao')
    }
})



client.on('messageCreate', message => {
    if (message.content.startsWith('+N')) {
    
        // get number of messages to delete
        const args = message.content.split(' ');
        const amount = parseInt(args[1]);
    
        // Check if a valid amount was provided
        if (isNaN(amount)) {
          return message.channel.send('its not vaild');
        } else if (amount < 1 || amount > 11) {
          return message.channel.send('you cant delete more than 11 messages');
        }
        // delete messages
        message.channel.bulkDelete(amount);

        message.channel.send('delete ' + amount + ' messages');
      }
    });


    client.on("messageCreate", (message) => {
      // Check if the message is a Twitter link
      if (message.content.startsWith("https://twitter.com")) {
        // Add the substring "vx" to the link
        const authorname = message.author.username;
        let link = message.content.replace("https://", "https://vx");
        if (link == message.content) {
          link = message.content.replace("/", "/vx");
        }
    
        // delete original message
        message.delete();
    
        // new link
        message.channel.send(`enviado por ${authorname}\n`+link);


      } else if (message.content.startsWith("https://fxtwitter.com")) {
        // Add the substring "vx" to the link
        const authorname = message.author.username;
        let linkvx = message.content.replace("https://fx", "https://vx");
        if (linkvx == message.content) {
          linkvx = message.content.replace("/", "/vx");
        }

        // new link
        message.channel.send(`enviado por ${authorname}\n`+linkvx);

        } else if (message.content.startsWith("https://www.pixiv.net")) {
          // Add the substring "fx" to the link
          const authorname = message.author.username;
          let linkfx = message.content.replace("https://www.pixiv.net", "https://www.fxpixiv.net");
          if (linkfx == message.content) {
            linkfx = message.content.replace("/", "/fx");
          }
    
        // delete original message
        message.delete();
    
        // send new link
        message.channel.send(`enviado por ${authorname}\n`+linkfx);

      }
    });

client.login(process.env.TOKEN)
