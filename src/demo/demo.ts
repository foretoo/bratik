import "./style.sass"
import {
  getcanvas, clear, fill, stroke, loop, stop, line, animate, circle, rect, font, settext, text, gradient, LINEAR, bg, RADIAL, CONIC, PI, frame, looping, TAU, shape, vertex, CLOSE, curve
} from "../bratik"

let i: number
const
  { width, height } = getcanvas(),
  grey = "#0007",
  pivot = { x: 0, y: 0 },
  ax = animate({ dur: 5555, loop: true }),
  ay = animate({ dur: 3333, ease: "cubicInOut" }),
  rectsolo = gradient(LINEAR, width / 2, height / 2, width / 2 + 100, height / 2 + 100),
  circsolo = gradient(CONIC, 0, width / 2, height / 2),
  rectnum = 4,
  circnum = 13,
  boblen = Math.min(width, height) / 2,
  bobnum = 5,
  bobisolo = gradient(RADIAL, boblen, boblen, boblen / 4, boblen, boblen, boblen )


// BOB
type Bepoint = {
  i: number, len: number, a: number,
  x: number, y: number,
  x1?: number, y1?: number,
  x2?: number, y2?: number,
}
const bobik = Array((bobnum * 2) + 1).fill(null)
  .reduce((arr: Bepoint[], _, i) => {

    const point = {
      get a() { return angle },
      set a(a: number) {
        angle = a
        setpoint()
        if (i) setcontrols()
      },
    } as Bepoint
    let angle: number

    const setpoint = () => {
      point.x = Math.cos(angle) * point.len + boblen
      point.y = Math.sin(angle) * point.len + boblen
    }

    const setcontrols = () => {
      // const j = i % 2 === 0 ? 1 : -1
      // point.x1 = arr[i - 1].x + Math.cos(angle - j * PI / 4) * (point.len - arr[i - 1].len) / 2 * j
      // point.y1 = arr[i - 1].y + Math.sin(angle - j * PI / 4) * (point.len - arr[i - 1].len) / 2 * j
      point.x1 = arr[i - 1].x + Math.cos(arr[i - 1].a + PI / 2) * arr[i - 1].len / 2
      point.y1 = arr[i - 1].y + Math.sin(arr[i - 1].a + PI / 2) * arr[i - 1].len / 2
      point.x2 = point.x + Math.cos(angle - PI / 2) * point.len / 2
      point.y2 = point.y + Math.sin(angle - PI / 2) * point.len / 2
    }

    if (i !== bobnum * 2) {
      angle = Math.random() * (PI / bobnum) + i * (PI / bobnum)
      point.len = boblen / 2 + boblen * Math.random() / 2
      point.len = i % 2 === 0 ? point.len : Math.max(point.len / 2.71, boblen / 4 + 2)
      setpoint()
    }
    else {
      ({ a: angle } = arr[0])
      const { len, x, y } = arr[0]
      Object.assign(point, { len, x, y })
    }

    if (i) setcontrols()

    return arr.concat(point)
  }, [])
  



// GRADIENTS
const rnd8bit = () => Math.random()*255|0
const rndgrey = () => {
  const color = rnd8bit()
  return `rgb(${color},${color},${color})`
}
const circcolors: { p: number, color: string }[] = []
i = circnum
while (i) {
  i--
  const p = !i ? 0 : i === circnum - 1 ? 1 : Math.random()
  const color = i ? rndgrey() : circcolors[circnum - 1].color
  circcolors[i] = { p, color }
}
const setcircsolo = (a: number) => {
  circsolo.reset(a)
  circcolors.forEach((stop) => circsolo.add(stop.p, stop.color))
}
const setrectsolo = () => {
  rectsolo.reset()
  i = rectnum
  while (i) {
    const p = Math.random()
    const color = `rgb(${rnd8bit()},${rnd8bit()},${rnd8bit()})`
    rectsolo.add(p, color)
    i--
  }
}
const bobicolors: { p: number, color: string }[] = []
i = bobnum
while (i) {
  i--
  const p = !i ? 0 : i === 1 ? 0.01 : 0.01 + Math.random() * 0.99
  const color = `rgb(${rnd8bit()},${rnd8bit()},${rnd8bit()})`
  bobicolors[i] = { p, color }
}
const setbobicsolo = () => {
  bobisolo.reset()
  bobicolors.forEach((stop) => bobisolo.add(stop.p, stop.color))
}


font(20, "monospace")
ax.yo(pivot, { x: width })



// PLAYER
const play = () => {
  clear()

  // BOB
  setbobicsolo()
  fill(bobisolo.image)
  stroke(null)
  shape()
  bobik.forEach((p, i) => {
    p.a -= 0.001
    !i && vertex(p.x, p.y)
    // curve(p.x1!, p.y1!, p.x, p.y)
    curve(p.x1!, p.y1!, p.x2!, p.y2!, p.x, p.y)
  })
  shape()

  stroke(null)
  fill("black")
  circle(boblen, boblen, 3)

  // CROSS LINES
  if (pivot.y === 0) ay.yo(pivot, { y: height })
  if (pivot.y === height) ay.yo(pivot, { y: 0 })
  fill(null)
  stroke(grey, 1)
  line(pivot.x, 0, pivot.x, height)
  line(0, pivot.y, width, pivot.y)

  // GRADIENTS
  setcircsolo(frame / 100)
  fill(null)
  stroke(circsolo.image, 16)
  circle(width / 2, height / 2, 92)

  setrectsolo()
  fill(rectsolo.image)
  stroke(null)
  rect(width / 2, height / 2, 100, 100)

  // TEXTS
  fill(grey)
  stroke(null)
  font(16)
  settext("right", "top")
  text(`${width}·${height}`, width, 0)
  font(20)
  settext("right", "alphabetic")
  text("Hello world!", width / 2 + 100, height / 2 + 50)
  font(24)
  text("rithms to manipulate 2D", width / 2 + 100, height / 2 + 150)
}
loop(play)

document.onkeydown = (e: KeyboardEvent) => {
  if (e.code === "Space") {
    if (looping) {
      ax.paus()
      ay.paus()
      stop()
    }
    else {
      ax.play()
      ay.play()
      loop(play)
    }
  }
}