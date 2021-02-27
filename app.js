
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
    let liveChart = G.node.json.readFileSync(`utils/db/liveChart.json`), 
        save = G.node.json.readFileSync(`utils/db/save.json`), lastDaily
    setInterval(async () => {

        if (liveChart.data.length >= 25) liveChart.data.splice(0, 1)
        liveChart.data.push(await G.binance.spot.prices(G.config.static.symbol.replace(`/`, ``)).then(res => { return parseFloat(res[G.config.static.symbol.replace(`/`, ``)]) }))
        
        lastDaily = await G.binance.spot.daily(G.config.static.symbol.replace(`/`, ``)).then(res => { return res })

        let date = new Date()
        if (liveChart.labels.length >= 25) liveChart.labels.splice(0, 1)
        liveChart.labels.push(date.getHours() + `:` + date.getMinutes())

        let balance = save.balance
        if (save.status == `active`) {
            let diff = parseFloat(lastDaily.priceChangePercent) - save.buyPercent
            balance = balance / 100 * (100 + diff)
        }

        G.sockets.emit(`pack`, {
            balance: balance,
            status: save.status,
            buyPrice: save.buyPrice,
            liveChart: liveChart,
            static: G.config.static
        })

        // Auto save data
        G.node.json.writeFileSync(`utils/db/liveChart.json`, liveChart)
        G.node.json.writeFileSync(`utils/db/save.json`, save)

    }, 1000)

    // Await trade toggle offer
    G.sockets.on(`connection`, socket => socket.on(`tradeToggle`, () => {

        if (save.status == `active`) {
            save.status = `inactive`
            
            let diff = parseFloat(lastDaily.priceChangePercent) - save.buyPercent
            
            save.balance = save.balance / 100 * (100 + diff)

        } else {
            save.status = `active`
            save.buyPercent = parseFloat(lastDaily.priceChangePercent)
        }

    }))

})()
