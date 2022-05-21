const PI = Math.PI, TAU = PI * 2;
const CLOSE = "close";

let width, height, canvas, ctx, frame = 0, looping = false;
const getcanvas = (w, h, id) => {
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  document.body.prepend(canvas);
  canvas.setAttribute("id", id ? id : "canvas");
  if (w) {
    width = w;
    height = h ? h : width;
    canvas.setAttribute("style", `width:${width}px;height:${height}px;`);
    canvas.setAttribute("width", width.toString());
    canvas.setAttribute("height", height.toString());
  } else {
    canvas.setAttribute("style", "width:100%;height:100%;");
    ({ width, height } = canvas.getBoundingClientRect());
    canvas.setAttribute("width", width.toString());
    canvas.setAttribute("height", height.toString());
  }
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.imageSmoothingEnabled = true;
  return { width, height, ctx, canvas };
};
let shaping = false;
const shape = (arg) => {
  if (arg === "close")
    ctx.closePath();
  if (shaping) {
    shaping = false;
    draw();
  } else
    ctx.beginPath();
};
const vertex = (x, y) => {
  if (shaping)
    ctx.lineTo(x, y);
  else {
    shaping = true;
    ctx.moveTo(x, y);
  }
};
const arc = (x1, y1, x2, y2, r) => {
  ctx.arcTo(x1, y1, x2, y2, r);
};
const line = (x1, y1, x2, y2) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  draw();
};
const circle = (x, y, r = 10) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  draw();
};
const rect = (x, y, w = 20, h = 20, r) => {
  ctx.beginPath();
  if (r) {
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
  } else
    ctx.rect(x, y, w, h);
  draw();
};
const font = (size, family, options) => {
  let fontsize = "", fontoptions = options ? options : "", fontfamily = family ? family : "sans-serif";
  if (typeof size === "number")
    fontsize = size.toString() + "px";
  if (typeof size === "string") {
    const temp = size.match(/^(\d+)([a-z%]*)\/?(\d*)([a-z%]*)$/);
    if (temp) {
      fontsize = temp[1];
      fontsize += temp[2] ? temp[2] : "px";
      if (temp[3]) {
        fontsize += `/${temp[3]}`;
        fontsize += temp[4] ? temp[4] : "px";
      }
    }
  }
  ctx.font = `${fontoptions} ${fontsize} ${fontfamily}`.trim();
};
let text_width;
const settext = (align, base, width2) => {
  ctx.textAlign = align || "start";
  ctx.textBaseline = base || "alphabetic";
  text_width = width2;
};
const text = (content, x, y, width2) => {
  ctx.fillText(content, x, y, width2 || text_width);
  ctx.strokeText(content, x, y, width2 || text_width);
};
const draw = () => {
  ctx.fill();
  ctx.stroke();
};
const fill = (color) => {
  if (color === null)
    ctx.fillStyle = "transparent";
  else
    ctx.fillStyle = color;
};
const stroke = (color, width2) => {
  if (color === null)
    ctx.strokeStyle = "transparent";
  else
    ctx.strokeStyle = color;
  if (width2 !== void 0)
    ctx.lineWidth = width2;
};
const clear = (x = 0, y = 0, w = width, h = height) => {
  ctx.clearRect(x, y, w, h);
};
let play, stop;
const loop = (drawingCallBack) => {
  looping = true;
  let rAFid;
  play = () => {
    frame++;
    drawingCallBack();
    rAFid = requestAnimationFrame(play);
  };
  stop = () => {
    looping = false;
    cancelAnimationFrame(rAFid);
  };
  play();
};

export { CLOSE, PI, TAU, arc, circle, clear, ctx, draw, fill, font, frame, getcanvas, line, loop, looping, rect, settext, shape, stop, stroke, text, vertex };
