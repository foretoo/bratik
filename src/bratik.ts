import { PI, TAU, CLOSE } from "./const"
import { AnimateDefaults, AnimateProps, Ease } from "./types"

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
  ctx.textAlign = align
  base && (ctx.textBaseline = base)
  width && (text_width = width)
}
const text = (
  content: string | number, x: number, y: number, width?: number
) => {
  let size = width || text_width
  size = size !== undefined ? size * pr : size
  ctx.fillText(`${content}`, x * pr, y * pr, size)
  ctx.strokeText(`${content}`, x * pr, y * pr, size)
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
const bg = (color: string) => {
  fill(color)
  rect(0, 0, width, height)
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

const easing: Record<Ease, (t: number) => number> = {
  linear: (t) => t,
  cubicIn: (t) => t * t * t,
  cubicOut: (t) => 1 - (1 - t) * (1 - t) * (1 - t),
  cubicInOut: (t) => t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) * (-2 * t + 2) * (-2 * t + 2)) / 2
}

const defaults: AnimateDefaults = {
  dur: 1000, loop: false, ease: "linear"
}

const animate = ({
  dur = 1000,
  loop = false,
  ease = "linear",
  onstart,
  ontick,
  onpause,
  onend
}: AnimateProps = defaults) => {

  let
    target: Record<string | number | symbol, unknown> | undefined,
    keys: (string | number | symbol)[],
    froms: number[],
    tos: number[],
    playerid: number | undefined,
    enderid: number | undefined,
    starttime: number



  const data = {
    dur,
    ease,
    started: false,
    paused: false,
    ended: false,
    frame: 0,
    time: 0,
    t: 0,

    onstart,
    ontick,
    onpause,
    onend,
  }

  const pause = () => {
    if (!playerid) return
    data.paused = true
    data.onpause && data.onpause()
    clearTimeout(enderid)
    cancelAnimationFrame(playerid)
  }

  const play = () => {
    if (!data.paused) return
    playerid = requestAnimationFrame(player)
  }

  const to = (
    _target: Record<string | number | symbol, unknown>,
    props: Record<string | number | symbol, number>
  ) => {
    if (data.started && !data.ended) return

    target = _target
    keys = Object.keys(props)
    froms = keys.map((key) => target![key] as number)
    tos = keys.map((key, i) => props[key] - froms[i])

    data.frame = 0
    data.time = 0
    data.t = 0
    data.started = false
    data.ended = false

    playerid = requestAnimationFrame(player)
  }

  const tick = () => {
    data.t = easing[ease](data.time / data.dur)
    keys.forEach((key, i) => target![key] = froms[i] + data.t * tos[i])
    ontick && ontick()
    data.ended && onend && onend()
    data.frame++
  }

  const ender = () => {
    data.time = data.dur
    data.ended = true
    tick()
    cancelAnimationFrame(playerid!)
  }

  const player = () => {
    if (!data.started) {
      data.started = true
      onstart && onstart()
      starttime = performance.now()
    }
    if (data.paused) {
      data.paused = false
      starttime = performance.now() - data.time
    }

    clearTimeout(enderid)
    data.time = Math.min(performance.now() - starttime, data.dur)
    if (data.time === data.dur) data.ended = true
    tick()

    if (!data.ended) {
      enderid = setTimeout(ender, data.dur - data.time)
      playerid = requestAnimationFrame(player)
    }
  }

  return Object.assign(data, {
    onstart, ontick, onend, pause, play, to
  })
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
  bg,

  frame,
  loop,
  stop,
  looping,
  animate,

  CLOSE,
  PI,
  TAU,
}