export type Point = {
  x: number,
  y: number,
}
export type RoundedPoint = Point & {
  length: number,
  radius: Point & {
    length: number,
  },
  offset: number,
  in: Point,
  out: Point,
}
export type Linked<T> = T & {
  id: number,
  next: Linked<T> | null,
  prev: Linked<T> | null,
}
export type LinkedRoundedPoint = Linked<RoundedPoint>



export type FindLength = (
  A: Point, B: Point,
) => number
export type FindAngle = (
  A: Point, B: Point, C?: Point,
) => number

export type Render = (fn: () => void) => void