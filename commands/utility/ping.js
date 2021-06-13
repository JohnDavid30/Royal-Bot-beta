const { Default_Prefix, Color, Support } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "ping",
  aliases: ["ms"],
  category: "utility",
  description: "Show Bot Ping!",
  usage: "Ping",
  run: async (client, message, args) => {
    const ms = require("ms")
    const upt = "5s"
   return message.channel.send("Check your Ping now").then((sentMessage) => setTimeout (function(){ sentMessage.edit(`API Latency: ${client.ws.ping}`)},ms(upt))
   )}}
   