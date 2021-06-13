const ms = require("ms");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "stopwatch",
  usage: `stopwatch <time> <second / minute / hour / day>`,
  category: "utility",
  description: "",
  args: true,
  permission: "",
  cooldown: 1,

  run: async (client, message, args) => {
    const input = args[0];
    const input2 = args[1] || "s";
    const reply = input2
      .replace(`s` || `second` || `detik`, 1500)
      .replace(`m` || `minute` || `menit`, 60000)
      .replace(`h` || `hour` || `jam`, 3600000)
      .replace(`d` || `day` || `hari`, 86300000);
    const Ss = reply;
    var remainingTime = input,
      remainingCount = 1,
      status = "⏱️";
    var countdown = await message.channel.send(
      new Discord.MessageEmbed()
        .addField(
          "Loading-Time",
          `Started! **${remainingTime}${input2 || "s"}** ${status}`
        )
        .setColor("RANDOM")
    );
    let clock = setInterval(() => {
      remainingTime--;
      countdown.edit(
        new Discord.MessageEmbed()
          .addField(
            "Start-Time",
            `**${remainingTime}${input2 || "s"}** remain ${status}`
          )
          .setColor("RANDOM")
      );
      if (remainingTime == 0) {
        status = "⏱️";
        clearInterval(clock);
        countdown.delete();
        message.channel.send(
          new Discord.MessageEmbed()
            .addField(
              "Done-Time",
              `Done **${input}${input2 || "s"}** ${status}`
            )
            .setColor("RANDOM")
        );
      }
    }, reply);
  }
};
