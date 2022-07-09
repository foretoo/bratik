declare const PI: number;
declare const TAU: number;
declare const CLOSE = "CLOSE";

declare type GradientType = "LINEAR" | "CONIC" | "RADIAL";
declare type Gradient = {
    image: CanvasGradient;
    reset: (...options: number[]) => void;
    add: (offset: number, color: string) => void;
};

declare let frame: number;
declare let looping: boolean;
declare const getcanvas: (w?: number, h?: number, id?: string) => {
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
};
declare const pxratio: (val?: number) => number;
declare const line: (x1: number, y1: number, x2: number, y2: number) => void;
declare const mask: (tag?: "CLOSE") => void;
declare const clip: () => void;
declare const font: (size: number | string, family?: string, options?: string) => void;
declare const settext: (align: CanvasTextAlign, base?: CanvasTextBaseline, width?: number) => void;
declare const text: (content: string | number, x: number, y: number, width?: number) => void;
declare const LINEAR = "LINEAR";
declare const CONIC = "CONIC";
declare const RADIAL = "RADIAL";
declare const gradient: (type: GradientType, ...options: number[]) => Gradient;
declare const fill: (color: string | CanvasGradient | CanvasPattern | null) => void;
declare const stroke: (color: string | CanvasGradient | CanvasPattern | null, width?: number, cap?: CanvasLineCap, join?: CanvasLineJoin) => void;
declare const clear: (x?: number, y?: number, w?: number, h?: number) => void;
declare const bg: (color: string | CanvasGradient | CanvasPattern) => void;
declare const stop: () => void;
declare const loop: (drawingCallBack: FrameRequestCallback) => void;
declare let shape: (arg?: "CLOSE") => void;
declare let vertex: (x: number, y: number) => void;
declare let arc: (x1: number, y1: number, x2: number, y2: number, r: number) => void;
declare let curve: (x1: number, y1: number, x2: number, y2: number, x3?: number, y3?: number) => void;
declare let circle: (x: number, y: number, r?: number, from?: number, to?: number) => void;
declare let ellipse: (x: number, y: number, rx?: number, ry?: number, rotation?: number, from?: number, to?: number, counterclockwise?: boolean) => void;
declare let rect: (x: number, y: number, w?: number, h?: number, r?: number) => void;

export { CLOSE, CONIC, LINEAR, PI, RADIAL, TAU, arc, bg, circle, clear, clip, curve, ellipse, fill, font, frame, getcanvas, gradient, line, loop, looping, mask, pxratio, rect, settext, shape, stop, stroke, text, vertex };
