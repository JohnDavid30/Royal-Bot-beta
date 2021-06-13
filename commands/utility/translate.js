const Discord = require("discord.js");
const snekfetch = require("snekfetch")
const translate = require('google-translate-api');

module.exports = {
  name: "translat",
  aliases: ["translate-"],
  category: "utilit",
  description: "translate all lang",
  usage: "translate <lang> <text>",
  run: async (client, message, args) => {
 translate(args.slice(1).join(" "), {to: args[0]}).then(res => {
        const embed = new Discord.MessageEmbed()
            .setColor(0x00AE86)
            .addField("Text",args.slice(1).join(" "))
            .addField(`To: ${args[0]}`,
                res.text[0]);
        message.channel.send(embed)})}}