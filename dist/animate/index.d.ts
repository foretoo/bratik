declare type Obj<T> = Record<string | number | symbol, T>;
declare type Ease = "linear" | "cubicIn" | "cubicOut" | "cubicInOut";
declare type AnimateProps = {
    dur?: number;
    loop?: boolean;
    ease?: Ease;
    onstart?: () => void;
    ontick?: () => void;
    onpause?: () => void;
    onend?: () => void;
};
declare type AnimateData = Required<AnimateProps> & {
    started: boolean;
    paused: boolean;
    ended: boolean;
    frame: number;
    time: number;
    t: number;
    pause: () => void;
    play: () => void;
    on: (target: Obj<unknown> | Obj<unknown>[], props: Obj<number> | Obj<number>[]) => void;
};

declare const animate: ({ dur, loop, ease, onstart, ontick, onpause, onend }?: AnimateProps) => AnimateData;

export { animate };
