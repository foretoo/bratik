import {
  getcanvas, circle, round_shape, shape, vertex, CLOSE, clear, fill, stroke
} from "../dist/bratik.js"

const { canvas } = getcanvas(),
      points = [],
      grey = "#ccc"

let radius = 20

canvas.onpointerdown = (e) => {
  const point = { x: e.pageX, y: e.pageY }
  assign_value(point, points, 5)
  draw()
}
const radiusrange = document.querySelector("input")
radiusrange.oninput = (e) => {
  const target = e.target
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

const assign_value = (
  value, arr, length
) => {
  if (arr.length < length) arr.push(value)
  else {
    for (let i = 0; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1]
    }
    arr[length - 1] = value
  }
}