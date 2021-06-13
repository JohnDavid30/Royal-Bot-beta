const Discord = require("discord.js");
const canvacord = require("canvacord");
const toHex = require("colornames");
const db = require("quick.db");
module.exports = {
  name: "level",
  aliases: ["lvl", "rank"],
  description: "Get the level of Author or Mentioned",
  usage: "level [user]",
  category: "misc",
  bot: ["MANAGE_GUILD"],
  run: (client, message, args) => {
    let user;
    if (!args.length) {
      // Display info about the calling user
      user = message.guild.member(message.author);
    } else {
      // Display info about the user specified by the first argument
      user = message.guild.member(message.mentions.members.first());
    }
    if (!user) {
      return message.channel.send(":x: Unable to find this person!");
    }
    let m = user;
    let image = db.get(`levelimg_${message.guild.id}`);
    var level = db.get(`guild_${message.guild.id}_level_${user.user.id}`) || 0;
    const coins = db
      .all()
      .filter(data => data.ID.startsWith(`guild_${message.guild.id}_xp_`))
      .sort((a, b) => b.data - a.data);
    let myrank =
      coins
        .map(m => m.ID)
        .indexOf(`guild_${message.guild.id}_level_${message.author.id}`) + 1 ||
      "N/A";
    let xp = db.get(`guild_${message.guild.id}_xp_${user.user.id}`) || 0;
    var xpNeeded = level * 100;
    let every = db
      .all()
      .filter(i => i.ID.startsWith(`guild_${message.guild.id}_xptotal_`))
      .sort((a, b) => b.data - a.data);
    var rank =
      every
        .map(x => x.ID)
        .indexOf(`guild_${message.guild.id}_xptotal_${user.user.id}`) + 1;
    if (user.id === client.user.id) {
      return message.channel.send(":wink: | I am on level 100");
    }
    if (user.user.bot) {
      return message.channel.send("Bot do not have levels");
    }
    let color = m.user.displayHexColor;

    if (color == "#000000") color = m.user.hoistRole.hexColor;
    const rak = new canvacord.Rank()

      .setAvatar(user.user.displayAvatarURL({ format: "png" }))
      .setCurrentXP(xp)
      .setRequiredXP(xpNeeded || 100)
      .setStatus(user.user.presence.status)
      .setProgressBar("#00FFFF", "COLOR")
      .setUsername(user.user.username, color)
      .setDiscriminator(user.user.discriminator)
      .setLevel(level)
      .setRank(rank)
      .setBackground(
        "IMAGE",
        image ||
          "https://cdn.discordapp.com/attachments/816254133353840660/819965380406673475/IMG-20201117-WA0142.jpg"
      );

    rak.build().then(data => {
      const attachment = new Discord.MessageAttachment(data, "RankCard.png");
      let embed = new Discord.MessageEmbed()
        .setAuthor(user.user.username, message.guild.iconURL())
        .setColor("#ff2050")
        .setDescription(
          `**LEVEL** - ${level}\n**Rank** - ${rank}\n**Position** - ${myrank}\n**XP** - ${xp}/${xpNeeded}`
        )
        .setImage("attachment://RankCard.png")
        .attachFiles(attachment);
      message.channel.startTyping();
      message.channel.send(embed);
      message.channel.stopTyping();
    });
  }
};
