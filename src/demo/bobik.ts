import { PI } from "../const"

type Bepoint = {
  i: number, len: number, a: number,
  x: number, y: number,
  x1?: number, y1?: number,
  x2?: number, y2?: number,
}

export const bobik = (
  num: number,
  len: number
) => (
Array((num * 2) + 1).fill(null)
  .reduce((arr: Bepoint[], _, i) => {

    let angle: number

    const point = {
      get a() { return angle },
      set a(a: number) {
        angle = a
        setpoint()
        if (i) setcontrols()
      },
    } as Bepoint

    const setpoint = () => {
      point.x = Math.cos(angle) * point.len + len
      point.y = Math.sin(angle) * point.len + len
    }

    const setcontrols = () => {
      // const j = i % 2 === 0 ? 1 : -1
      // point.x1 = arr[i - 1].x + Math.cos(angle - j * PI / 4) * (point.len - arr[i - 1].len) / 2 * j
      // point.y1 = arr[i - 1].y + Math.sin(angle - j * PI / 4) * (point.len - arr[i - 1].len) / 2 * j
      point.x1 = arr[i - 1].x + Math.cos(arr[i - 1].a + PI / 2) * arr[i - 1].len / 2.5
      point.y1 = arr[i - 1].y + Math.sin(arr[i - 1].a + PI / 2) * arr[i - 1].len / 2.5
      point.x2 = point.x + Math.cos(angle - PI / 2) * point.len / 2.5
      point.y2 = point.y + Math.sin(angle - PI / 2) * point.len / 2.5
    }

    if (i !== num * 2) {
      angle = (Math.random() + i) * (PI / num)
      point.len = len / 2 + len * Math.random() / 2
      point.len = i % 2 === 0 ? point.len : Math.max(point.len / 2.71, len / 4 + 2)
      setpoint()
    }
    else {
      ({ a: angle } = arr[0])
      const { len, x, y } = arr[0]
      Object.assign(point, { len, x, y })
    }

    if (i) setcontrols()

    return arr.concat(point)
  }, [])
)