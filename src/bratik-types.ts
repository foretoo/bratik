export type Point = {
  x: number,
  y: number
}
export type RoundedPoint = Point & {
  in: Point,
  out: Point,
  next: RoundedPoint,
  prev: RoundedPoint
}
export type FindLength = (
  A: Point, B: Point
) => number
export type FindAngle = (
  A: Point, B: Point, C?: Point
) => number

export type Render = (fn: () => void) => void