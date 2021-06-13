const { MessageEmbed } = require("discord.js");
const { embed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "userinfo",
  aliases: ["whois", "user"],
  usage: "userinfo <MENTION/ID>",
  category: "info",
  description: "Get advance stats of given person or yourself",
  run: async (client, message, args) => {
    let user;
    if (!args.length) {
      // Display info about the calling user
      user = message.guild.member(message.author);
    } else {
      // Display info about the user specified by the first argument
      user = message.guild.member(
        message.mentions.members.first() || await message.guild.members.fetch(args[0]))
   
    }
    if (!user) {
      return message.channel.send(
        "<a:failed:798526823976796161> Unable to find this person!"
      );
    }

    // Format Permissions
    const permissions = user.permissions.toArray().map(perm => {
      return perm
        .toLowerCase()
        .replace(/_/g, " ") // Replace all underscores with spaces
        .replace(/\w\S*/g, txt => {
          // Capitalize the first letter of each word
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    });

    // Calculate Join Position
    let joinPosition;
    const members = message.guild.members.cache.array();
    members.sort((a, b) => a.joinedAt - b.joinedAt);
    for (let i = 0; i < members.length; i++) {
      if (members[i].id == message.guild.member(user).id) joinPosition = i;
    }

    //OPTIONS FOR STATUS

    let stat = {
      online: "https://emoji.gg/assets/emoji/9166_online.png",
      idle: "https://emoji.gg/assets/emoji/3929_idle.png",
      dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
      offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
    };
    //NOW BADGES
    let badges = await user.user.flags;
    badges = await badges.toArray();

    let newbadges = [];
    badges.forEach(m => {
      newbadges.push(m.replace("_", " "));
    });

    let embed = new MessageEmbed().setThumbnail(
      user.user.displayAvatarURL({ dynamic: true })
    );

    //ACTIVITY
    let array = [];
    if (user.user.presence.activities.length) {
      let data = user.user.presence.activities;

      for (let i = 0; i < data.length; i++) {
        let name = data[i].name || "None";
        let xname = data[i].details || "None";
        let zname = data[i].state || "None";
        let type = data[i].type;

        array.push(`**${type}** : \`${name} : ${xname} : ${zname}\``);

        if (data[i].name === "Spotify") {
          embed.setThumbnail(
            `https://i.scdn.co/image/${data[i].assets.largeImage.replace(
              "spotify:",
              ""
            )}`
          );
        }

        embed.setDescription(array.join(" "));
      }
    }
    //Check Roles used by members
 let roles = user.roles.cache.map(r => `<@&${r.id}>`).join(', ').replace(new RegExp(`<@&${message.guild.id}>`, 'g'), '');
        if (roles.length === 0) roles = '-';
                   
    //EMBED COLOR BASED ON member
    embed.setColor(
      user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor
    );

    //OTHER STUFF
    embed.setAuthor(
      user.user.tag,
      user.user.displayAvatarURL({ dynamic: true })
    );

    //CHECK IF USER HAVE NICKNAME
    if (user.nickname !== null) embed.addField("Nickname", user.nickname);
    embed
      .addField("Joined At", moment(user.user.joinedAt).format("LLLL"))
      .addField(
        "Account Created At",
        moment(user.user.createdAt).format("LLLL")
      )
      .addField(
        "Common Information",
        `Tags: \`${user.user.username}\`
ID: \`${user.user.id}\`
Discriminator: \`${user.user.discriminator}\`
Bot: ${user.user.bot}
Deleted User: ${user.deleted}
Position: ${joinPosition || 1}
      `
      )
      .addField("Badges", newbadges.join(", ").toLowerCase() || "None")
      .addField("Roles", roles)
      .addField("Permissions", `**\`${permissions.join("\n")}\`**`)
      .setFooter(user.user.presence.status, stat[user.user.presence.status]);

    return message.channel.send(embed).catch(err => {
      return message.channel.send(
        "<a:failed:798526823976796161> Error : " + err
      );
    });
  }
};
