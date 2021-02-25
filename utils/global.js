
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
        if (config.debug) config = config.src
        else config = config.dist

        // Binance API initiator (API is IP bound!)
        let api = binance({
            APIKEY: `Gz9XD41ZbaVody4RvKscqwiEKQo4TT1e8u9R23HpDUHXJUhqM9JP9JzKf3MxJGkT`,
            APISECRET: `Swa7q8V3u3zB0T2tppe5KDsO7chZM88oHrtMz1nhMphyhdTAWQNjlGUsjIj2MeNM`
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
            api: api
        }

    }

}


