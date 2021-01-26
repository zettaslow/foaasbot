var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
let foaasManager = require('./foaas_manager');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            case 'foaas':
                {
                    foaasManager.foaasRequest(args[0], user).then((foaasData) => {
                        bot.sendMessage({
                            to: channelID,
                            message: foaasData.message + " " + foaasData.subtitle
                        });
                    });
                    break;
                }
            case 'random':
                {
                    foaasManager.foaasRequestRandom(user).then((messageData) => {
                        bot.sendMessage({
                            to: channelID,
                            message: messageData.message + " " + messageData.subtitle
                        })
                    })
                    break;
                }
            // Just add any case commands if you want to..
         }
     }
});