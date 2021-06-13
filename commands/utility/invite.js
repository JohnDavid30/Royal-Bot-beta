const Discord = require("discord.js");
const db = require("quick.db");
const { Owner, Developer, Support, Dashboard, Server_ID } = require("../../config.js");
module.exports = {
  name: "invite",
  aliases: ["invitelink"],
  category: "utility",
  description: "Give You My Invite Link, Etc!",
  usage: "Invite",
  guildOnly: false,
  cooldown: 5,
  run: async (client, message, args) => {
    message.delete();
    const Invite = `https://discord.com/oauth2/authorize?client_id=743068965047238677&scope=bot&permissions=805314622`;
    const Embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle("🙏Thanks🙏")
      .addField("Invite Me", `[Click Me](${Invite})`)
      .addField("Support Me", `[Click Me](${Support})`)
      .addField("Owner", `<@${Owner}>`)
      .addField("Dashboard ", `[Click Me](${Dashboard}) `) 
      .addField("Developer", `<@${Developer}>`)
    return message.channel
      .send(Embed)
      .catch(() => message.channel.send("Invite Link - " + Invite))
      .then(m => m.delete({ timeout: 44000 }).catch(e => {}));
  }
};
