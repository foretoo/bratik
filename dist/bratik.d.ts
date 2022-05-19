declare const PI: number, TAU: number;
declare const CLOSE = "close";

declare type Point = { x: number; y: number };
declare type RoundedPoint = Point & { angles: { main: number; next: number; prev: number; bis: number; dir: number }; radius: Point & { size: number; hit: number }; vel: number; offset: number; in: Point & { length: number; rest: number }; out: Point & { length: number; rest: number }; locked: boolean };
declare type Linked<T> = T & { id: number; next: Linked<T>; prev: Linked<T> };
declare type Render = (fn: () => void) => void;

declare let ctx: CanvasRenderingContext2D, frame: number, looping: boolean;
declare const getcanvas: (w?: number | undefined, h?: number | undefined, id?: string | undefined) => { width: number; height: number; ctx: CanvasRenderingContext2D; canvas: HTMLCanvasElement };
declare const round_shape: (points: Point[], radius: number) => Linked<RoundedPoint>[];
declare const shape: (arg?: string | undefined) => void;
declare const vertex: (x: number, y: number) => void;
declare const arc: (x1: number, y1: number, x2: number, y2: number, r: number) => void;
declare const line: (x1: number, y1: number, x2: number, y2: number) => void;
declare const circle: (x: number, y: number, r?: number) => void;
declare const rect: (x: number, y: number, w?: number, h?: number, r?: number | undefined) => void;
declare const font: (size: number | string, family?: string | undefined, options?: string | undefined) => void;
declare const settext: (align: CanvasTextAlign, base?: CanvasTextBaseline | undefined, width?: number | undefined) => void;
declare const text: (content: string, x: number, y: number, width?: number | undefined) => void;
declare const draw: () => void;
declare const fill: (color: string | null) => void;
declare const stroke: (color: string | null, width?: number | undefined) => void;
declare const clear: (x?: number, y?: number, w?: number, h?: number) => void;
declare let play: () => void, stop: typeof play;
declare const loop: Render;

export { getcanvas, ctx, shape, round_shape, vertex, arc, line, circle, rect, font, settext, text, fill, stroke, clear, draw, frame, loop, stop, looping, CLOSE, PI, TAU, type Point };
