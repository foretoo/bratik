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
      vel = 1 / Math.tan(angles.main / 2),
      offset = radius * vel,
      bis_length = radius / Math.sin(angles.main / 2)
      

    const rounded_point: LinkedRoundedPoint = {
      ...curr,
      id,
      length,
      offset,
      angles,
      vel,
      radius: {
        act: radius,
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

    if (id && points.length > 2) {
      const prev = shape[id - 1], curr = rounded_point
      set_locks(prev, curr)
      
      if (id === points.length - 1) {
        const prev = rounded_point, curr = shape[0]
        set_locks(prev, curr)
      }
    }

    return shape.concat(rounded_point)
  }, [])

  return rounded_points
}



const set_locks = (
  prev: LinkedRoundedPoint, curr: LinkedRoundedPoint
) => {
  const
    ratio = prev.length / (prev.vel + curr.vel),
    prev_offset_lock = prev.vel * ratio,
    curr_offset_lock = curr.vel * ratio

    prev.radius.max = prev.radius.max
      ? Math.min(prev_offset_lock / prev.vel, prev.radius.max)
      : prev_offset_lock / prev.vel
    curr.radius.max = curr.radius.max
      ? Math.min(curr_offset_lock / curr.vel, curr.radius.max)
      : curr_offset_lock / curr.vel

  prev.out = {
    lock: {
      x: prev.x + Math.cos(prev.angles.next) * prev_offset_lock,
      y: prev.y + Math.sin(prev.angles.next) * prev_offset_lock,
    },
    x: prev.x + Math.cos(prev.angles.next) * Math.min(prev.offset, prev_offset_lock),
    y: prev.y + Math.sin(prev.angles.next) * Math.min(prev.offset, prev_offset_lock),
  }
  curr.in = {
    lock: {
      x: curr.x + Math.cos(curr.angles.prev) * curr_offset_lock,
      y: curr.y + Math.sin(curr.angles.prev) * curr_offset_lock,
    },
    x: curr.x + Math.cos(curr.angles.prev) * Math.min(curr.offset, curr_offset_lock),
    y: curr.y + Math.sin(curr.angles.prev) * Math.min(curr.offset, curr_offset_lock),
  }
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