import { PI, TAU, CLOSE } from "./const"

let width: number,
    height: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    pr: number,

    frame = 0,
    looping = false



const getcanvas = (
  w?: number, h?: number, id?: string
) => {

  canvas = document.createElement("canvas")
  ctx = canvas.getContext("2d")!
  document.body.prepend(canvas)
  canvas.setAttribute("id", id ? id : "canvas")
  pr = window.devicePixelRatio

  if (w) {
    width = w
    height = h ? h : width
    canvas.setAttribute("style", `width:${width}px;height:${height}px;`)
    canvas.setAttribute("width", (width * pr).toString())
    canvas.setAttribute("height", (height * pr).toString())
  }
  else {
    canvas.setAttribute("style", "width:100%;height:100%;");
    ({ width, height } = canvas.getBoundingClientRect())
    canvas.setAttribute("width", (width * pr).toString())
    canvas.setAttribute("height", (height * pr).toString())
  }

  ctx.fillStyle = "white"
  ctx.strokeStyle = "black"
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.imageSmoothingEnabled = true

  return { width, height, ctx, canvas }
}



const pxratio = (val?: number): number => {
  if (val === undefined) return window.devicePixelRatio
  else {
    pr = val
    canvas.width = width * pr
    canvas.height = height * pr
    return val
  }
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
  if (shaping) ctx.lineTo(x * pr, y * pr)
  else {
    shaping = true
    ctx.moveTo(x * pr, y * pr)
  }
}
const arc = (
  x1: number, y1: number,
  x2: number, y2: number,
  r: number
) => {
  ctx.arcTo(x1 * pr, y1 * pr, x2 * pr, y2 * pr, r * pr)
}

const line = (
  x1: number, y1: number,
  x2: number, y2: number,
) => {
  ctx.beginPath()
  ctx.moveTo(x1 * pr, y1 * pr)
  ctx.lineTo(x2 * pr, y2 * pr)
  draw()
}
const circle = (
  x: number, y: number,
  r = 10
) => {
  ctx.beginPath()
  ctx.arc(x * pr, y * pr, r * pr, 0, TAU)
  draw()
}
const rect = (
  x: number, y: number,
  w = 20, h = 20,
  r?: number,
) => {
  ctx.beginPath()
  if (r) {
    ctx.moveTo((x + r) * pr, y * pr)
    ctx.arcTo((x + w) * pr, y * pr, (x + w) * pr, (y + h) * pr, r * pr)
    ctx.arcTo((x + w) * pr, (y + h) * pr, x * pr, (y + h) * pr, r * pr)
    ctx.arcTo(x * pr, (y + h) * pr, x * pr, y * pr, r * pr)
    ctx.arcTo(x * pr, y * pr, (x + w) * pr, y * pr, r * pr)
  }
  else ctx.rect(x * pr, y * pr, w * pr, h * pr)
  draw()
}


let font_family = "sans-serif"
const font = (
 size: number | string, family?: string, options?: string
) => {
  let fontsize = "",
      fontoptions = options ? options : "",
      fontfamily = font_family

  if (family) font_family = fontfamily = family
  
  if (typeof size === "number") fontsize = (size * pr) + "px"
  if (typeof size === "string") {
    const temp = size.match(/^(\d+)([a-z%]*)\/?(\d*)([a-z%]*)$/)
    if (temp) {
      fontsize = (parseFloat(temp[1]) * pr) + (temp[2] ? temp[2] : "px")
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
  let size = width || text_width
  size = size !== undefined ? size * pr : size
  ctx.fillText(content, x * pr, y * pr, size)
  ctx.strokeText(content, x * pr, y * pr, size)
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
  width?: number,
  cap?: CanvasLineCap,
  join?: CanvasLineJoin,
) => {
  if (color === null) ctx.strokeStyle = "transparent"
  else ctx.strokeStyle = color
  if (width !== undefined) ctx.lineWidth = width * pr
  if (cap !== undefined) ctx.lineCap = cap
  if (join !== undefined) ctx.lineJoin = join
}
const clear = (
  x = 0,
  y = 0,
  w = width,
  h = height,
) => {
  ctx.clearRect(x * pr, y * pr, w * pr, h * pr)
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

const easing: Record<string, (t: number) => number> = {
  linear: (t) => t,
  cubicIn: (t) => t * t * t,
  cubicOut: (t) => 1 - (1 - t) * (1 - t) * (1 - t),
  cubicInOut: (t) => t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) * (-2 * t + 2) * (-2 * t + 2)) / 2
}

const animate = (
  duration: number = 500,
  ease: string = "cubicOut",
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

    const
      prekeys = Object.keys(prop),
      keys = prekeys.reduce((acc: string[], key) => (
        !(key in target) || typeof target[key] !== "number" || typeof prop[key] !== "number"
          ? acc : acc.concat(key)
      ), [])

    if (!keys.length) return

    const
      froms = keys.map((key) => target[key] as number),
      tos = keys.map((key, i) => prop[key] - froms[i])

    const calc = (time?: number) => {
      timestamp = time
      ? Math.min(time - start, duration)
      : duration

      if (!time || timestamp === duration) ended = true
      
      t = timestamp / duration
      t = easing[ease](t)
      keys.forEach((key, i) => target[key] = froms[i] + t * tos[i])

      callback && callback(timestamp, t)
    }

    const end = () => {
      !ended && calc()
    }

    const play = (time: number) => {
      if (!started) {
        started = true
        start = time
        timestamp = time - start
      }
      
      if (timestamp < duration && !ended) {
        clearTimeout(timeoutID)
        calc(time)
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
  pxratio,

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

  frame,
  loop,
  stop,
  looping,
  animate,

  CLOSE,
  PI,
  TAU,
}