import { Linked, Point, RoundedPoint } from "./types"
import { find_angle, find_length, get_clock_dir } from "./utils"



const round_shape = (
  points: Point[], radius: number
) => {

  const rounded_points: Linked<RoundedPoint>[] =
  points.map((curr, id) => {

    const
      prev = points[(id - 1 + points.length) % points.length],
      next = points[(id + 1) % points.length],
      next_length = find_length(curr, next),
      prev_length = find_length(prev, curr),
      angles = get_angles(prev, curr, next),
      vel = 1 / Math.tan(angles.main / 2),
      offset = radius * vel
      
    const result = {
      ...curr,
      id,
      angles,
      vel,
      offset,
      radius: { size: radius, x: curr.x, y: curr.y, hit: 0 },
      in: { x: curr.x, y: curr.y, length: prev_length, rest: prev_length },
      out: { x: curr.x, y: curr.y, length: next_length, rest: next_length },
      locked: false,
      get prev() {
        return getprev(id, rounded_points)
      },
      get next() {
        return getnext(id, rounded_points)
      },
    }

    return result
  }, [])

  rounded_points.forEach((p) => {
    p.radius.hit = Math.min(
      p.out.length / (p.vel + p.next.vel),
      p.in.length  / (p.vel + p.prev.vel)
    )
  })

  rounded_points
    .sort((a, b) => a.radius.hit - b.radius.hit)
    .forEach((curr) => {
      clac(curr, rounded_points, radius)
    })
    console.log("################")

  rounded_points
    .sort((a, b) => a.id - b.id)
    .forEach(fin_set)

  return rounded_points
}


const clac = (
  curr:   Linked<RoundedPoint>,
  points: Linked<RoundedPoint>[],
  radius: number
) => {
  const prev = points.find((p) => p.id === (curr.id - 1 + points.length) % points.length)!
  const next = points.find((p) => p.id === (curr.id + 1) % points.length)!
  
  console.log(curr.id)
  
  if (!curr.locked) {

    //// PROBLEM
    // if (prev.locked && !next.locked) {
    //   curr.radius.hit = Math.min(
    //     curr.out.length / (curr.vel + next.vel),
    //     curr.in.rest / curr.vel
    //   )
    //   // curr.radius.hit = Math.min(
    //   //   curr.radius.hit,
    //   //   curr.in.rest / curr.vel
    //   // )
    // }
      
    // if (next.locked && !prev.locked) {
    //   console.log("next_locked", curr.id, curr.radius.hit)
    //   curr.radius.hit = Math.min(
    //     curr.in.length / (curr.vel + prev.vel),
    //     curr.out.rest / curr.vel
    //   )
    //   console.log(curr.radius.hit)
    //   // console.log(curr.radius.hit);
    //   // curr.radius.hit = Math.min(
    //   //   curr.radius.hit,
    //   //   curr.out.rest / curr.vel
    //   // )
    // }
    
    // if (prev.locked && next.locked) {
    //   console.log("both_locked", curr.id, curr.radius.hit)
    //   curr.radius.hit = Math.min(
    //     curr.out.rest / curr.vel,
    //     curr.in.rest / curr.vel,
    //     radius
    //   )
    // }

    if (radius >= curr.radius.hit) {
      if (curr.radius.hit === next.radius.hit) {
        curr.radius.size = curr.radius.hit
        next.radius.size = curr.radius.hit
        next.locked = true

        next.offset = next.radius.size * next.vel

        next.in.rest -= next.offset
        next.out.rest -= next.offset
        const _next = points.find((p) => p.id === (next.id + 1) % points.length)!
        _next.in.rest -= next.offset

        const _nnext = points.find((p) => p.id === (_next.id + 1) % points.length)!
        _next.radius.hit = Math.min(
          _next.out.length / (_next.vel + _nnext.vel),
          _next.in.rest / _next.vel
        )
      }
      else if (curr.radius.hit === prev.radius.hit) {
        curr.radius.size = curr.radius.hit
        prev.radius.size = curr.radius.hit
        prev.locked = true

        prev.offset = prev.radius.size * prev.vel

        const _prev = points.find((p) => p.id === (prev.id - 1 + points.length) % points.length)!
        _prev.out.rest -= prev.offset
        prev.in.rest -= prev.offset
        prev.out.rest -= prev.offset

        const _pprev = points.find((p) => p.id === (_prev.id - 1 + points.length) % points.length)!
        _prev.radius.hit = Math.min(
          _prev.in.length / (_prev.vel + _pprev.vel),
          _prev.out.rest / _prev.vel
        )
      }
      else {
        curr.radius.size = Math.min(
          curr.in.rest / curr.vel,
          curr.out.rest / curr.vel,
          curr.radius.size
        )
      }
    }

    curr.offset = curr.radius.size * curr.vel
    curr.locked = true
    prev.out.rest -= curr.offset
    curr.in.rest -= curr.offset
    curr.out.rest -= curr.offset
    next.in.rest -= curr.offset
    
  }

  

  // console.log("________")
}



const fin_set = (p: Linked<RoundedPoint>) => {
  const curr_bis_size = p.radius.size / Math.sin(p.angles.main / 2)
  p.radius.x = p.x + Math.cos(p.angles.bis) * curr_bis_size
  p.radius.y = p.y + Math.sin(p.angles.bis) * curr_bis_size
  p.in.x  = p.x + Math.cos(p.angles.prev) * p.offset
  p.in.y  = p.y + Math.sin(p.angles.prev) * p.offset
  p.out.x = p.x + Math.cos(p.angles.next) * p.offset
  p.out.y = p.y + Math.sin(p.angles.next) * p.offset
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
  
  return { main, next, prev, bis, dir }
}

const getprev = <T>(i: number, arr: T[]): T => {
  return arr[(i - 1 + arr.length) % arr.length]
}
const getnext = <T>(i: number, arr: T[]): T => {
  return arr[(i + 1) % arr.length]
}



export {
  round_shape,
}