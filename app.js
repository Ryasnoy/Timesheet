import config from 'config'
import TelegramBot from 'node-telegram-bot-api'

const TOKEN = config.get('token')
const bot = new TelegramBot(TOKEN, { polling: true })

bot.on('inline_query', query => {
    const results = []
    if (query.query.length == 0) { return }
    results.push({
        id: "0",
        type: 'article',
        title: `${query.query}`,
        input_message_content: {
            message_text: "SELECT FROM DATA BASE"
        }
    })
    bot.answerInlineQuery(query.id, results, {
        cache_time: 0
    })

})