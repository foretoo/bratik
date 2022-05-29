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
  canvas, // DOM element
  ctx,    // CanvasRenderingContext2D
  width,  // width of window
  height  // height of window
} = getcanvas()
```
### Pixel ratio
get/set, default: client device pixel ratio
```javascript
// get
const pr = pxratio()
// set
pxratio(2)
```
### Looper
loop takes a callback to run every animation frame
```javascript
let x = 20
const play = () => {
  clear()
  stroke(null)
  fill("red")
  circle(x++, height / 2, 10)
  if (frame === 180) x = 20
}
loop(play)
```
### Animate
takes duration in ms, an ease tag (default: "cubicOut"), and a callback to run every animation frame, returns a function that takes optionally a target object with props to animate from and an object with props to animate to
```javascript
const
  particle = { x: 10, y: height / 2 },
  sinMove = (t) => {
    const R = (1 - t) * 255, G = 0, B = t * 255
    fill(`rgb(${R},${G},${B})`)
    particle.y = height / 2 + Math.sin(t * TAU) * (height / 2 - 10)
    particle.x = width / 2 + Math.cos(t * TAU) * (width / 2 - 10)
  },
  move = animate(1000, "cubicInOut", sinMove)

stroke(null)
loop(() => circle(particle.x, particle.y, 10))
move()
```
```javascript
// OR
const
  particle = { x: 10, y: 10 },
  move = animate(1000)

stroke(null)
fill("black")
loop(() => circle(particle.x, particle.y, 10))
move(particle, { x: width - 10, height - 10 })
```
### Shape
first call shape to initiate it, then you may call either vertex() and arc(), once shape is finished call it again, provide CLOSE arg to close it if needed.
```javascript
const
  radius = 50,
  sidesnum = 6,
  angle = TAU / sidesnum,
  offset = PI / 2,
  { cos, sin } = Math,
  [ cx, cy ] = [ width / 2, height / 2 ],

  vx = (i) => cx + cos(angle * i + offset) * radius,
  vy = (i) => cy + sin(angle * i + offset) * radius

shape()
for (let i = 0; i < sidesnum; i++) {
  if (i % 2 === 0)
    vertex(vx(i), vy(i))
  else
    arc(vx(i), vy(i), vx(i + 1), vy(i + 1), radius)
}
shape(CLOSE)
```