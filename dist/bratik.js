const find_length = (A, B) => Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
const find_angle = (A, B, C) => {
  if (!C)
    return Math.atan2(B.y - A.y, B.x - A.x);
  else {
    const AB = find_length(A, B), BC = find_length(B, C), CA = find_length(C, A);
    return Math.acos((AB * AB + BC * BC - CA * CA) / (2 * AB * BC));
  }
};

const round_shape = (points, radius) => {
  ctx.beginPath();
  const rounded = points.map((curr, i) => {
    const prev = points[(i - 1 + points.length) % points.length], next = points[(i + 1) % points.length], angle_main = find_angle(prev, curr, next), angle_next = find_angle(curr, next), angle_prev = find_angle(prev, curr), offset = radius / Math.tan(angle_main / 2);
    return {
      id: i,
      ...curr,
      radius,
      offset,
      in: {
        x: curr.x - Math.cos(angle_prev) * offset,
        y: curr.y - Math.sin(angle_prev) * offset
      },
      out: {
        x: curr.x + Math.cos(angle_next) * offset,
        y: curr.y + Math.sin(angle_next) * offset
      },
      get prev() {
        return rounded[(i - 1 + points.length) % points.length];
      },
      get next() {
        return rounded[(i + 1) % points.length];
      }
    };
  });
  rounded.forEach((p, i) => {
    if (!i)
      ctx.moveTo(p.in.x, p.in.y);
    ctx.arcTo(p.x, p.y, p.next.x, p.next.y, radius);
    ctx.lineTo(p.next.in.x, p.next.in.y);
  });
  draw();
};

const PI = Math.PI, TAU = PI * 2;
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
const CLOSE = "close";
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

export { CLOSE, PI, TAU, arc, circle, clear, ctx, draw, fill, frame, getcanvas, line, loop, looping, rect, round_shape, shape, stop, stroke, vertex };
