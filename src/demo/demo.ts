import "./style.sass"
import {
  getcanvas, clear, fill, stroke, loop, line, animate, circle, rect, font, settext, text
} from "../bratik"

const { width, height } = getcanvas(),
      grey = "#0007",
      pivot = { x: 0, y: 0 },
      playX = animate({ dur: 5555 }),
      playY = animate({ dur: 3333 })

font(20, "monospace")
settext("right")

const play = () => {
  if (pivot.x === 0) playX.to(pivot, { x: width })
  if (pivot.x === width) playX.to(pivot, { x: 0 })
  if (pivot.y === 0) playY.to(pivot, { y: height })
  if (pivot.y === height) playY.to(pivot, { y: 0 })

  clear()
  fill(null)
  stroke(grey, 1)
  line(pivot.x, 0, pivot.x, height)
  line(0, pivot.y, width, pivot.y)

  circle(width / 2, height / 2, 100)
  rect(width / 2, height / 2, 100, 100)

  fill(grey)
  stroke(null)
  font(20)
  text("Hello world!", width / 2 + 100, height / 2 + 50)
  font(24)
  text("rithms to manipulate 2D", width / 2 + 100, height / 2 + 150)

}
loop(play)
