import { Render } from "./bratik-types"

const PI = Math.PI,
      TAU = PI * 2

let width: number,
    height: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,

    frame = 0,
    looping = true



const getcanvas = (w?: number, h?: number, id?: string) => {

  canvas = document.createElement("canvas")
  ctx = canvas.getContext("2d")!
  document.body.prepend(canvas)
  canvas.setAttribute("id", id ? id : "canvas")

  if (w) {
    width = w
    height = h ? h : width
    canvas.setAttribute("style", `width:${width}px;height:${height}px;`)
    canvas.setAttribute("width", width.toString())
    canvas.setAttribute("height", height.toString())
  }
  else {
    canvas.setAttribute("style", "width:100%;height:100%;");
    ({ width, height } = canvas.getBoundingClientRect())
    canvas.setAttribute("width", width.toString())
    canvas.setAttribute("height", height.toString())
  }
  ctx.fillStyle = "white"
  ctx.strokeStyle = "black"
  return { width, height, ctx, canvas }
}



const CLOSE = "CLOSE"
let shaping = false

const shape = (arg?: string) => {
  if (arg === "CLOSE") ctx.closePath()
  if (shaping) {
    shaping = false
    draw()
  }
  else ctx.beginPath()
}

const vertex = (x: number, y: number) => {
  if (shaping) ctx.lineTo(x, y)
  else {
    shaping = true
    ctx.moveTo(x, y)
  }
}
const arc = (
  x1 =  0, y1 =  0,
  x2 = 20, y2 = 20,
  r =  20 
) => {
  ctx.arcTo(x1, y1, x2, y2, r)
}

const circle = (
  x = 0,
  y = 0,
  r = 10
) => {
  shape()
  shaping = true
  ctx.arc(x, y, r, 0, TAU)
  shape()
}

const rect = (
  x = 0,
  y = 0,
  w = 20,
  h = 20,
  r = 5,
) => {
  shape()
  if (r) {
    vertex(x + r, y)
    arc(x + w, y, x + w, y + h, r)
    arc(x + w, y + h, x, y + h, r)
    arc(x, y + h, x, y, r)
    arc(x, y, x + w, y, r)
  }
  else {
    shaping = true
    ctx.rect(x, y, w, h)
  }
  shape()
}



const draw = () => {
  ctx.fill()
  ctx.stroke()
}
const fill = (color = "white") => {
  ctx.fillStyle = color
}
const stroke = (color = "black") => {
  ctx.strokeStyle = color
}
const clear = (
  x = 0,
  y = 0,
  w = width,
  h = height,
) => {
  ctx.clearRect(x, y, w, h)
}



const loop: Render = (draw) => {
  const render = () => {
    if (looping) {
      frame++
      draw()
    }
    requestAnimationFrame(render)
  }
  render()
}



export {
  getcanvas,
  shape,
  vertex,
  arc,

  circle,
  rect,

  fill,
  stroke,
  clear,

  frame,
  loop,

  CLOSE,
  PI,
  TAU,
}