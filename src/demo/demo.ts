import "./style.sass"
import { getcanvas, clear, fill, stroke, loop, stop, line, animate, circle, rect, font, settext, text, gradient, LINEAR, bg, RADIAL, CONIC, PI, frame, looping, TAU, shape, vertex, CLOSE, curve, pxratio, mask, clip } from "../bratik"
import { bobik } from "./bobik"

const
  { canvas, ctx, width, height } = getcanvas(),
  min = Math.min(width, height),
  pr = pxratio(),
  bobnum = 6,
  bobisolo = gradient(RADIAL, min/2, min/2, min / 8, min/2, min/2, min/2),
  bobl = bobik(bobnum, min/2)



// GRADIENTS
const bbc = [
  { p: 0, color: "#aaa" },
  { p: 0.002, color: "#111" },
  { p: 1, color: "#777" },
]


font(20, "monospace")


// PLAYER
const play = () => {
  clear()

  mask()
  bobl.forEach((p, i) => {
    p.a -= 0.001
    !i && vertex(p.x, p.y)
    curve(p.x1!, p.y1!, p.x2!, p.y2!, p.x, p.y)
  })
  mask(CLOSE)
  bobisolo.reset()
  bbc.forEach((stop) => bobisolo.add(stop.p, stop.color))
  bg(bobisolo.image)
  clip()


  // TEXTS
  fill("#fffb")
  stroke(null)
  font(16)
  settext("right", "top")
  text(`${width}·${height}`, width, 0)
}
loop(play)

window.onkeydown = canvas.onpointerdown = (e: KeyboardEvent | PointerEvent) => {
  if (
    e instanceof KeyboardEvent && e.code === "Space" ||
    e instanceof MouseEvent && e.button === 0
  )
    looping ? stop() : loop(play)
}