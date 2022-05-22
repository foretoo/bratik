import "./style.sass"
import {
  getcanvas, circle, shape, vertex, CLOSE, clear, fill, stroke, Point, arc, text, font, settext, PI
} from "./lib/bratik"
import round_polygon from "round-polygon"

const { canvas } = getcanvas(),
      points: Point[] = [],
      grey = "#0007",
      bluish = "#00f7"

let polygon: ReturnType<typeof round_polygon> = []


canvas.onpointerdown = (e: PointerEvent) => {
  const point = { x: e.pageX, y: e.pageY }
  assign_value(point, points, 9)
  polygon = round_polygon(points, +radiusrange.value)
  draw()
}
const radiusrange = document.querySelector("input")!
const radiusvalue = document.querySelector("#radiusvalue")!
radiusvalue.textContent = radiusrange.value
radiusrange.oninput = (e: Event) => {
  const target = e.target as HTMLInputElement
  radiusvalue.textContent = target.value
  polygon = round_polygon(points, +radiusrange.value)
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
  points.forEach((p) => circle(p.x, p.y, 1))

  if (points.length > 2) {
    fill(bluish)
    stroke("blue", 1)
    shape()
    polygon.forEach((p, i) => {
      if (!i) vertex(p.in.x, p.in.y);
      arc(p.x, p.y, p.next.x, p.next.y, p.arc.radius);
      vertex(p.next.in.x, p.next.in.y);
    })
    shape(CLOSE)

    // polygon.forEach((p, i) => {

    //   //// Centers of roundings
    //   stroke(null)
    //   fill("blue")
    //   circle(p.radius.x!, p.radius.y!, 3)

    //   //// Arcs of roundings, stroked
    //   fill(null)
    //   stroke("black", 3)
    //   shape()
    //   vertex(p.in!.x, p.in!.y)
    //   arc(p.x, p.y, p.out!.x, p.out!.y, p.radius.size);
    //   shape()

    //   //// Points numbers
    //   stroke(null)
    //   fill(grey)
    //   font(14)
    //   settext("center", "middle")
    //   const { bis, dir } = p.angles,
    //         x = p.x - dir * Math.cos(bis) * 24,
    //         y = p.y - dir * Math.sin(bis) * 24
    //   text(`${i}`, x, y)

    //   font(10)
    //   const inx = x - dir * Math.cos(bis + PI / 2) * 24,
    //         iny = y - dir * Math.sin(bis + PI / 2) * 24
    //   text(`in`, inx, iny)
    //   const outx = x - dir * Math.cos(bis - PI / 2) * 24,
    //         outy = y - dir * Math.sin(bis - PI / 2) * 24
    //   text(`out`, outx, outy)
    // })
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