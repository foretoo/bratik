import { Render, Point } from "./types"
import { round_shape } from "./round-shape"

const PI = Math.PI,
      TAU = PI * 2

let width: number,
    height: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,

    frame = 0,
    looping = false



const getcanvas = (
  w?: number, h?: number, id?: string
) => {

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
  ctx.imageSmoothingEnabled = true
  return { width, height, ctx, canvas }
}



const CLOSE = "close"
let shaping = false

const shape = (arg?: string) => {
  if (arg === "close") ctx.closePath()

  if (shaping) {
    shaping = false
    draw()
  }
  else ctx.beginPath()
}

const vertex = (
  x: number, y: number
) => {
  if (shaping) ctx.lineTo(x, y)
  else {
    shaping = true
    ctx.moveTo(x, y)
  }
}
const arc = (
  x1: number, y1: number,
  x2: number, y2: number,
  r: number
) => {
  ctx.arcTo(x1, y1, x2, y2, r)
}

const line = (
  x1: number, y1: number,
  x2: number, y2: number,
) => {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  draw()
}
const circle = (
  x: number, y: number,
  r = 10
) => {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, TAU)
  draw()
}
const rect = (
  x: number, y: number,
  w = 20, h = 20,
  r?: number,
) => {
  ctx.beginPath()
  if (r) {
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
  }
  else ctx.rect(x, y, w, h)
  draw()
}



const draw = () => {
  ctx.fill()
  ctx.stroke()
}
const fill = (color: string | null) => {
  if (color === null) ctx.fillStyle = "transparent"
  else ctx.fillStyle = color
}
const stroke = (
  color: string | null,
  width?: number
) => {
  if (color === null) ctx.strokeStyle = "transparent"
  else ctx.strokeStyle = color
  if (width !== undefined) ctx.lineWidth = width
}
const clear = (
  x = 0,
  y = 0,
  w = width,
  h = height,
) => {
  ctx.clearRect(x, y, w, h)
}


let play: () => void,
    stop: typeof play

const loop: Render = (drawingCallBack) => {
  looping = true
  let rAFid: number
  play = () => {
    frame++
    drawingCallBack()
    rAFid = requestAnimationFrame(play)
  }
  stop = () => {
    looping = false
    cancelAnimationFrame(rAFid)
  }
  play()
}



export {
  getcanvas,
  ctx,

  shape,
  round_shape,
  vertex,
  arc,

  line,
  circle,
  rect,

  fill,
  stroke,
  clear,
  draw,

  frame,
  loop,
  stop,
  looping,

  CLOSE,
  PI,
  TAU,

  type Point
}