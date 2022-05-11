import "./style.sass"
import { assign_value } from "./lib/utils"
import {
  getcanvas, circle, round_shape, shape, vertex, CLOSE, clear, fill, stroke, Point
} from "./lib/bratik"

const { canvas } = getcanvas(),
      points: Point[] = [],
      grey = "#ccc"

let radius = 20

canvas.onpointerdown = (e: PointerEvent) => {
  const point = { x: e.pageX, y: e.pageY }
  assign_value(point, points, 5)
  draw()
}
const radiusrange = document.querySelector("input")!
radiusrange.oninput = (e: Event) => {
  const target = e.target as HTMLInputElement
  radius = parseInt(target.value)
  draw()
}

const draw = () => {
  clear()

  stroke(grey, 0.5)
  fill(null)
  shape()
  points.forEach((p) => vertex(p.x, p.y))
  shape(CLOSE)

  stroke(null)
  fill(grey)
  points.forEach((p) => circle(p.x, p.y, 3))

  fill("blue")
  points.length > 2 && round_shape(points, radius)
}
