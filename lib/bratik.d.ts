declare const PI: number, TAU: number, CLOSE = "CLOSE"

declare type GradientType = "LINEAR" | "CONIC" | "RADIAL"
declare type Ease = "linear" | "cubicIn" | "cubicOut" | "cubicInOut"

declare let frame: number, looping: boolean
declare const getcanvas: (w?: number | undefined, h?: number | undefined, id?: string | undefined) => { width: number; height: number; ctx: CanvasRenderingContext2D; canvas: HTMLCanvasElement }
declare const pxratio: (val?: number | undefined) => number
declare const line: (x1: number, y1: number, x2: number, y2: number) => void
declare const mask: (tag?: "CLOSE" | undefined) => void
declare const clip: () => void
declare const font: (size: number | string, family?: string | undefined, options?: string | undefined) => void
declare const settext: (align: CanvasTextAlign, base?: CanvasTextBaseline | undefined, width?: number | undefined) => void
declare const text: (content: string | number, x: number, y: number, width?: number | undefined) => void
declare const LINEAR = "LINEAR", CONIC = "CONIC", RADIAL = "RADIAL"
declare const gradient: (type: GradientType, ...options: number[]) => { image: CanvasGradient; reset: (a?: number) => void; add: (offset: number, color: string) => void }
declare const fill: (color: string | CanvasGradient | CanvasPattern | null) => void
declare const stroke: (color: string | CanvasGradient | CanvasPattern | null, width?: number | undefined, cap?: CanvasLineCap | undefined, join?: CanvasLineJoin | undefined) => void
declare const clear: (x?: number, y?: number, w?: number, h?: number) => void
declare const bg: (color: string | CanvasGradient | CanvasPattern) => void
declare const stop: () => void
declare const loop: (drawingCallBack: FrameRequestCallback) => void
declare const animate: ({ dur, loop, ease, onstart, ontick, onpause, onend }?: { dur?: number; loop?: boolean; ease?: Ease; onstart?: () => void; ontick?: () => void; onpause?: () => void; onend?: () => void }) => { dur: number; ease: Ease; started: boolean; paused: boolean; ended: boolean; frame: number; time: number; t: number; onstart: (() => void) | undefined; ontick: (() => void) | undefined; onpause: (() => void) | undefined; onend: (() => void) | undefined; pause: () => void; play: () => void; on: (target: Record<string | number | symbol, unknown> | Record<string | number | symbol, unknown>[], props: Record<string | number | symbol, number> | Record<string | number | symbol, number>[]) => void }
declare let shape: (arg?: "CLOSE" | undefined) => void, vertex: (x: number, y: number) => void, arc: (x1: number, y1: number, x2: number, y2: number, r: number) => void, curve: (x1: number, y1: number, x2: number, y2: number, x3?: number | undefined, y3?: number | undefined) => void, circle: (x: number, y: number, r?: number, from?: number | undefined, to?: number | undefined) => void, ellipse: (x: number, y: number, rx?: number, ry?: number, rotation?: number, from?: number | undefined, to?: number | undefined, counterclockwise?: boolean | undefined) => void, rect: (x: number, y: number, w?: number, h?: number, r?: number | undefined) => void
export { getcanvas, pxratio, shape, vertex, arc, curve, line, circle, ellipse, rect, mask, clip, font, settext, text, LINEAR, CONIC, RADIAL, gradient, fill, stroke, clear, bg, frame, loop, stop, looping, animate, CLOSE, PI, TAU }
