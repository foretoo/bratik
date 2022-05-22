export type Point = {
  x: number,
  y: number,
}
export type RoundedPoint = Point & {
  angles: { main: number, next: number, prev: number, bis: number, dir: number },
  radius: Point & { size: number, hit: number },
  vel: number,
  offset: number,
  in: Point & { length: number, rest: number },
  out: Point & { length: number, rest: number },
  locked: boolean,
}
export type Linked<T> = T & {
  id: number,
  next: Linked<T>,
  prev: Linked<T>,
}



export type FindLength = (
  A: Point, B: Point,
) => number
export type FindAngle = (
  A: Point, B: Point, C?: Point,
) => number