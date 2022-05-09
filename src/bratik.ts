import { Render } from "./bratik-types"

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

  fill,
  stroke,
  clear,
  
  frame,
  loop,

  CLOSE,
}