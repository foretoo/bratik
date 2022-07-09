var bratik = (function() {
  "use strict"
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
    if (val === void 0)
      return window.devicePixelRatio
    else {
      pr = val
      canvas.width = width * pr
      canvas.height = height * pr
      return val
    }
  }
  let shaping = false
  const ctxshape = (arg) => {
    if (arg === "CLOSE")
      ctx.closePath()
    if (shaping) {
      shaping = false
      draw()
    }
    else
      ctx.beginPath()
  }
  const ctxvertex = (x, y) => {
    if (shaping)
      ctx.lineTo(x * pr, y * pr)
    else {
      shaping = true
      ctx.moveTo(x * pr, y * pr)
    }
  }
  const ctxarc = (x1, y1, x2, y2, r) => {
    ctx.arcTo(x1 * pr, y1 * pr, x2 * pr, y2 * pr, r * pr)
  }
  const ctxcurve = (x1, y1, x2, y2, x3, y3) => {
    if (x3 && y3)
      ctx.bezierCurveTo(x1 * pr, y1 * pr, x2 * pr, y2 * pr, x3 * pr, y3 * pr)
    else
      ctx.quadraticCurveTo(x1 * pr, y1 * pr, x2 * pr, y2 * pr)
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
    ctx.ellipse(x * pr, y * pr, rx * pr, ry * pr, rotation, from || 0, to || TAU, counterclockwise)
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
    else
      ctx.rect(x * pr, y * pr, w * pr, h * pr)
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
    if (shaping)
      shaping = false
    if (tag === "CLOSE") {
      shaping = false
      clippath.closePath()
    }
  }
  const maskvertex = (x, y) => {
    if (shaping)
      clippath.lineTo(x * pr, y * pr)
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
    else
      clippath.rect(x * pr, y * pr, w * pr, h * pr)
  }
  let font_family = "sans-serif"
  const font = (size, family, options) => {
    let fontsize = "", fontoptions = options ? options : "", fontfamily = font_family
    if (family)
      font_family = fontfamily = family
    if (typeof size === "number")
      fontsize = size * pr + "px"
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
    if (color === null)
      ctx.fillStyle = "transparent"
    else
      ctx.fillStyle = color
  }
  const stroke = (color, width2, cap, join) => {
    if (color === null)
      ctx.strokeStyle = "transparent"
    else
      ctx.strokeStyle = color
    if (width2 !== void 0)
      ctx.lineWidth = width2 * pr
    if (cap !== void 0)
      ctx.lineCap = cap
    if (join !== void 0)
      ctx.lineJoin = join
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
      if (looping)
        rafid = requestAnimationFrame(play)
    }
    rafid = requestAnimationFrame(play)
  }
  let shape = ctxshape, vertex = ctxvertex, arc = ctxarc, curve = ctxcurve, circle = ctxcircle, ellipse = ctxellipse, rect = ctxrect


  return {
    CLOSE: CLOSE,
    CONIC: CONIC,
    LINEAR: LINEAR,
    PI: PI,
    RADIAL: RADIAL,
    TAU: TAU,
    arc: arc,
    bg: bg,
    circle: circle,
    clear: clear,
    clip: clip,
    curve: curve,
    ellipse: ellipse,
    fill: fill,
    font: font,
    frame: frame,
    getcanvas: getcanvas,
    gradient: gradient,
    line: line,
    loop: loop,
    looping: looping,
    mask: mask,
    pxratio: pxratio,
    rect: rect,
    settext: settext,
    shape: shape,
    stop: stop,
    stroke: stroke,
    text: text,
    vertex: vertex,
  }
})()
