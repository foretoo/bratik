declare const PI: number, TAU: number, CLOSE = "close";
declare let frame: number, looping: boolean;

declare const getcanvas: (w?: number | undefined, h?: number | undefined, id?: string | undefined) => { width: number; height: number; ctx: CanvasRenderingContext2D; canvas: HTMLCanvasElement };
declare const shape: (arg?: string | undefined) => void;
declare const vertex: (x: number, y: number) => void;
declare const arc: (x1: number, y1: number, x2: number, y2: number, r: number) => void;

declare const line: (x1: number, y1: number, x2: number, y2: number) => void;
declare const circle: (x: number, y: number, r?: number) => void;
declare const rect: (x: number, y: number, w?: number, h?: number, r?: number | undefined) => void;

declare const font: (size: number | string, family?: string | undefined, options?: string | undefined) => void;
declare const settext: (align: CanvasTextAlign, base?: CanvasTextBaseline | undefined, width?: number | undefined) => void;
declare const text: (content: string, x: number, y: number, width?: number | undefined) => void;

declare const fill: (color: string | null) => void;
declare const stroke: (color: string | null, width?: number | undefined) => void;
declare const clear: (x?: number, y?: number, w?: number, h?: number) => void;

declare const stop: () => void;
declare const loop: (drawingCallBack: FrameRequestCallback) => void;
declare const animate: (duration?: number, ease?: string, callback?: ((time: number, t: number) => void) | undefined) => (target: Record<string | number | symbol, unknown>, prop: Record<string | number | symbol, number>) => void;

export { getcanvas, shape, vertex, arc, line, circle, rect, font, settext, text, fill, stroke, clear, frame, loop, stop, looping, animate, CLOSE, PI, TAU };
