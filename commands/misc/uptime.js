const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "uptime",

  aliases: ["uptime"],

  usage: "uptime",

  category: "info",

  description: "Get advance stats of given person or yourself",

  run: async (client, message, args) => {
    message.delete();
    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let sunday = Math.floor(days / 7);
    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    sunday %= 7;
    const u = message.mentions.members.first();
    const us = message.guild.members.fetch(client.user.id);
    const ddi = `743068965047238677`;
    const uptime = new MessageEmbed()
      .setTitle(
        "⏱️ TIME BOT ONLINE ⏱️"
      )
      .setDescription(
        `✅ <@${ddi}> : 
\`Second: ${seconds}
Minutes: ${minutes}
Hours: ${hours}
day: ${days}\``
      )
      .setColor("GREEN")
      .setTimestamp();
    return message.channel.send(uptime);
  }
};
