const PI = Math.PI, TAU = PI * 2, CLOSE = "CLOSE"

let width, height, canvas, ctx, pr, frame = 0, looping = false
const getcanvas = (w, h, id) => {
  canvas = document.createElement("canvas")
  ctx = canvas.getContext("2d")
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
const pxratio = (val) => {
  if (val === void 0) return window.devicePixelRatio
  else {
    pr = val
    canvas.width = width * pr
    canvas.height = height * pr
    return val
  }
}
let shaping = false
const ctxshape = (arg) => {
  if (arg === "CLOSE") ctx.closePath()
  if (shaping) {
    shaping = false
    draw()
  }
  else ctx.beginPath()
}
const ctxvertex = (x, y) => {
  if (shaping) ctx.lineTo(x * pr, y * pr)
  else {
    shaping = true
    ctx.moveTo(x * pr, y * pr)
  }
}
const ctxarc = (x1, y1, x2, y2, r) => {
  ctx.arcTo(x1 * pr, y1 * pr, x2 * pr, y2 * pr, r * pr)
}
const ctxcurve = (x1, y1, x2, y2, x3, y3) => {
  x3 && y3 ? ctx.bezierCurveTo(x1 * pr, y1 * pr, x2 * pr, y2 * pr, x3 * pr, y3 * pr) : ctx.quadraticCurveTo(x1 * pr, y1 * pr, x2 * pr, y2 * pr)
}
const line = (x1, y1, x2, y2) => {
  ctx.beginPath()
  ctx.moveTo(x1 * pr, y1 * pr)
  ctx.lineTo(x2 * pr, y2 * pr)
  draw()
}
const ctxcircle = (x, y, r = 10, from, to) => {
  ctx.beginPath()
  ctx.arc(x * pr, y * pr, r * pr, from || 0, to || TAU)
  draw()
}
const ctxellipse = (x, y, rx = 15, ry = 10, rotation = 0, from, to, counterclockwise) => {
  ctx.beginPath()
  ctx.ellipse(x * pr, y * pr, rx * pr, ry * pr, rotation * pr, from || 0, to || TAU, counterclockwise)
  draw()
}
const ctxrect = (x, y, w = 20, h = 20, r) => {
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
let clippath
const mask = (tag) => {
  if (tag === "CLOSE") {
    ctx.clip(clippath)
    shape = ctxshape, vertex = ctxvertex, arc = ctxarc, curve = ctxcurve, circle = ctxcircle, ellipse = ctxellipse, rect = ctxrect
  }
  else {
    ctx.save()
    clippath = new Path2D()
    shape = maskshape, vertex = maskvertex, arc = maskarc, curve = maskcurve, circle = maskcircle, ellipse = maskellipse, rect = maskrect
  }
}
const clip = () => ctx.restore()
const maskshape = (tag) => {
  if (shaping) shaping = false
  if (tag === "CLOSE") {
    shaping = false
    clippath.closePath()
  }
}
const maskvertex = (x, y) => {
  if (shaping) clippath.lineTo(x * pr, y * pr)
  else {
    shaping = true
    clippath.moveTo(x * pr, y * pr)
  }
}
const maskarc = (x1, y1, x2, y2, r) => {
  clippath.arcTo(x1 * pr, y1 * pr, x2 * pr, y2 * pr, r * pr)
}
const maskcurve = (x1, y1, x2, y2, x3, y3) => {
  x3 && y3 ? clippath.bezierCurveTo(x1 * pr, y1 * pr, x2 * pr, y2 * pr, x3 * pr, y3 * pr) : clippath.quadraticCurveTo(x1 * pr, y1 * pr, x2 * pr, y2 * pr)
}
const maskcircle = (x, y, r = 10, from, to) => {
  clippath.arc(x * pr, y * pr, r * pr, from || 0, to || TAU)
}
const maskellipse = (x, y, rx = 15, ry = 10, rotation = 0, from, to, counterclockwise) => {
  clippath.ellipse(x * pr, y * pr, rx * pr, ry * pr, rotation * pr, from || 0, to || TAU, counterclockwise)
}
const maskrect = (x, y, w = 20, h = 20, r) => {
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
const font = (size, family, options) => {
  let fontsize = "", fontoptions = options ? options : "", fontfamily = font_family
  if (family) font_family = fontfamily = family
  if (typeof size === "number") fontsize = size * pr + "px"
  if (typeof size === "string") {
    const temp = size.match(/^(\d+)([a-z%]*)\/?(\d*)([a-z%]*)$/)
    if (temp) {
      fontsize = parseFloat(temp[1]) * pr + (temp[2] ? temp[2] : "px")
      if (temp[3]) {
        fontsize += `/${temp[3]}`
        fontsize += temp[4] ? temp[4] : "px"
      }
    }
  }
  ctx.font = `${fontoptions} ${fontsize} ${fontfamily}`.trim()
}
let text_width
const settext = (align, base, width2) => {
  ctx.textAlign = align
  base && (ctx.textBaseline = base)
  width2 && (text_width = width2)
}
const text = (content, x, y, width2) => {
  let size = width2 || text_width
  size = size !== void 0 ? size * pr : size
  ctx.fillText(`${content}`, x * pr, y * pr, size)
  ctx.strokeText(`${content}`, x * pr, y * pr, size)
}
const LINEAR = "LINEAR", CONIC = "CONIC", RADIAL = "RADIAL"
const gradient = (type, ...options) => {
  const it = {}
  if (type === LINEAR)
    it.reset = (x1, y1, x2, y2) => {
      const _x1 = x1 || options[0], _y1 = y1 || options[1], _x2 = x2 || options[2], _y2 = y2 || options[3]
      it.image = ctx.createLinearGradient(_x1 * pr, _y1 * pr, _x2 * pr, _y2 * pr)
    }
  else if (type === CONIC)
    it.reset = (a, x, y) => {
      const _a = a || options[0], _x = x || options[1], _y = y || options[2]
      it.image = ctx.createConicGradient(_a * pr, _x * pr, _y * pr)
    }
  else if (type === RADIAL)
    it.reset = (x1, y1, r1, x2, y2, r2) => {
      const _x1 = x1 || options[0], _y1 = y1 || options[1], _r1 = r1 || options[2], _x2 = x2 || options[3], _y2 = y2 || options[4], _r2 = r2 || options[5]
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
const fill = (color) => {
  color === null ? ctx.fillStyle = "transparent" : ctx.fillStyle = color
}
const stroke = (color, width2, cap, join) => {
  color === null ? ctx.strokeStyle = "transparent" : ctx.strokeStyle = color
  if (width2 !== void 0) ctx.lineWidth = width2 * pr
  if (cap !== void 0) ctx.lineCap = cap
  if (join !== void 0) ctx.lineJoin = join
}
const clear = (x = 0, y = 0, w = width, h = height) => {
  ctx.clearRect(x * pr, y * pr, w * pr, h * pr)
}
const bg = (color) => {
  const { fillStyle, strokeStyle } = ctx
  stroke(null)
  fill(color)
  rect(0, 0, width, height)
  stroke(strokeStyle)
  fill(fillStyle)
}
let rafid
const stop = () => {
  looping = false
  cancelAnimationFrame(rafid)
}
const loop = (drawingCallBack) => {
  looping = true
  const play = (time) => {
    frame++
    drawingCallBack(time)
    if (looping) rafid = requestAnimationFrame(play)
  }
  rafid = requestAnimationFrame(play)
}
const easing = {
  linear: (t) => t,
  cubicIn: (t) => t * t * t,
  cubicOut: (t) => 1 - (1 - t) * (1 - t) * (1 - t),
  cubicInOut: (t) => t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) * (-2 * t + 2) * (-2 * t + 2) / 2,
}
const defaults = {
  dur: 1e3,
  loop: false,
  ease: "linear",
}
const animate = ({
  dur = 1e3,
  loop: loop2 = false,
  ease = "linear",
  onstart,
  ontick,
  onpause,
  onend,
} = defaults) => {
  let calc = () => void 0, rafic, tmoid, starttime, restarttime = false
  const it = {
    dur,
    ease,
    loop: loop2,
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
  it.pause = () => {
    if (!rafic) return
    it.paused = true
    it.onpause && it.onpause()
    clearTimeout(tmoid)
    cancelAnimationFrame(rafic)
  }
  it.play = () => {
    if (it.started && !it.paused && !it.ended) return
    if (it.ended) reset()
    it.paused = false
    restarttime = true
    fire()
  }
  it.on = (target, props) => {
    if (it.started && !it.ended) return
    if (target instanceof Array) {
      if (props instanceof Array) {
        const keys = props.map((prop) => Object.keys(prop)), froms = target.map((obj, i) => keys[i].map((key) => obj[key])), diffs = props.map((prop, i) => keys[i].map((key, j) => prop[key] - froms[i][j]))
        calc = () => target.forEach((tar, i) => keys[i].forEach((key, j) => {
          tar[key] = froms[i][j] + it.t * diffs[i][j]
        }))
      }
      else {
        const keys = Object.keys(props), froms = target.map((obj) => keys.map((key) => obj[key])), diffs = froms.map((from) => keys.map((key, i) => props[key] - from[i]))
        calc = () => target.forEach((tar, i) => keys.forEach((key, j) => {
          tar[key] = froms[i][j] + it.t * diffs[i][j]
        }))
      }
    }
    else {
      const keys = Object.keys(props), froms = keys.map((key) => target[key]), diffs = keys.map((key, i) => props[key] - froms[i])
      calc = () => keys.forEach((key, i) => {
        target[key] = froms[i] + it.t * diffs[i]
      })
    }
    reset()
    fire()
  }
  const fire = () => {
    rafic = loop2 ? requestAnimationFrame(looper) : requestAnimationFrame(player)
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
    cancelAnimationFrame(rafic)
  }
  const starttick = () => {
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
  }
  const looper = () => {
    starttick()
    if (it.time === it.dur) {
      it.time = 0
      starttime = performance.now()
    }
    tick()
    if (!it.paused) rafic = requestAnimationFrame(looper)
  }
  const player = () => {
    clearTimeout(tmoid)
    starttick()
    if (it.time === it.dur) it.ended = true
    tick()
    if (!it.ended && !it.paused) {
      tmoid = setTimeout(ender, it.dur - it.time)
      rafic = requestAnimationFrame(player)
    }
  }
  return it
}
let shape = ctxshape, vertex = ctxvertex, arc = ctxarc, curve = ctxcurve, circle = ctxcircle, ellipse = ctxellipse, rect = ctxrect

export { CLOSE, CONIC, LINEAR, PI, RADIAL, TAU, animate, arc, bg, circle, clear, clip, curve, ellipse, fill, font, frame, getcanvas, gradient, line, loop, looping, mask, pxratio, rect, settext, shape, stop, stroke, text, vertex }
