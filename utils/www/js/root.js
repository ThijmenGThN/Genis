
// Color Notes
// red #f84960
// green #02c076

// hide warnings
setTimeout(() => console.clear(), 250)

// Chart initiator
let chart = new Chart(document.querySelector(`#chart`).getContext(`2d`), {
  type: `line`,
  data: {
    labels: [],
    datasets: [{ 
        data: [],
        label: `Current`,
        borderColor: `#f0b90b`,
        fill: false
      }
    ]
  }
})

// Await socket packets
socket.on(`pack`, res => {
    let date = new Date()
    
    $(`#symbol`).text(res.symbol)
    chart.options.scales.yAxes[0].ticks.stepSize = parseFloat(`.` + `0`.repeat(parseFloat(res.prices[res.symbol]).countDecimals()))

    if (chart.data.labels.length > 10) chart.data.labels.splice(0, 1)
    chart.data.labels.push(date.getMinutes() + `:` + date.getSeconds())

    if (chart.data.datasets[0].data.length > 10) chart.data.datasets[0].data.splice(0, 1)
    chart.data.datasets[0].data.push(parseFloat(res.prices[res.symbol], 10))

    chart.update()

})