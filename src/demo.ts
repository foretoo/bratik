import "./style.sass"
import {
  getcanvas, circle, round_shape, shape, vertex, CLOSE, clear, fill, stroke, Point, LinkedRoundedPoint, arc
} from "./lib/bratik"

const { canvas } = getcanvas(),
      points: Point[] = [],
      grey = "#bbb"

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
  points.forEach((p) => circle(p.x, p.y, 2))

  if (points.length > 2) {
    fill("#eef")
    stroke("blue", 1)
    shape()
    polygon.forEach((p, i) => {
      if (!i) vertex(p.in.x, p.in.y);
      arc(p.x, p.y, p.next!.x, p.next!.y, radius);
      vertex(p.next!.in.x, p.next!.in.y);
    })
    shape(CLOSE)

    polygon.forEach((p) => {
      stroke(null)
      fill("red")
      circle(p.radius.x, p.radius.y, 3)
      fill(null)
      stroke("blue", 4)
      shape()
      vertex(p.in.x, p.in.y)
      arc(p.x, p.y, p.out.x, p.out.y, radius);
      shape()
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