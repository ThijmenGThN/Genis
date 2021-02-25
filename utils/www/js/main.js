
// Clear console to hide unimportant warnings
setTimeout(() => console.clear(), 10)

// Api data reciever
let last = {
    value: 0,
    class: `success`
}
socket.on(`api`, res => {
    
    let start = 1300
    let end = 1310

    if (res > last.value) {
        document.querySelector(`#graph-bg`).classList.remove(`bg-`+last.class)
        document.querySelector(`#graph-bg`).classList.add(`bg-success`)
        last.class = `success`
    } else if (res < last.value) {
        document.querySelector(`#graph-bg`).classList.remove(`bg-`+last.class)
        document.querySelector(`#graph-bg`).classList.add(`bg-danger`)
        last.class = `danger`
    }

    let perc = (res - start) / (end - start)
    
    let graph = document.querySelector(`#graph`)
    graph.style.width = (perc * 80 + 10) + `%`

    let graphValue = document.querySelector(`#graph-value`)
    graphValue.innerHTML = Math.trunc(perc * 100) + `% / 100%`

    last.value = res
    console.log(res, Math.trunc(perc * 100) + `%`)
    
})