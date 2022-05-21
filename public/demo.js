import { getcanvas, circle, shape, vertex, CLOSE, clear, fill, stroke, arc } from "../dist/bratik.es.js";
import { round_shape } from "./round-shape.js";
const { canvas } = getcanvas(), points = [], grey = "#0007", bluish = "#00f7";
let polygon = [];
canvas.onpointerdown = (e) => {
    const point = { x: e.pageX, y: e.pageY };
    assign_value(point, points, 9);
    polygon = round_shape(points, +radiusrange.value);
    draw();
};
const radiusrange = document.querySelector("input");
const radiusvalue = document.querySelector("#radiusvalue");
radiusvalue.textContent = radiusrange.value;
radiusrange.oninput = (e) => {
    const target = e.target;
    radiusvalue.textContent = target.value;
    polygon = round_shape(points, +radiusrange.value);
    draw();
};
const draw = () => {
    clear();
    stroke(grey, 0.5);
    fill(null);
    shape();
    points.forEach((p) => vertex(p.x, p.y));
    shape(CLOSE);
    stroke(null);
    fill(grey);
    points.forEach((p) => circle(p.x, p.y, 1));
    if (points.length > 2) {
        fill(bluish);
        stroke("blue", 1);
        shape();
        polygon.forEach((p, i) => {
            if (!i)
                vertex(p.in.x, p.in.y);
            arc(p.x, p.y, p.next.x, p.next.y, p.radius.size);
            vertex(p.next.in.x, p.next.in.y);
        });
        shape(CLOSE);
    }
};
const assign_value = (value, arr, length) => {
    if (arr.length < length)
        arr.push(value);
    else {
        for (let i = 0; i < arr.length - 1; i++) {
            arr[i] = arr[i + 1];
        }
        arr[length - 1] = value;
    }
};
