import { LinkedRoundedPoint, Point } from "./types"
import { find_angle, find_length, get_clock_dir } from "./utils"



const round_shape = (
  points: Point[], radius: number
): LinkedRoundedPoint[] => {

  const rounded_points = points.reduce((
    shape: LinkedRoundedPoint[], curr, id
  ) => {
    const
      prev = points[(id - 1 + points.length) % points.length],
      next = points[(id + 1) % points.length],
      length = find_length(curr, next),
      angles = get_angles(prev, curr, next),
      offset = radius / Math.tan(angles.main / 2),
      bis_length = radius / Math.sin(angles.main / 2)

    const rounded_point: LinkedRoundedPoint = {
      ...curr,
      id,
      length,
      offset,
      angles,
      radius: {
        length: radius,
        x: curr.x + Math.cos(angles.bis) * bis_length,
        y: curr.y + Math.sin(angles.bis) * bis_length,
      },
      in: {
        x: curr.x + Math.cos(angles.prev) * offset,
        y: curr.y + Math.sin(angles.prev) * offset,
      },
      out: {
        x: curr.x + Math.cos(angles.next) * offset,
        y: curr.y + Math.sin(angles.next) * offset,
      },
      get prev() {
        return rounded_points[(id - 1 + points.length) % points.length]
      },
      get next() {
        return rounded_points[(id + 1) % points.length]
      }
    }

    return shape.concat(rounded_point)
  }, [])

  return rounded_points
}



const get_angles = (
  prev_point: Point,
  curr_point: Point,
  next_point: Point,
) => {
  const
    main = find_angle(prev_point, curr_point, next_point),
    prev = find_angle(curr_point, prev_point),
    next = find_angle(curr_point, next_point),
    dir  = get_clock_dir(prev, next),
    bis  = prev + dir * main / 2
  
  return { main, next, prev, bis }
}



export {
  round_shape
}