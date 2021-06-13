const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "botlist",
  category: "admin",
  cooldown: 5,
  run: async (client, message, args) => {
    let checked = client.emotes.on;
    let unchecked = client.emotes.off;

    const allbots = message.guild.members.cache
      .filter(m => m.user.bot)
      .map(m => m)
      .map(m => `${m.user.flags ? checked : unchecked} ${m.user.tag} (${m.id})`)
      .join("\n");

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(allbots)
      .setFooter(client.user.tag, client.user.displayAvatarURL())
      .setTimestamp();
    message.channel.send(embed);
  }
};
