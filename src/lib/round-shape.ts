import { LinkedRoundedPoint, Point } from "./types"
import { PI, TAU } from "./const"
import { find_angle, find_length, get_clock_dir } from "./utils"



const round_shape = (
  points: Point[], radius: number
) => {

  const rounded_points: LinkedRoundedPoint[] =
  points.reduce((shape: LinkedRoundedPoint[], curr, i) => {
    const
      prev = points[(i - 1 + points.length) % points.length],
      next = points[(i + 1) % points.length],
      length = find_length(curr, next),
      angle = {
        main: find_angle(prev, curr, next),
        next: (find_angle(next, curr) + PI) % TAU,
        prev: (find_angle(prev, curr) + PI) % TAU,
      },
      offset = radius / Math.tan(angle.main / 2),
      bis_length = radius / Math.sin(angle.main / 2),
      clock_dir = get_clock_dir(angle.prev, angle.next),
      angle_bis = angle.prev + clock_dir * angle.main / 2

    return shape.concat({
      id: i,
      ...curr,
      length,
      offset,
      angle,
      radius: {
        length: radius,
        x: curr.x + Math.cos(angle_bis) * bis_length,
        y: curr.y + Math.sin(angle_bis) * bis_length,
      },
      in: {
        x: curr.x + Math.cos(angle.prev) * offset,
        y: curr.y + Math.sin(angle.prev) * offset,
      },
      out: {
        x: curr.x + Math.cos(angle.next) * offset,
        y: curr.y + Math.sin(angle.next) * offset,
      },
      get prev() {
        return rounded_points[(i - 1 + points.length) % points.length]
      },
      get next() {
        return rounded_points[(i + 1) % points.length]
      }
    })
  }, [])

  return rounded_points
}

export {
  round_shape
}