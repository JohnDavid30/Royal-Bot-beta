const Discord = require("discord.js");
const { Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const category = new Discord.Collection();
category.set("misc", "**Misc Commands**");
category.set("utility", "**Utility Commands**");
category.set("moderation", "**Moderation Commands**");
category.set("settings", "**Settings Commands**");
category.set("ticket", "**Ticket Commands**");
category.set("reaction", "**ReactionRoles Commands**");
category.set("anti-swear", "**ReactionRoles Commands**");
category.set("admin", "**Admin Commands**");
category.set("music", "**Music Commands For Member**");
category.set("search", "**Search Commands**");
category.set("fun", "**Fun Commands**");
category.set("games", "**Games Commands**");
module.exports = {
  name: "help",
  description:
    "List all of my commands or show information about a specific command.",
  category: "utility",
  usage: "help [command | category]",
  cooldown: 5,
  run: async (client, message, args) => {
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client
     * @param {Message} message
     * @param {Array<string>} args
     */
    const prefix = db.get(`Prefix_${message.guild.id}`);
    message.delete().catch(O_o => {}); // eslint-disable-line
    const cc = args[0];
    if (args.length) {
      if (category.has(cc)) {
        let embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTimestamp()
          .setDescription(
            `${category.get(cc)}\n\`\`\`xl\nhelp [Command]\n\`\`\``
          )
          .addField(
            `Commands:`,
            `${client.commands
              .filter(command => command.category.includes(cc))
              .map(command => `\`${command.name}\``)
              .join(", ")}` || `\u200b`
          );
        return message.channel.send(embed);
      }
    }
    const name = args[0];
    const command =
      client.commands.get(name) ||
      client.commands.find(c => c.aliases && c.aliases.includes(name));
    if (!command) {
    } else {
      let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`**\`${command.name}\`** Command`)
        .setDescription(`\`${command.description || "No Description"}\``)
        .addField(`Category`, `• \`${command.category || "--"}\``, true)
        .addField(
          `Aliases`,
          `\`\`\`html\n${"No Aliases" ||
            command.aliases.join(", ") ||
            "No Aliases"}\n\`\`\``,
          true
        )
        .addField(
          `Required Permission`,
          `\`\`\`html\n<${command.permissions ||command.permission ||command.author || "No Permission"}>\n\`\`\``,
          false
        )
        .addField(
          `Usage`,
          `\`\`\`html\n${command.usage || "No Usage"}\n\`\`\``,
          false
        );
      return message.channel.send(embed);
    }

    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("The All Commands")
        .setDescription(
          `🛡️ Join our for help and updates!\n\`\`\`xl\n${prefix ||
            "x!"}help [Category]\n\`\`\``
        )
        .addField(
          `🛠 Moderation`,
          `\`moderation\``,
          true
        )
        .addField(
          `🔨 Settings`,
          `\`settings\``,
          true
        )
        .addField(`👑 Admin`, `\`admin\``, true)
        .addField(`🎟 Ticket`, `\`ticket\``, true)
        .addField(
          `🗞 Utility`,
          `\`utility\``,
          true
        )
        .addField(`🔍 Search`, `\`search\``, true)
        .addField(`📝 Misc`, `\`misc\``, true)
        .addField(`🎶 Music`, `\`music\``, true)
        .addField(`
        ✅ Reaction Roles`,
                  `\`reaction\``,
                  true
                 )
        .addField(`🤐 Anti Swear`, `\`anti-swear\``, true)
        .addField(`🤣 Fun`, `\`fun\``,  true) 
        .addField(`🎮 Games`, `\`games\``, true) 
        .setImage(
          "https://www4.flamingtext.com/Tools/download/coollogo_com.png?url=https://ov10-engine.flamingtext.com/netfu/tmp28002/coollogo_com-203772237.png&_loc=download"
        )
        .setTimestamp()
    );
  }
};
//https://cdn.discordapp.com/attachments/832896037181456394/850586435055517776/16228659938301529270450143603868.gif