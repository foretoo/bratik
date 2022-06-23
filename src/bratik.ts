import { PI, TAU, CLOSE } from "./const"
import { AnimateDefaults, AnimateProps, Ease, Gradient, GradientType, Obj } from "./types"

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

const ctxshape = (arg?: "CLOSE") => {
  if (arg === "CLOSE") ctx.closePath()

  if (shaping) {
    shaping = false
    draw()
  }
  else ctx.beginPath()
}

const ctxvertex = (
  x: number, y: number
) => {
  if (shaping) ctx.lineTo(x * pr, y * pr)
  else {
    shaping = true
    ctx.moveTo(x * pr, y * pr)
  }
}
const ctxarc = (
  x1: number, y1: number,
  x2: number, y2: number,
  r: number
) => {
  ctx.arcTo(x1 * pr, y1 * pr, x2 * pr, y2 * pr, r * pr)
}
const ctxcurve = (
  x1: number, y1: number,
  x2: number, y2: number,
  x3?: number, y3?: number
) => {
  if (x3 && y3) ctx.bezierCurveTo(x1 * pr, y1 * pr, x2 * pr, y2 * pr, x3 * pr, y3 * pr)
  else ctx.quadraticCurveTo(x1 * pr, y1 * pr, x2 * pr, y2 * pr)
}

