const Color = "RANDOM", Fetch = require("node-fetch").default; //npm i node-fetch
const Discord = require ("discord.js")
module.exports = {
  name: "minecraftserver",
  aliases: ["mcserver", "mcs"],
  category: "search",
  description: "Show Minecraft Server Information!",
  usage: "minecraftserver <Ip>",
  args: true,
  run: async (client, message, args) => {
        
    const Ip = args.join(" ");
    if (!Ip) return message.channel.send("Please Give Minecraft Java Server IP!");
  const response = await Fetch(`https://api.mcsrvstat.us/2/${Ip}`);
    const json = response.json();
   
    if (!json.online) return message.channel.send("Invalid Server IP Or Server Is Offline");
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle((json.hostname || Ip) + " Information")
    .setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${Ip.toLowerCase()}`)
    .addField("IP", json.ip || "Unknown", true)
    .addField("Port", json.port || "Default", true)
    .addField("Status", json.online ? "Online" : "Offline")
    .addField("Version", json.version || "Unknown")
    .addField("Players", json.players ? json.players.online : "Unknown")
    .addField("Max Players", json.players ? json.players.max : "Unknown")
    .setTimestamp();
    
    if (json.motd && json.motd.clean && json.motd.clean.length > 1) Embed.addField("Description", json.motd.clean.length > 100 ? `${json.motd.clean.slice(0, 100)}...` : json.motd.clean);

    return message.channel.send(Embed);
  }
};