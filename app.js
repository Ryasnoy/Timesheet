import config from 'config'
import TelegramBot from 'node-telegram-bot-api'
import Sequelize from "sequelize";
// import models from './index.js'

const TOKEN = config.get('token')
const bot = new TelegramBot(TOKEN, { polling: true })
const Op = Sequelize.Op
const sequelize = new Sequelize('lbta_mysql', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    },
    operatorsAliases: false
});

bot.on('inline_query', async data => {

    const results = []
    if (data.query.length == 0) { return }

    const searchResult = await getS(data.query)

    console.log('searchResult', searchResult[0].first_name)
    for (var i = 0; i < searchResult.length; i++) {
        results.push({
            id: `${i}`,
            type: 'article',
            title: `${searchResult[i].first_name} ${searchResult[i].last_name}`,
            input_message_content: {
                message_text: "SELECT FROM DATA BASE"
            }
        })
    }

    bot.answerInlineQuery(data.id, results, {
        cache_time: 0
    })

})
const Users = sequelize.define('users', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
})

const getS = async (qr) => await Users.findAll({
    // limit: 10,
    where: {
        [Op.or]: {
            first_name: {
                [Op.like]: `%${qr}%`
            },
            last_name: {
                [Op.like]: `%${qr}%`
            }
        }
    }
})
