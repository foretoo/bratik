import "./style.sass"
import {
  getcanvas, clear, fill, stroke, loop, line, animate, circle, rect, font, settext, text, gradient, LINEAR, bg, RADIAL, CONIC, PI, frame
} from "../bratik"

const { width, height } = getcanvas(),
      grey = "#0007",
      pivot = { x: 0, y: 0 },
      ax = animate({ dur: 5555, loop: true }),
      ay = animate({ dur: 3333, ease: "cubicInOut" }),
      rectsolo = gradient(LINEAR, width / 2, height / 2, width / 2 + 100, height / 2 + 100),
      circsolo = gradient(CONIC, 0, width / 2, height / 2),
      circnum = 13
      

font(20, "monospace")
settext("right")


const rnd8bit = () => Math.random()*255|0
const rndgrey = () => {
  const color = rnd8bit()
  return `rgb(${color},${color},${color})`
}
let i: number
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
  i = circnum
  while (i) {
    i--
    circsolo.add(circcolors[i].p, circcolors[i].color)
  }
}

ax.yo(pivot, { x: width })

const play = () => {
  if (pivot.y === 0) ay.yo(pivot, { y: height })
  if (pivot.y === height) ay.yo(pivot, { y: 0 })

  clear()
  fill(null)
  stroke(grey, 1)
  line(pivot.x, 0, pivot.x, height)
  line(0, pivot.y, width, pivot.y)

  setcircsolo(frame / 100)
  fill(null)
  stroke(circsolo.image, 16)
  circle(width / 2, height / 2, 92)

  rectsolo.reset()
  i = 4
  while (i) {
    const p = Math.random()
    const color = `rgb(${rnd8bit()},${rnd8bit()},${rnd8bit()})`
    rectsolo.add(p, color)
    i--
  }
  fill(rectsolo.image)
  stroke(null)
  rect(width / 2, height / 2, 100, 100)

  fill(grey)
  stroke(null)
  font(20)
  text("Hello world!", width / 2 + 100, height / 2 + 50)
  font(24)
  text("rithms to manipulate 2D", width / 2 + 100, height / 2 + 150)

}
loop(play)

document.onkeydown = (e: KeyboardEvent) => {
  if (e.code === "Space") ax.paused ? ax.play() : ax.paus()
}