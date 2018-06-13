const TOKEN = require('./token.js')
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(TOKEN, { polling: true })

bot.on('message', msg => {

    bot.sendMessage(msg.chat.id, "Hello World!")
})
