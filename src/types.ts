export type Point = {
  x: number,
  y: number,
}
export type FindLength = (
  A: Point, B: Point,
) => number
export type FindAngle = (
  A: Point, B: Point, C?: Point,
) => number