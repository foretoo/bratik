import { ctx, draw, PI, TAU } from "./bratik"
import { LinkedRoundedPoint, Point } from "./types"
import { find_angle } from "./utils"



const round_shape = (
  points: Point[], radius: number
) => {
  ctx.beginPath()

  const rounded: LinkedRoundedPoint[] = points.map((curr, i) => {
    const
      prev = points[(i - 1 + points.length) % points.length],
      next = points[(i + 1) % points.length],
      angle_main = find_angle(prev, curr, next),
      angle_next = (find_angle(next, curr) + PI) % TAU,
      angle_prev = (find_angle(prev, curr) + PI) % TAU,
      offset = radius / Math.tan(angle_main / 2),
      bis_length = radius / Math.sin(angle_main / 2),
      angle_diff = angle_next - angle_prev,
      clock_dir =
        (angle_diff > PI && angle_diff < TAU) ||
        (angle_diff < 0  && angle_diff > -PI)
        ? -1 : 1,
      angle_bis = angle_prev + clock_dir * angle_main / 2

      points.length === 5 && console.log(
        "prev: ", angle_prev, "\n", "next: ", angle_next
        );
      

    return {
      id: i,
      ...curr,
      offset,
      radius: {
        length: radius,
        point: {
          x: curr.x + Math.cos(angle_bis) * bis_length,
          y: curr.y + Math.sin(angle_bis) * bis_length
        }
      },
      in: {
        x: curr.x + Math.cos(angle_prev) * offset,
        y: curr.y + Math.sin(angle_prev) * offset
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

  // TODO: void exclamations
  rounded.forEach((p, i) => {
    if (!i) ctx.moveTo(p.in.x, p.in.y)
    ctx.arcTo(p.x, p.y, p.next!.x, p.next!.y, radius)
    ctx.lineTo(p.next!.in.x, p.next!.in.y)
  })

  draw()
}

export {
  round_shape
}