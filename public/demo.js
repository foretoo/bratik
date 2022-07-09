import { getcanvas, circle, shape, vertex, CLOSE, clear, fill, stroke, gradient, arc } from "../dist/bratik.min.js"
import round_shape from "https://unpkg.com/round-polygon@latest/dist/round-polygon.es.js"
const { canvas, width } = getcanvas(), points = [], grey = "#0007", bluish = "#00f7", solo = gradient("LINEAR", 0, 0, width, 0)
const solocolors = Array(width/20|0).fill(null).map(() => {
  const v = Math.random()*255|0
  return { p: Math.random(), color: `rgb(${v},${v},${v})`}
})
let polygon

canvas.onpointerdown = (e) => {
  const point = { x: e.pageX, y: e.pageY }
  assign_value(point, points, 9)
  polygon = round_shape(points, +radiusrange.value)
  draw()
}

const radiusrange = document.querySelector("input")
const radiusvalue = document.querySelector("#radiusvalue")
radiusvalue.textContent = radiusrange.value
radiusrange.oninput = (e) => {
  const target = e.target
  radiusvalue.textContent = target.value
  polygon = round_shape(points, +radiusrange.value)
  draw()
}

const draw = () => {
  clear()

  if (points.length > 2) {
    solo.reset()
    solocolors.forEach(({ p, color }) => solo.add(p, color))
    fill(solo.image)
    stroke("blue", 2)
    shape()
    polygon.forEach((p, i) => {
      if (!i) vertex(p.in.x, p.in.y)
      arc(p.x, p.y, p.next.x, p.next.y, p.arc.radius)
      vertex(p.next.in.x, p.next.in.y)
    })
    shape(CLOSE)
  }

  stroke(grey, 0.5)
  fill(null)
  shape()
  points.forEach((p) => vertex(p.x, p.y))
  shape(CLOSE)

  stroke(null)
  fill(grey)
  points.forEach((p) => circle(p.x, p.y, 1))
}

const assign_value = (value, arr, length) => {
  if (arr.length < length) arr.push(value)
  else {
    for (let i = 0; i < arr.length - 1; i++)
      arr[i] = arr[i + 1]
    arr[length - 1] = value
  }
}
