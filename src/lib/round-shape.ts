import { LinkedRoundedPoint, Point } from "./types"
import { PI, TAU } from "./const"
import { find_angle, get_clock_dir } from "./utils"



const round_shape = (
  points: Point[], radius: number
) => {

  const rounded_points: LinkedRoundedPoint[] = points.map((curr, i) => {
    const
      prev = points[(i - 1 + points.length) % points.length],
      next = points[(i + 1) % points.length],
      angle_main = find_angle(prev, curr, next),
      angle_next = (find_angle(next, curr) + PI) % TAU,
      angle_prev = (find_angle(prev, curr) + PI) % TAU,
      offset = radius / Math.tan(angle_main / 2),
      bis_length = radius / Math.sin(angle_main / 2),
      clock_dir = get_clock_dir(angle_prev, angle_next),
      angle_bis = angle_prev + clock_dir * angle_main / 2

    return {
      id: i,
      ...curr,
      offset,
      radius: {
        length: radius,
        x: curr.x + Math.cos(angle_bis) * bis_length,
        y: curr.y + Math.sin(angle_bis) * bis_length,
      },
      in: {
        x: curr.x + Math.cos(angle_prev) * offset,
        y: curr.y + Math.sin(angle_prev) * offset,
      },
      out: {
        x: curr.x + Math.cos(angle_next) * offset,
        y: curr.y + Math.sin(angle_next) * offset,
      },
      get prev() {
        return rounded_points[(i - 1 + points.length) % points.length]
      },
      get next() {
        return rounded_points[(i + 1) % points.length]
      }
    }
  })

  return rounded_points
}

export {
  round_shape
}