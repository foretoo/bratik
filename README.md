# bratik
Tiny, p5.js-like, typed toolkit to cakewalk through 2d canvas context.  
see [Demo page](https://foretoo.github.io/bratik).

## Installation

by npm:
```
npm i bratik
```
and then
```javascript
import { getcanvas } from "bratik"
```
or if you don't use npm you can import module from unpkg:
```javascript
import { getcanvas } from "https://unpkg.com/bratik@latest/lib/bratik.es.js"
```
or by script tag in your html page:
```html
<script src="https://unpkg.com/bratik@latest/lib/bratik.iife.js"></script>
```
This will create the global variable `bratik`

## Usage

bratik exports:
```javascript
{ getcanvas, pxratio, shape, vertex, arc, line, circle, rect, font, settext, text, fill, stroke, clear, frame, loop, stop, looping, animate, CLOSE, PI, TAU }
```
### Canvas creation
it takes two optional args: width, height
```javascript
getcanvas(100, 100)

// OR
const {
  canvas, // DOM element with width and height of window
  ctx,    // CanvasRenderingContext2D
  width,  // width of window
  height  // height of window
} = getcanvas()
```
### Pixel ratio, fill, stroke
get/set, default: client device pixel ratio
```javascript
// get
const pr = pxratio()
// set
pxratio(2)
```
stroke takes color, width, lineCap, and lineLoin. fill takes color. you can provide null to stroke and fill, to delete them.
### Looper
loop takes a callback to run every animation frame. Call stop to stop the sloop.
```javascript
let x = 20
const play = () => {
  clear()
  stroke(null)
  fill("red")
  circle(x++, height / 2, 10)
  if (frame === 180) stop()
}
loop(play)
```
### Animate
takes duration in ms, an ease tag (default: "cubicOut"), and a callback (which takes animation tick, from 0 to 1, as an argument) to run every animation frame, returns a function that takes optionally a target object with props to animate from and an object with props to animate to (gsap-like)
```javascript
const
  particle = { x: 10, y: height / 2 },
  circMove = (t) => {
    const R = (1 - t) * 255, G = 0, B = t * 255
    fill(`rgb(${R},${G},${B})`)
    particle.y = height / 2 + Math.sin(t * TAU) * (height / 2 - 10)
    particle.x = width / 2 + Math.cos(t * TAU) * (width / 2 - 10)
  },
  move = animate(1000, "cubicInOut", circMove)

stroke(null)
loop(() => circle(particle.x, particle.y, 10))
move()
```
or just
```javascript
const
  particle = { x: 10, y: 10 },
  move = animate(1000)

stroke(null)
fill("black")
loop(() => circle(particle.x, particle.y, 10))
move(particle, { x: width - 10, height - 10 })
```
### Shape, circle, rect, line
first call shape to initiate it, then you may call vertex() or arc(), once shape is finished call it again, provide CLOSE tag as a parameter to close it if needed.
```javascript
const
  radius = 50,
  sidesnum = 6,
  angle = TAU / sidesnum,
  offset = PI / 2,

  vx = (i) => width / 2 + Math.cos(angle * i + offset) * radius,
  vy = (i) => height / 2 + Math.sin(angle * i + offset) * radius

shape()
for (let i = 0; i < sidesnum; i++) {
  i % 2 === 0
    ? vertex(vx(i), vy(i))
    : arc(vx(i), vy(i), vx(i + 1), vy(i + 1), radius)
}
shape(CLOSE)
```
cirlce takes x, y of center and radius. rect takes x, y, width, height and optionally radius if you want rounded corners. line takes x1, y1, x2, y2.
```javascript
const
  size = 20,
  cx = width / 2,
  cy = height / 2

  vx = (x, len) => x + Math.cos(frame * 0.01) * len
  vy = (y, len) => y + Math.sin(frame * 0.01) * len

stroke("black", 2)
fill("white")
loop(() => {
  clear()
  rect(cx - size, cy - size, size * 2, size * 2, 5)
  circle(cx, cy, size)
  line(cx, cy, vx(cx, size), vy(cy, size))
})
```
### Text
font takes size (number or string, to set line height provide it after slash like this "16/20"), family, and options like "bold". settext takes CanvasTextAlign, optionally CanvasTextBaseline and width. text takes string of content, x and y of its pivot and optionally width.
```javascript
stroke(null)
fill("blue")
font(21, "monospace", "italic")
settext("center", "middle")
text("Hello world!", width / 2, height / 2)
```