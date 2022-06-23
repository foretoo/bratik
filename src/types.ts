type Obj<T> = Record<string | number | symbol, T>

type GradientType = "LINEAR" | "CONIC" | "RADIAL"

type Gradient = {
  image: CanvasGradient,
  reset: (a?: number) => void,
  add: (offset: number, color: string) => void,
}

type Ease = "linear" | "cubicIn" | "cubicOut" | "cubicInOut"

type AnimateProps = {
  dur?: number
  loop?: boolean
  ease?: Ease
  onstart?: () => void
  ontick?: () => void
  onpause?: () => void
  onend?: () => void
}

type AnimateCallBacks = "onstart" | "ontick" | "onpause" | "onend"
type AnimateDefaults = Required<Omit<AnimateProps, AnimateCallBacks>>

type AnimateData = Required<AnimateProps> & {
  started: boolean
  paused: boolean
  ended: boolean
  frame: number
  time: number
  t: number
  
  pause: () => void
  play: () => void
  on: (
    target: Obj<unknown> | Obj<unknown>[],
    props: Obj<number> | Obj<number>[]
  ) => void
}

export {
  type Obj,
  
  type GradientType,
  type Gradient,
  
  type Ease,
  type AnimateProps,
  type AnimateDefaults,
  type AnimateData,
}