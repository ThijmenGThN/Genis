
// Dedicated to initiate global variable

module.exports = {

    _: async () => {

        // Inlude required nodejs modules
        const express = require(`express`)
        const json = require(`jsonfile`)
        const http = require(`http`)
        const io = require(`socket.io`)
        const binance = require(`node-binance-api-ext`)

        // Fetch configuration values and assign enviroment
        let config = json.readFileSync(`./config.json`)

        // Binance client initiator
        let binanceClient = binance({
            APIKEY: config.binance.key,
            APISECRET: config.binance.secret
        })

        // Initiate express web server
        const exp = express()
        const www = http.Server(exp)
        exp.get(`/`, (err, res) => { res.sendFile(__dirname + config.www.root + config.www.file) })
        exp.use(config.www.root, express.static(__dirname + config.www.root))
        www.listen(config.www.port)

        // Initiate socket io listener
        let sockets = io(www)
        
        // Return initialized global variable
        return {
            node: {
                json: json,
                express: express
            },
            config: config,
            sockets: sockets,
            binance: binanceClient
        }

    }

}


