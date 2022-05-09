let width: number,
    height: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D



const getcanvas = (w?: number, h?: number, id?: string) => {

  canvas = document.createElement("canvas")
  ctx = canvas.getContext("2d")!
  document.body.prepend(canvas)
  canvas.setAttribute("id", id ? id : "canvas")

  if (w) {
    width = w
    height = h ? h : width
    canvas.setAttribute("style", `width:${width}px;height:${height}px;`)
    canvas.setAttribute("width", width.toString())
    canvas.setAttribute("height", height.toString())
  }
  else {
    canvas.setAttribute("style", "width:100%;height:100%;");
    ({ width, height } = canvas.getBoundingClientRect())
    canvas.setAttribute("width", width.toString())
    canvas.setAttribute("height", height.toString())
  }
  ctx.fillStyle = "white"
  ctx.strokeStyle = "black"
  return { width, height, ctx, canvas }
}



const draw = () => {
  ctx.fill()
  ctx.stroke()
}
const fill = (color = "white") => {
  ctx.fillStyle = color
}
const stroke = (color = "black") => {
  ctx.strokeStyle = color
}



export {
  getcanvas,
  fill,
  stroke,
}