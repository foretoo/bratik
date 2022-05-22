import "./style.sass"
import {
  getcanvas, clear, fill, stroke, loop, line, animate
} from "./lib/bratik"

const { width, height } = getcanvas(),
      grey = "#0007",
      pivot = { x: 0, y: 0 },
      playX = animate(5555),
      playY = animate(3333)

const play = () => {
  if (pivot.x === 0) playX(pivot, { x: width })
  if (pivot.x === width) playX(pivot, { x: 0 })
  if (pivot.y === 0) playY(pivot, { y: height })
  if (pivot.y === height) playY(pivot, { y: 0 })
  clear()
  fill(null)
  stroke(grey, 1)
  line(pivot.x, 0, pivot.x, height)
  line(0, pivot.y, width, pivot.y)
}
loop(play)