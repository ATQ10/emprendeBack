const config = {
    appConfig:{
        host: process.env.HOST,
        port: process.env.PORT
    },
    dbConfig:{
        dbUrl: process.env.DB
    }
}

module.exports = config