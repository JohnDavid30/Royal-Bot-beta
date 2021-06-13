const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setchannel",
  category: "settings",
  args: true,
  usage: "setchannel <key //welcome/leave/report/level/modlog/chat-bot/starboard> <channel>",
  description: "Set the channel",
  bot: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  author: 'VIEW_CHANNEL'||'EMBED_LINKS'||'ATTACH_FILES'||'MANAGE_CHANNELS'||'MANAGE_GUILD',
 run: (client, message, args) => {
    const channel = message.mentions.channels.first();
    const [key, ...value] = args;
    switch (key) {
      default:
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setFooter(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true }) ||
                client.user.displayAvatarURL({ dynamic: true })
            )
            .setDescription("Error: Invalid Key provided, Please try again.")
        );
      case "leave":
        {
          if (!channel) {
            return message.channel.send(
              `${client.emotes.error}Pls Give Invalid channel... Try again...`
            );
          }
          db.set(`levchannel_${message.guild.id}`, channel.id);
          const leave = new Discord.MessageEmbed()
            .setDescription(
              `**Done** From now on I will send welcome message in ${channel} when someone leaves the server`
            )
            .setColor("RED");
          message.channel.send(leave);
        }
        break;
      case "chat-bot":
        {
          if (!channel) {
            return message.channel.send(
              `${client.emotes.error}Pls Give Invalid channel... Try again...`
            );
          }
          db.set(`chatbot_${message.guild.id}`, channel.id);
          const chat = new Discord.MessageEmbed()
            .setDescription(
              `**Done** From now on I will send Chatbot in ${channel}`
            )
            .setColor("RED");
          message.channel.send(chat);
        }
        break;
      case "starboard":
        {
          if (!channel) {
            return message.channel.send(
              `${client.emotes.error}Pls Give Invalid channel... Try again...`
            );
          }
          db.set(`handleStarboard_${message.guild.id}`, channel.id);
          const chat = new Discord.MessageEmbed()
            .setDescription(
              `**Done** From now on I will send Starboard in ${channel}`
            )
            .setColor("RED");
          message.channel.send(chat);
        }
        break;
      case "welcome":
        {
          if (!channel) {
            return message.channel.send(
              `${client.emotes.error}Pls Give Invalid channel... Try again...`
            );
          }
          db.set(`welchannel_${message.guild.id}`, channel.id);
          const welcome = new Discord.MessageEmbed()
            .setDescription(
              `**Done** From now on I will send welcome message in ${channel} when someone joins the server`
            )
            .setColor("RED");
          message.channel.send(welcome);
        }

        break;
      case "report":
        {
          if (!channel) {
            return message.channel.send(
              `${client.emotes.error}Pls Give Invalid channel... Try again...`
            );
          }
          db.set(`reports_${message.guild.id}`, channel.id);
          const welcome = new Discord.MessageEmbed()
            .setDescription(
              `**Done** From now on I will send reports member in ${channel}`
            )
            .setColor("RED");
          message.channel.send(welcome);
        }

        break;
      case "level":
        {
          if (!channel) {
            return message.channel.send(
              `${client.emotes.error}Pls Give Invalid channel... Try again...`
            );
          }
          db.set(`levelch_${message.guild.id}`, channel.id);
          const welcome = new Discord.MessageEmbed()
            .setDescription(
              `**Done** From now on I will send level up in ${channel}`
            )
            .setColor("RED");
          message.channel.send(welcome);
        }
        break;
      case "modlog": {
        const bot = client;
        if (!args[0]) {
          let b = db.fetch(`modlog_${message.guild.id}`);
          let channelName = message.guild.channels.cache.get(b);
          if (message.guild.channels.cache.has(b)) {
            return message.channel.send(
              `**Modlog Channel Set In This Server Is \`${channelName.name}\`!**`
            );
          } else
            return message.channel.send(
              "**Please Enter A Channel Name or ID To Set!**"
            );
        }
        let channel =
          message.mentions.channels.first() ||
          bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
          message.guild.channels.cache.find(
            c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
          );

        if (!channel || channel.type !== "text")
          return message.channel.send("**Please Enter A Valid Text Channel!**");

        try {
          let a = db.fetch(`modlog_${message.guild.id}`);

          if (channel.id === a) {
            return message.channel.send(
              "**This Channel is Already Set As Modlog Channel!**"
            );
          } else {
            bot.guilds.cache
              .get(message.guild.id)
              .channels.cache.get(channel.id)
              .send("**Modlog Channel Set!**");
            db.set(`modlog_${message.guild.id}`, channel.id);

            message.channel.send(
              `**Modlog Channel Has Been Set Successfully in \`${channel.name}\`!**`
            );
          }
        } catch {
          return message.channel.send(
            "**Error - `Missing Permissions Or Channel Is Not A Text Channel!`**"
          );
        }
      }
    }
  }
};
