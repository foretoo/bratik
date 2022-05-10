import { ctx, draw } from "./bratik"
import { Point, RoundedPoint } from "./bratik-types"
import { find_angle } from "./utils"



const round_shape = (
  points: Point[], radius: number
) => {
  ctx.beginPath()

  const rounded: RoundedPoint[] = points.map((curr, i) => {
    const
      prev = points[(i - 1 + points.length) % points.length],
      next = points[(i + 1) % points.length],
      angle_main = find_angle(prev, curr, next),
      angle_next = find_angle(curr, next),
      angle_prev = find_angle(prev, curr),
      offset = radius / Math.tan(angle_main / 2)

    return {
      ...curr,
      offset,
      in: {
        x: curr.x - Math.cos(angle_prev) * offset,
        y: curr.y - Math.sin(angle_prev) * offset
      },
      out: {
        x: curr.x + Math.cos(angle_next) * offset,
        y: curr.y + Math.sin(angle_next) * offset,
      },
      get prev() {
        return rounded[(i - 1 + points.length) % points.length]
      },
      get next() {
        return rounded[(i + 1) % points.length]
      }
    }
  })

  rounded.forEach((p, i) => {
    if (!i) ctx.moveTo(p.in.x, p.in.y)
    ctx.arcTo(p.x, p.y, p.next.x, p.next.y, radius)
    ctx.lineTo(p.next.in.x, p.next.in.y)
  })

  draw()
}

export {
  round_shape
}