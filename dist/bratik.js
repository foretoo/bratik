const PI = Math.PI, TAU = PI * 2;
const CLOSE = "close";

const find_length = (A, B) => Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
const find_angle = (A, B, C) => {
  if (!C)
    return Math.atan2(B.y - A.y, B.x - A.x);
  else {
    const AB = find_length(A, B), BC = find_length(B, C), CA = find_length(C, A);
    return Math.acos((AB * AB + BC * BC - CA * CA) / (2 * AB * BC));
  }
};
const get_clock_dir = (angle1, angle2) => {
  const angle_diff = angle2 - angle1;
  return angle_diff > PI && angle_diff < TAU || angle_diff < 0 && angle_diff > -PI ? -1 : 1;
};

const round_shape = (points, radius) => {
  const rounded_points = points.reduce((shape, curr, i) => {
    const prev = points[(i - 1 + points.length) % points.length], next = points[(i + 1) % points.length], length = find_length(curr, next), angle = {
      main: find_angle(prev, curr, next),
      next: (find_angle(next, curr) + PI) % TAU,
      prev: (find_angle(prev, curr) + PI) % TAU
    }, offset = radius / Math.tan(angle.main / 2), bis_length = radius / Math.sin(angle.main / 2), clock_dir = get_clock_dir(angle.prev, angle.next), angle_bis = angle.prev + clock_dir * angle.main / 2;
    return shape.concat({
      id: i,
      ...curr,
      length,
      offset,
      angle,
      radius: {
        length: radius,
        x: curr.x + Math.cos(angle_bis) * bis_length,
        y: curr.y + Math.sin(angle_bis) * bis_length
      },
      in: {
        x: curr.x + Math.cos(angle.prev) * offset,
        y: curr.y + Math.sin(angle.prev) * offset
      },
      out: {
        x: curr.x + Math.cos(angle.next) * offset,
        y: curr.y + Math.sin(angle.next) * offset
      },
      get prev() {
        return rounded_points[(i - 1 + points.length) % points.length];
      },
      get next() {
        return rounded_points[(i + 1) % points.length];
      }
    });
  }, []);
  return rounded_points;
};

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
