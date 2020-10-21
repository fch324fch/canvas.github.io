//获取canvas
const canvas = document.querySelector('#canvas')
//设置canvas高度宽度
canvas.setAttribute('width', canvas.offsetWidth)
canvas.setAttribute('height', canvas.offsetHeight)
//获取画笔对象
const ctx = canvas.getContext('2d')
let huaban = {
    type: "huabi",
    isDraw: false,
    beginX: 0,
    beginY: 0,
    lineWidth: 1,
    color: "#000",
    radius: 0,
    imageData: null,
    huabiFn: function (e) {
        const x = e.pageX - canvas.offsetLeft
        const y = e.pageY - canvas.offsetTop
        ctx.lineTo(x, y)
        ctx.strokeStyle = huaban.color
        ctx.lineWidth = huaban.lineWidth
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.stroke()
    },
    rectFn: function (e) {
        const x = e.pageX - canvas.offsetLeft
        const y = e.pageY - canvas.offsetTop
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
        ctx.putImageData(huaban.imageData, 0, 0, 0, 0, canvas.offsetWidth, canvas.offsetHeight)
        ctx.beginPath()
        ctx.rect(huaban.beginX, huaban.beginY, x - huaban.beginX, y - huaban.beginY)
        ctx.lineWidth = huaban.lineWidth
        ctx.strokeStyle = huaban.color
        ctx.stroke()
        ctx.closePath()
    },
    eraserFn: function (e) {
        const x = e.pageX - canvas.offsetLeft
        const y = e.pageY - canvas.offsetTop
        ctx.lineTo(x, y)
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 20
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.stroke()
    },
}
const menu = document.querySelector('#menu').children

for (let key of menu) {
    key.addEventListener('click', function () {
        for (let i of menu) {
            i.classList.remove('active')
        }
        key.classList.add('active')
        huaban.type = key.getAttribute("id")
        huaban.isDraw = false
        if (key.getAttribute('id') == 'color') {
            key.addEventListener('change', function (e) {
                huaban.color = key.value
            })
        }
        if (key.getAttribute('id') == 'line') {
            key.addEventListener('change', function (e) {
                if (key.value == 0) {
                    key.value = 1
                }
                huaban.lineWidth = key.value
            })
        }
        if (key.getAttribute('id') == 'clear'){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
    })
}

//监听鼠标按下事件
canvas.addEventListener('mousedown', function (e) {
    huaban.isDraw = true;
    if (huaban.type == 'rect') {
        const x = e.pageX - canvas.offsetLeft
        const y = e.pageY - canvas.offsetTop
        huaban.beginX = x
        huaban.beginY = y
    }
    if (huaban.type == 'huabi') {
        const x = e.pageX - canvas.offsetLeft
        const y = e.pageY - canvas.offsetTop
        huaban.beginX = x
        huaban.beginY = y
        ctx.beginPath()
        ctx.moveTo(x, y)
    }
    if (huaban.type == 'eraser') {
        const x = e.pageX - canvas.offsetLeft
        const y = e.pageY - canvas.offsetTop
        huaban.beginX = x
        huaban.beginY = y
        ctx.beginPath()
    }
})
canvas.addEventListener('mouseup', function (e) {
    huaban.imageData = ctx.getImageData(0, 0, canvas.offsetWidth, canvas.offsetHeight)
    huaban.isDraw = false
})
canvas.addEventListener('mousemove', function (e) {
    try {
        if (huaban.isDraw) {
            huaban[huaban.type + 'Fn'](e)
        }
    } catch { }
})



