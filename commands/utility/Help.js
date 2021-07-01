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
        .setDescription(PREFIX: r!

:question: |     WHAT IS OMEGA ALETON?

ROYAL BOT  BETA IS AN EPIC BOT, WHICH IS MORE THAN A BASIC BOT! IT HAS ALL THE COMMANDS (INCLUDING: MODERATION, FUN, GAMES, UTLS, etcur.) COMPILED IN IT SO THAT YOU CAN USE ABLETON FOR EVERY TASKS YOU WANT IT TO PERFORM!


:link: |    IMPORTANT LINKS:
[INVITE](https://discordapp.com/oauth2/authorize?client_id=787260574551375903&scope=bot&permissions=2146958847) | [SUPPORT SERVER](${support})

🔨 | COMMANDS:

TYPE: r!help <command category name> TO GET EXTENDED INFORMATION ABOUT THAT COMMAND CATEGORY!)
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
        .addField(`👑 Admin`, `\``r!help admin`\``, true)
        .addField(`🎟 Ticket`, `\``r!help ticket`\``, true)
        .addField(
          `🗞 Utility`,
          `\``r!help utility`\``,
          true
        )
        .addField(`🔍 Search`, `\``r!help search`\``, true)
        .addField(`📝 Misc`, `\``r!help misc`\``, true)
        .addField(`🎶 Music`, `\`music\``, true)
        .addField(`
        ✅ Reaction Roles`,
                  `\``r!help reaction`\``,
                  true
                 )
        .addField(`🤐 Anti Swear`, `\``r!help anti-swear`\``, true)
        .addField(`🤣 Fun`, `\``r!help fun`\``,  true) 
        .addField(`🎮 Games`, `\``r!help games`\``, true) 
        .setImage(
          "https://www4.flamingtext.com/Tools/download/coollogo_com.png?url=https://ov10-engine.flamingtext.com/netfu/tmp28002/coollogo_com-203772237.png&_loc=download"
        )
        .setTimestamp()
    );
  }
};
