declare type Point = { x: number; y: number };
declare type RoundedPoint = Point & { length: number, angle: { main: number, next: number, prev: number }, radius: Point & { length: number, }, offset: number, in: Point, out: Point }
declare type Linked<T> = T & { id: number; next: Linked<T> | null; prev: Linked<T> | null };
declare type LinkedRoundedPoint = Linked<RoundedPoint>;
declare type FindLength = (A: Point, B: Point) => number;
declare type FindAngle = (A: Point, B: Point, C?: Point) => number;
declare type Render = (fn: () => void) => void;

declare const find_length: FindLength;
declare const find_angle: FindAngle;
declare const PI: number, TAU: number, CLOSE = "close";
declare let ctx: CanvasRenderingContext2D, frame: number, looping: boolean;
declare const getcanvas: (w?: number | undefined, h?: number | undefined, id?: string | undefined) => { width: number; height: number; ctx: CanvasRenderingContext2D; canvas: HTMLCanvasElement };
declare const round_shape: (points: Point[], radius: number) => void;
declare const shape: (arg?: string | undefined) => void;
declare const vertex: (x: number, y: number) => void;
declare const arc: (x1: number, y1: number, x2: number, y2: number, r: number) => void;
declare const line: (x1: number, y1: number, x2: number, y2: number) => void;
declare const circle: (x: number, y: number, r?: number) => void;
declare const rect: (x: number, y: number, w?: number, h?: number, r?: number | undefined) => void;
declare const draw: () => void;
declare const fill: (color: string | null) => void;
declare const stroke: (color: string | null, width?: number | undefined) => void;
declare const clear: (x?: number, y?: number, w?: number, h?: number) => void;
declare let play: () => void, stop: typeof play;
declare const loop: Render;
export { getcanvas, ctx, shape, round_shape, vertex, arc, line, circle, rect, fill, stroke, clear, draw, frame, loop, stop, looping, CLOSE, PI, TAU, type Point };
