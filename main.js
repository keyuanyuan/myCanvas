var c = document.getElementById("xxx")
var context = c.getContext("2d")
var radius = 5
//画笔半径默认为5
canvasFullSize()
window.onresize = function () {
    canvasFullSize()
}

listenToUser(c)

var eraserabled = false
eraser.onclick = function () {
    eraserabled = true
    eraser.classList.add("active")
    pen.classList.remove("active")
}
pen.onclick = function () {
    eraserabled = false
    pen.classList.add("active")
    eraser.classList.remove("active")
}
clear.onclick = function () {
    context.clearRect(0, 0, c.width, c.height)
}
download.onclick = function () {
    var url = c.toDataURL("img/png")
    var a = document.createElement("a")
    document.body.appendChild(a)
    a.href = url
    a.download = "我的画作"
    a.target = "_blank"
    a.click()
}

black.onclick = function () {
    context.fillStyle = "black"
    context.strokeStyle = "black"
    black.classList.add("active")
    white.classList.remove("active")
    red.classList.remove("active")
    yellow.classList.remove("active")
    green.classList.remove("active")
    blue.classList.remove("active")
}
white.onclick = function () {
    context.fillStyle = "white"
    context.strokeStyle = "white"
    black.classList.remove("active")
    white.classList.add("active")
    red.classList.remove("active")
    yellow.classList.remove("active")
    green.classList.remove("active")
    blue.classList.remove("active")
}
red.onclick = function () {
    context.fillStyle = "red"
    context.strokeStyle = "red"
    black.classList.remove("active")
    white.classList.remove("active")
    red.classList.add("active")
    yellow.classList.remove("active")
    green.classList.remove("active")
    blue.classList.remove("active")
}
yellow.onclick = function () {
    context.fillStyle = "yellow"
    context.strokeStyle = "yellow"
    black.classList.remove("active")
    white.classList.remove("active")
    red.classList.remove("active")
    yellow.classList.add("active")
    green.classList.remove("active")
    blue.classList.remove("active")
}
green.onclick = function () {
    context.fillStyle = "green"
    context.strokeStyle = "green"
    black.classList.remove("active")
    white.classList.remove("active")
    red.classList.remove("active")
    yellow.classList.remove("active")
    green.classList.add("active")
    blue.classList.remove("active")
}
blue.onclick = function () {
    context.fillStyle = "blue"
    context.strokeStyle = "blue"
    black.classList.remove("active")
    white.classList.remove("active")
    red.classList.remove("active")
    yellow.classList.remove("active")
    green.classList.remove("active")
    blue.classList.add("active")
}

lighter.onclick = function () {
    radius = 3
    lighter.classList.add("active")
    normal.classList.remove("active")
    bolder.classList.remove("active")
}
normal.onclick = function () {
    radius = 5
    lighter.classList.remove("active")
    normal.classList.add("active")
    bolder.classList.remove("active")
}
bolder.onclick = function () {
    radius = 7
    lighter.classList.remove("active")
    normal.classList.remove("active")
    bolder.classList.add("active")
}

function canvasFullSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    c.width = pageWidth
    c.height = pageHeight
} //画布大小满屏函数
function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
} //画圆函数
function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.lineWidth = radius * 2
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
} //划线函数
function listenToUser(canvas) {
    var using = false
    var lastPoint = {
        undefined,
        undefined
    }

    if (document.body.ontouchstart !== undefined) {
        //检测是否为触屏设备，是触摸屏执行下面
        canvas.ontouchstart = function (abc) {
            var x = abc.touches[0].clientX
            var y = abc.touches[0].clientY
            using = true
            if (eraserabled) {
                context.clearRect(x, y, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
                drawCircle(x, y)
            }

        }
        canvas.ontouchmove = function (abc) {
            var x = abc.touches[0].clientX
            var y = abc.touches[0].clientY
            if (using) {
                if (eraserabled) {
                    context.clearRect(x, y, 10, 10)
                } else {
                    var newPoint = {
                        "x": x,
                        "y": y
                    }
                    drawCircle(x, y, radius)
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
        }
        canvas.ontouchend = function (abc) {
            using = false
        }
    } else {
        //不是触摸屏执行下面
        canvas.onmousedown = function (abc) {
            var x = abc.clientX
            var y = abc.clientY
            using = true
            if (eraserabled) {
                context.clearRect(x, y, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
                drawCircle(x, y)
            }

        }
        canvas.onmousemove = function (abc) {
            var x = abc.clientX
            var y = abc.clientY
            if (using) {
                if (eraserabled) {
                    context.clearRect(x, y, 10, 10)
                } else {
                    var newPoint = {
                        "x": x,
                        "y": y
                    }
                    drawCircle(x, y, radius)
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
        }
        canvas.onmouseup = function (abc) {
            using = false
        }
    }
}