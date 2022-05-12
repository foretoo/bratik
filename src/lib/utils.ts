import { FindAngle, FindLength } from "./types"
import { PI, TAU } from "./const"

export const find_length: FindLength = (A, B) =>
  Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2))

export const find_angle: FindAngle = (A, B, C) => {
  if (!C)
    return Math.atan2(B.y - A.y, B.x - A.x)
  else {
    const AB = find_length(A, B),
          BC = find_length(B, C),
          CA = find_length(C, A)

    return Math.acos((AB*AB + BC*BC - CA*CA) / (2*AB*BC))
  }
}

export const get_clock_dir = (
  angle1: number, angle2: number
) => {
  const angle_diff = angle2 - angle1
  return (
    (angle_diff > PI && angle_diff < TAU) ||
    (angle_diff < 0  && angle_diff > -PI)
    ? -1 : 1
  )
}