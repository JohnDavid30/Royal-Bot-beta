const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const color = `GREEN`;
const {
  Client: DiscordClient,
  Collection,

  Message,
  Emoji,
  Guild,

  GuildEmoji,
  User,
  Channel,
  Role,
  GuildMember
} = require("discord.js");
module.exports = {
  name: "avatar",
  category: "misc",
  aliases: ["av"],
  usage: "avatar <user>",
  args: false,

  run: async (client, message, args) => {
    message.delete();
     const user =
        message.mentions.users.first() || message.author || message.guild.users.fetch(args[0])
    

    if (!user) {
      return message.channel.send(
        "<a:failed:798526823976796161> Unable to find this person!"
      );
    }
    let avatar = user.displayAvatarURL({ dynamic: true });
    // 4096 is the new biggest size of the avatar.
    // Enabling the dynamic, when the user avatar was animated/GIF, it will result as a GIF format.
    // If it's not animated, it will result as a normal image format.

    const embed = new Discord.MessageEmbed()
      .setTitle(`@${user.tag} avatar`)
      .setDescription(`**[Avatar URL of @${user.tag}](${avatar})**`)
      .setColor(color)
      .setImage(avatar);

    return message.channel.send(embed).then(m => m.delete({ timeout: 40000 }));
  }
};
