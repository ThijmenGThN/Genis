
// Color Notes
// red #f84960
// green #02c076

// hide warnings
setTimeout(() => console.clear(), 1000)

// liveChart initiator
let liveChart = new Chart(document.querySelector(`#liveChart`).getContext(`2d`), {
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

  $(`#symbol`).text(res.static.symbol)  
  $(`#balance`).text(res.balance)
  $(`#status`).text(res.status)
  $(`#fees`).text(res.static.fees + `%`)

  document.title = `Genis - ` + res.status

  if (res.status == `active`) {
    $(`#tradeBtn`).removeClass(`btn-success`)
    $(`#tradeBtn`).addClass(`btn-danger`)
    $(`#tradeBtn`).text(`Market Sell`)
  } else {
    $(`#tradeBtn`).removeClass(`btn-danger`)
    $(`#tradeBtn`).addClass(`btn-success`)
    $(`#tradeBtn`).text(`Market Buy`)
  } 
  
  liveChart.data.labels = res.liveChart.labels
  liveChart.data.datasets[0].data = res.liveChart.data

  liveChart.update()

})

// Await trade offer
$(`#tradeBtn`).click(() => socket.emit(`tradeToggle`))