import "./style.sass"
import {
  getcanvas, circle, round_shape, shape, vertex, CLOSE, clear, fill, stroke, Point, LinkedRoundedPoint
} from "./lib/bratik"

const { canvas } = getcanvas(),
      points: Point[] = [],
      grey = "#ccc"

let radius = 20,
    polygon: LinkedRoundedPoint[]

canvas.onpointerdown = (e: PointerEvent) => {
  const point = { x: e.pageX, y: e.pageY }
  assign_value(point, points, 5)
  polygon = round_shape(points, radius)
  draw()
}
const radiusrange = document.querySelector("input")!
radiusrange.oninput = (e: Event) => {
  const target = e.target as HTMLInputElement
  radius = parseInt(target.value)
  polygon = round_shape(points, radius)
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

  if (points.length > 2) {
    polygon.forEach((point) => {
      fill("blue")
      circle(point.in.x, point.in.y, 3)
      circle(point.out.x, point.out.y, 3)
      fill("red")
      circle(point.radius.point.x, point.radius.point.y, 3)
    });
  }
}

const assign_value = <T>(
  value: T, arr: T[], length: number
) => {
  if (arr.length < length) arr.push(value)
  else {
    for (let i = 0; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1]
    }
    arr[length - 1] = value
  }
}