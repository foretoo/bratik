import { Point } from "./types"
import { PI, TAU, CLOSE } from "./const"

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



const font = (
 size: number | string, family?: string, options?: string
) => {
  let fontsize = "",
      fontoptions = options ? options : "",
      fontfamily = family ? family : "sans-serif"
  
  if (typeof size === "number") fontsize = size.toString() + "px"
  if (typeof size === "string") {
    const temp = size.match(/^(\d+)([a-z%]*)\/?(\d*)([a-z%]*)$/)
    if (temp) {
      fontsize = temp[1]
      fontsize += temp[2] ? temp[2] : "px"
      if (temp[3]) {
        fontsize += `/${temp[3]}`
        fontsize += temp[4] ? temp[4] : "px"
      }
    }
  }
  
  ctx.font = `${fontoptions} ${fontsize} ${fontfamily}`.trim()
}

let text_width: number | undefined
const settext = (
  align: CanvasTextAlign,
  base?: CanvasTextBaseline,
  width?: number
) => {
  ctx.textAlign = align || "start"
  ctx.textBaseline = base || "alphabetic"
  text_width = width
}
const text = (
  content: string, x: number, y: number, width?: number
) => {
  ctx.fillText(content, x, y, width || text_width)
  ctx.strokeText(content, x, y, width || text_width)
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


let rafid: number

const stop = () => {
  looping = false
  cancelAnimationFrame(rafid)
}

const loop = (drawingCallBack: FrameRequestCallback) => {
  looping = true
  const play = (time: number) => {
    frame++
    drawingCallBack(time)
    if (looping) rafid = requestAnimationFrame(play)
  }
  rafid = requestAnimationFrame(play)
}

const animate = (
  duration: number = 500,
  callback?: (time: number, t: number) => void,
) => {

  let started = false,
      ended = false,
      start: number,
      timestamp: number,
      timeoutID: number | undefined,
      t: number
  
  return (
    target: Record<string | number | symbol, unknown>,
    prop: Record<string | number | symbol, number>,
  ) => {
    if (started) return

    const key = Object.keys(prop)[0]
    if (!(key in target) || typeof target[key] !== "number" || typeof prop[key] !== "number") return

    const
      value = prop[key],
      from = target[key] as number,
      to = value - from

    const ease = (time?: number) => {
      timestamp = time
      ? Math.min(time - start, duration)
      : duration

      if (!time || timestamp === duration) ended = true
      
      t = timestamp / duration
      t = t * t * t
      target[key] = from + t * to

      callback && callback(timestamp, t)
    }

    const end = () => {
      !ended && ease()
    }

    const play = (time: number) => {
      if (!started) {
        started = true
        start = time
        timestamp = time - start
      }
      
      if (timestamp < duration && !ended) {
        clearTimeout(timeoutID)
        ease(time)
        timeoutID = setTimeout(end, duration - timestamp)
        requestAnimationFrame(play)
      }
      else {
        started = false
        ended = false
      }
    }

    requestAnimationFrame(play)
  }
}



export {
  getcanvas,
  ctx,

  shape,
  vertex,
  arc,

  line,
  circle,
  rect,

  font,
  settext,
  text,

  fill,
  stroke,
  clear,
  draw,

  frame,
  loop,
  stop,
  looping,
  animate,

  CLOSE,
  PI,
  TAU,

  type Point,
}