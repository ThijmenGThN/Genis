
console.log(`    GTh Network @ 2021\nThijmenHeuvelink.GThN@pm.me\n`);

(async () => {

    // Initialize global variable
    let G = await require(`./utils/global.js`)._()

    // Socket.IO timed emitter
    let connections = 0
    G.sockets.on(`connection`, socket => {
        connections += 1
        socket.on(`disconnect`, () => { if (connections > 0) connections -= 1 })
    })

    // Data emitter
    setInterval(async () => {
        if (connections > 0) {
            G.sockets.emit(`pack`, {
                symbol: G.config.binance.symbol,
                daily: await G.binance.spot.daily(G.config.binance.symbol),
                prices: await G.binance.spot.prices(G.config.binance.symbol)
            })
            console.log(connections + ` users connected!`)
        } else console.log(`No active connections!`)
    }, 1000)

})()
