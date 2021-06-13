const {
  Default_Prefix,
  Color,
  Support
} = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");
const ownerid = "553893473267482636";
module.exports = {
  name: "restart",
  aliases: ["rs"],
  category: "utility",
  description: "Restart The Bot!",
  usage: "Restart",
  owner: true,
  cooldown: 5 ,
  run: async (client, message, args) => {
    
    if (message.author.id == ownerid) {
      return message.channel.send(
        "You Don't Have Permission To Use This Command - Bot Owner"
      );
    
    await client.guilds.cache.forEach(g => {
      client.queue.get(g.id) ? client.queue.delete(g.id) : null
    });

    await client.destroy();

    await client
      .login(process.env.TOKEN) 
      .catch(() =>
        console.log(`Invalid Token Is Provided - Please Give Valid Token!`)
      );
    return message.channel.send(
      "Bot Has Been Restarted - Sorry If Bad Music Quality"
    );
  }
  }
};
