const startButton = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const againButton = document.createElement('button')
const game = screens[2]
const colors = ['#fc6a6a', '#df6afc', '#916afc', '#6aebfc', '#6afcbf', '#6afc79', '#bdfc6a', '#f0fc6a', '#fcb86a', '#fc856a', '#193ae09b', '#166636e1']
let time = 0
let score = 0
let interval



againButton.classList.add('again-btn')
againButton.innerText = 'Попробовать еще раз'
againButton.addEventListener('click', (e) => {
    e.preventDefault()
    screens[2].classList.add('again')
    timeEl.parentNode.classList.remove('hide')
    screens[0].classList.remove('up')
    screens[1].classList.remove('up')
    board.innerHTML = null
    score = 0
})

startButton.addEventListener('click', (e) => {
    e.preventDefault()
    screens[0].classList.add('up')
    screens[2].classList.remove('again')
})


timeList.addEventListener('click', e => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', e => {
    if (e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    interval = setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        return finishGame()
    } else {
        let current = --time
        if (current < 10) current = `0${current}`
        return setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}


function finishGame() {
    timeEl.parentNode.classList.add('hide')
    clearInterval(interval)

    board.innerHTML = `<h1 class="final-score">Cчет: <span class="primary">${score}</span></h1>`
    board.appendChild(againButton)
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomSize(10, 60)
    const {height, width} = board.getBoundingClientRect()
    const x = getRandomSize(0, width - size)
    const y = getRandomSize(0, height - size)
    const color = getRandomColor()


    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.backgroundColor = colors[color]

    board.append(circle)
}

function getRandomSize(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    return Math.floor(Math.random() * (colors.length - 1))
}