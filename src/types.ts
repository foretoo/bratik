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

export {
  type GradientType,
  type Gradient,
  
  type Ease,
  type AnimateProps,
  type AnimateDefaults,
}