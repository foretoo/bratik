type Point = {
  x: number,
  y: number,
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

export {
  type Point,
  type Ease,
  type AnimateProps,
  type AnimateDefaults,
}