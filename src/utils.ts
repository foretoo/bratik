export type Point = {
  x: number,
  y: number
}
type FindLength = (
  A: Point, B: Point
) => number
type FindAngle = (
  A: Point, B: Point, C?: Point
) => number

export const find_length: FindLength = (A, B) =>
  Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2))

export const find_angle: FindAngle = (A, B, C) => {
  if (!C)
    return Math.atan2(B.y - A.y, B.x - A.x)
  else {
    const AB = find_length(A, B),
          BC = find_length(B, C),
          AC = find_length(C, A)

    return Math.acos((BC*BC + AB*AB - AC*AC) / (2*BC*AB))
  }
}

export const assign_value = <T>(
  value: T, arr: T[], length: number
) => {
  if (arr.length < length) arr.push(value)
  else {
    for (let i = 0; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1]
    }
    arr[length - 1] = value
  }
}