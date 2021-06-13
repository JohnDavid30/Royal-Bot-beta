const db = require("quick.db");

module.exports = {
  name: "dm",
  category: "admin",
  description: "dm user",
  bot: ["MANAGE_MESSAGES"],
  usage: "dm <id user/ mention user> <msg>",
  args: true,
  run: async (client, message, args, del, member) => {
    message.delete();
   let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("Please provide a user!");
     const usa = args.slice(1).join(" ");
    const embed = new client.discord.MessageEmbed().setDescription(usa).setColor("RANDOM");
    user.send(embed);
  }
};
