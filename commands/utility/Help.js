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
        .setTitle("Royal Bot beta Commands List")
        .setDescription(`PREFIX: ${Default_Prefix}
🔨 | COMMANDS:

TYPE: ${Default_Prefix}help <command category name> TO GET EXTENDED INFORMATION ABOUT THAT COMMAND CATEGORY!`)
        .addField(
          `🛠 Moderation`,
          `\`${Default_Prefix}help moderation\``,
          true
        )
        .addField(
          `🔨 Settings`,
          `\`${Default_Prefix}help settings\``,
          true
        )
        .addField(`👑 Admin`, `\`${Default_Prefix}help admin\``, true)
        .addField(`🎟 Ticket`, `\`${Default_Prefix}help ticket\``, true)
        .addField(
          `🗞 Utility`,
          `\`${Default_Prefix}help utility\``,
          true
        )
        .addField(`🔍 Search`, `\`${Default_Prefix}help search\``, true)
        .addField(`📝 Misc`, `\`${Default_Prefix}help misc\``, true)
        .addField(`🎶 Music`, `\`${Default_Prefix}help music\``, true)
        .addField(`
        ✅ Reaction Roles`,
                  `\`${Default_Prefix}help reaction\``,
                  true
                 )
        .addField(`🤐 Anti Swear`, `\`${Default_Prefix}help anti-swear\``, true)
        .addField(`🤣 Fun`, `\`${Default_Prefix}help fun\``,  true) 
        .addField(`🎮 Games`, `\`${Default_Prefix}help games\``, true) 
        .setImage(
          "https://www4.flamingtext.com/Tools/download/coollogo_com.png?url=https://ov10-engine.flamingtext.com/netfu/tmp28002/coollogo_com-203772237.png&_loc=download"
        )
        .setTimestamp()
    );
  }
};
