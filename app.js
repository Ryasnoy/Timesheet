const TOKEN = require('./token.js')
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(TOKEN, { polling: true })

var dateOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Today', callback_data: '0' }],
            [{ text: 'Yesterday', callback_data: '1' }],
            [{ text: 'Custom Date', callback_data: '2' }]
        ]
    })
};

bot.onText(/\/all/, function (msg, match) {
    
});

bot.onText(/\/worker/, function (msg, match) {
    bot.sendMessage(msg.chat.id, 'Enter your last name:');
    // TODO: CHECK AND SELECT USER FROM DATABASE
    //bot.sendMessage(msg.chat.id, 'Set the time period:', dateOptions);
});

bot.on('callback_query', function (msg) {
    // console.log(msg)

    switch (parseInt(msg.data)) {
        case 0:
            bot.sendMessage(msg.from.id, '0')
            break
        case 1: bot.sendMessage(msg.from.id, '1')
            break
        case 2: bot.sendMessage(msg.from.id, '2')
            break
        default:
            bot.sendMessage(msg.from.id, "undefined")
            break
    }
})