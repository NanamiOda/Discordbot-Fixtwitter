/*

Edit Notes:
- Added a way to grab a users ID for a better response.
- Responses (twitter and pixiv) now @ the user that sent the message.
- Bot deletes its own message after 5 seconds.
- Formatted the file to look nicer.

*/


const { Client, Gateway, GatewayIntentBits } = require('discord.js');
require('dotenv/config');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  console.log('estoy ready')
})

client.on("messageCreate", (message) => {
  const user = message.author; // Users information
  
  if (message.content.startsWith('alo')) {
    message.reply('callao');
  }

  if (message.content.startsWith("+N")) { 
    const args = message.content.split(' ');
    const amount = parseInt(args[1]);

    if (isNaN(amount)) { // no amount given
      console.log("No messages have been deleted\n" + amount);
      message.channel.send(`<@${user.id}>` + ": No messages have been deleted as no number has been specified");
      function tooManyMessages() {
        return message.channel.bulkDelete(2)
          .catch((err) => {
            console.error(err);
          });
      }
      setTimeout(tooManyMessages, 5000);
    }

    else if (amount < 1 || amount > 11) { // There are too many or not enough messages to delete
      console.log(`${user.username}` + ": Too many messages were selected\n" + amount);
      message.channel.send(`<@${user.id}>` + " I cannot delete that many messages. Please set a number between **1 - 11**");
      function tooManyMessages() {
        return message.channel.bulkDelete(2)
          .catch((err) => {
            console.error(err);
          });
      }
      setTimeout(tooManyMessages, 5000);
    }

    else { // will delete the messages
      console.log(`${user.username}` + ': Messages deleted: "' + amount + '"')
      message.channel.send(`<@${user.id}>` + '\nAmount of messages that are going to be deleted: **' + amount + '**\nStandby for deletion...');
      function purgeMessages() {
        return message.channel.bulkDelete(amount + 2)
          .catch((err) => {
            console.error(err);
          });
      }
      setTimeout(purgeMessages, 5000);
    }
  }

  // Check if the message is a Twitter link
  if (message.content.startsWith("https://twitter.com")) {
    // Add the substring "vx" to the link
    const user = message.author; // Users information

    let link = message.content.replace("https://", "https://vx");
    if (link == message.content) {
      link = message.content.replace("/", "/vx");
    }

    // delete original message
    message.delete();

    // new link
    message.channel.send(`enviado por <@${user.id}>\n` + link);
  }

  else if (message.content.startsWith("https://fxtwitter.com")) {
    // Add the substring "vx" to the link
    const user = message.author; // Users information

    let linkvx = message.content.replace("https://fx", "https://vx");
    if (linkvx == message.content) {
      linkvx = message.content.replace("/", "/vx");
    }

    // new link
    message.channel.send(`enviado por <@${user.id}>\n` + linkvx);

  }

  else if (message.content.startsWith("https://www.pixiv.net")) {
    // Add the substring "fx" to the link
    const user = message.author;
    let linkfx = message.content.replace("https://www.pixiv.net", "https://www.fxpixiv.net");
    if (linkfx == message.content) {
      linkfx = message.content.replace("/", "/fx");
    }

    // delete original message
    message.delete();

    // send new link
    message.channel.send(`enviado por <@${user.id}>\n` + linkfx);

  }
});

client.login(process.env.TOKEN);