const line = (
  x1: number, y1: number, x2: number, y2: number,
) => {
  ctx.beginPath()
  ctx.moveTo(x1 * pr, y1 * pr)
  ctx.lineTo(x2 * pr, y2 * pr)
  draw()
}
const ctxcircle = (
  x: number, y: number, r = 10, from?: number, to?: number
) => {
  ctx.beginPath()
  ctx.arc(x * pr, y * pr, r * pr, from || 0, to || TAU)
  draw()
}
const ctxellipse = (
  x: number, y: number, rx = 15, ry = 10, rotation = 0,
  from?: number, to?: number, counterclockwise?: boolean
) => {
  ctx.beginPath()
  ctx.ellipse(x * pr, y * pr, rx * pr, ry * pr, rotation * pr, from || 0, to || TAU, counterclockwise)
  draw()
}
const ctxrect = (
  x: number, y: number, w = 20, h = 20, r?: number,
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


let clippath: Path2D
const mask = (tag?: "CLOSE") => {
  if (tag === "CLOSE") {
    ctx.clip(clippath)
    shape = ctxshape,
    vertex = ctxvertex,
    arc = ctxarc,
    curve = ctxcurve,
    circle = ctxcircle,
    ellipse = ctxellipse,
    rect = ctxrect
  }
  else {
    ctx.save()
    clippath = new Path2D()
    shape = maskshape,
    vertex = maskvertex,
    arc = maskarc,
    curve = maskcurve,
    circle = maskcircle,
    ellipse = maskellipse,
    rect = maskrect
  }
}
const clip = () => ctx.restore()


const maskshape = (
  tag?: "CLOSE"
) => {
  if (shaping) shaping = false
  if (tag === "CLOSE") {
    shaping = false
    clippath.closePath()
  }
}
const maskvertex = (
  x: number, y: number
) => {
  if (shaping) clippath.lineTo(x * pr, y * pr)
  else {
    shaping = true
    clippath.moveTo(x * pr, y * pr)
  }
  }
const maskarc = (
  x1: number, y1: number, x2: number, y2: number, r: number
) => {
  clippath.arcTo(x1 * pr, y1 * pr, x2 * pr, y2 * pr, r * pr)
}
const maskcurve = (
  x1: number, y1: number, x2: number, y2: number, x3?: number, y3?: number
) => {
  x3 && y3
  ? clippath.bezierCurveTo(x1 * pr, y1 * pr, x2 * pr, y2 * pr, x3 * pr, y3 * pr)
  : clippath.quadraticCurveTo(x1 * pr, y1 * pr, x2 * pr, y2 * pr)
}
const maskcircle = (
  x: number, y: number, r = 10, from?: number, to?: number
) => {
  clippath.arc(x * pr, y * pr, r * pr, from || 0, to || TAU)
}
const maskellipse = (
  x: number, y: number, rx = 15, ry = 10, rotation = 0, from?: number, to?: number, counterclockwise?: boolean
) => {
  clippath.ellipse(x * pr, y * pr, rx * pr, ry * pr, rotation * pr, from || 0, to || TAU, counterclockwise)
}
const maskrect = (
  x: number, y: number, w = 20, h = 20, r?: number,
) => {
  if (r) {
    clippath.moveTo((x + r) * pr, y * pr)
    clippath.arcTo((x + w) * pr, y * pr, (x + w) * pr, (y + h) * pr, r * pr)
    clippath.arcTo((x + w) * pr, (y + h) * pr, x * pr, (y + h) * pr, r * pr)
    clippath.arcTo(x * pr, (y + h) * pr, x * pr, y * pr, r * pr)
    clippath.arcTo(x * pr, y * pr, (x + w) * pr, y * pr, r * pr)
  }
  else clippath.rect(x * pr, y * pr, w * pr, h * pr)
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



const
  LINEAR = "LINEAR",
  CONIC = "CONIC",
  RADIAL = "RADIAL"

const gradient = (
  type: GradientType,
  ...options: number[]
): Gradient => {

  const it = {} as Gradient

  if (type === LINEAR)
    it.reset = (x1?: number, y1?: number, x2?: number, y2?: number) => {
      const
        _x1 = x1 || options[0],
        _y1 = y1 || options[1],
        _x2 = x2 || options[2],
        _y2 = y2 || options[3]

      it.image = ctx.createLinearGradient(_x1 * pr, _y1 * pr, _x2 * pr, _y2 * pr)
    }

  else if (type === CONIC)
    it.reset = (a?: number, x?: number, y?: number) => {
      const
        _a = a || options[0],
        _x = x || options[1],
        _y = y || options[2]

      it.image = ctx.createConicGradient(_a * pr, _x * pr, _y * pr)
    }

  else if (type === RADIAL)
    it.reset = (x1?: number, y1?: number, r1?: number, x2?: number, y2?: number, r2?: number) => {
      const
        _x1 = x1 || options[0],
        _y1 = y1 || options[1],
        _r1 = r1 || options[2],
        _x2 = x2 || options[3],
        _y2 = y2 || options[4],
        _r2 = r2 || options[5]

      it.image = ctx.createRadialGradient(_x1 * pr, _y1 * pr, _r1 * pr, _x2 * pr, _y2 * pr, _r2 * pr)
    }

  it.reset()

  it.add = (offset, color) => it.image.addColorStop(offset, color)

  return it
}



const draw = () => {
  ctx.fill()
  ctx.stroke()
}
const fill = (
  color: string | CanvasGradient | CanvasPattern | null
) => {
  if (color === null) ctx.fillStyle = "transparent"
  else ctx.fillStyle = color
}
const stroke = (
  color: string | CanvasGradient | CanvasPattern | null,
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
const bg = (color: string | CanvasGradient) => {
  const { fillStyle, strokeStyle } = ctx
  stroke(null)
  fill(color)
  rect(0, 0, width, height)
  stroke(strokeStyle)
  fill(fillStyle)
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
    calc: () => void,
    rafic: number | undefined,
    tmoid: number | undefined,
    starttime: number,
    restarttime: boolean = false



  const it = {
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
    if (!rafic) return
    it.paused = true
    it.onpause && it.onpause()
    clearTimeout(tmoid)
    cancelAnimationFrame(rafic)
  }

  const play = () => {
    if (it.started && !it.paused && !it.ended) return
    if (it.ended) reset()
    it.paused = false
    restarttime = true
    fire()
  }

  const on = (
    target: Obj<unknown> | Obj<unknown>[],
    props: Obj<number> | Obj<number>[]
  ) => {
    if (it.started && !it.ended) return

    if (target instanceof Array) {
      if (props instanceof Array) {
        const
          keys = props.map((prop) => Object.keys(prop)),
          froms = target.map((obj, i) => keys[i].map((key) => obj[key] as number)),
          diffs = props.map((prop, i) => keys[i].map((key, j) => prop[key] - froms[i][j]))

        calc = () => target.forEach((tar, i) =>
          keys[i].forEach((key, j) => {
            tar[key] = froms[i][j] + it.t * diffs[i][j]
          }))
      }
      else {
        const
          keys = Object.keys(props),
          froms = target.map((obj) => keys.map((key) => obj[key] as number)),
          diffs = froms.map((from) => keys.map((key, i) => props[key] - from[i]))

        calc = () => target.forEach((tar, i) =>
          keys.forEach((key, j) => {
            tar[key] = froms[i][j] + it.t * diffs[i][j]
          }))
      }
    }
    else {
      const
        keys = Object.keys(props),
        froms = keys.map((key) => target[key] as number),
        diffs = keys.map((key, i) => (props as Obj<number>)[key] - froms[i])

      calc = () => keys.forEach((key, i) => {
          target[key] = froms[i] + it.t * diffs[i]
        })
    }

    reset()
    fire()
  }

  const fire = () => {
    rafic = loop
      ? requestAnimationFrame(looper)
      : requestAnimationFrame(player)
  }

  const reset = () => {
    it.frame = 0
    it.time = 0
    it.t = 0
    it.started = false
    it.ended = false
  }

  const tick = () => {
    it.t = easing[ease](it.time / it.dur)
    calc()
    ontick && ontick()
    it.ended && onend && onend()
    it.frame++
  }

  const ender = () => {
    it.time = it.dur
    it.ended = true
    tick()
    cancelAnimationFrame(rafic!)
  }

  const looper = () => {
    if (!it.started) {
      it.started = true
      onstart && onstart()
      starttime = performance.now()
    }
    if (restarttime) {
      restarttime = false
      starttime = performance.now() - it.time
    }

    it.time = Math.min(performance.now() - starttime, it.dur)
    if (it.time === it.dur) {
      it.time = 0
      starttime = performance.now()
    }
    tick()
    !it.paused && (rafic = requestAnimationFrame(looper))
  }

  const player = () => {
    
    if (!it.started) {
      it.started = true
      onstart && onstart()
      starttime = performance.now()
    }
    if (restarttime) {
      restarttime = false
      starttime = performance.now() - it.time
    }

    clearTimeout(tmoid)
    it.time = Math.min(performance.now() - starttime, it.dur)
    if (it.time === it.dur) it.ended = true
    tick()

    if (!it.ended && !it.paused) {
      tmoid = setTimeout(ender, it.dur - it.time)
      rafic = requestAnimationFrame(player)
    }
  }

  return Object.assign(it, { pause, play, on })
}

let
  shape = ctxshape,
  vertex = ctxvertex,
  arc = ctxarc,
  curve = ctxcurve,
  circle = ctxcircle,
  ellipse = ctxellipse,
  rect = ctxrect



export {
  getcanvas,
  pxratio,

  shape,
  vertex,
  arc,
  curve,

  line,
  circle,
  ellipse,
  rect,
  mask,
  clip,

  font,
  settext,
  text,

  LINEAR,
  CONIC,
  RADIAL,
  gradient,
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