
console.log(`    GTh Network @ 2021\nThijmenHeuvelink.GThN@pm.me\n`);

(async () => {

    // Initialize global variable
    let G = await require(`./utils/global.js`)._()

    // Binance api data collector
    let api
    setInterval(() => G.api.spot.prices(`ETHUSDT`, (err, res) => {
        if (err) throw err
        api = res[`ETHUSDT`]
    }), 2000)

    // Socket.IO handler
    G.sockets.on(`connection`, socket => {

        // API updator
        setInterval(() => socket.emit(`api`, api), 2000)

    })

})()
