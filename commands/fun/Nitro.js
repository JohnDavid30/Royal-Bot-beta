const path = require('path');
module.exports = {
  name: "nitro",
  category: "fun",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    message.channel.send(
      `htt${String.fromCharCode(8203)}ps://discord.${String.fromCharCode(8203)}gift/${client.random(24)}`
      ,{ files: [{ attachment: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQblaRj0NQjberZWwXntlfBdcI0QIY0WLYUZg&usqp=CAU', name: "Nitro.png" }]}
    );
  }
};
