export interface InRectOptions {
  vThreshold?: number
  hThreshold?: number
  log?: boolean
}

export function inRect (event: DragEvent,  rect: DOMRect,  options?: InRectOptions) {
  const { clientX, clientY } = event
  const { vThreshold = 1, hThreshold = 1 } = options ?? {}

  // const left = rect.x
  // const right = rect.x + rect.width
  // const top = rect.y
  // const bottom = rect.y + rect.height

  const tightLeft = rect.x + (rect.width - (hThreshold * rect.width))
  const tightRight = rect.x + (rect.width * hThreshold) 
  const tightTop = rect.y + (rect.height - (vThreshold * rect.height))
  const tightBottom = rect.y + (rect.height * vThreshold)


  return (
    clientX > tightLeft // left
    && clientX < tightRight // right
    && clientY > tightTop // top
    && clientY < tightBottom // bottom
  )

  // return (
  //   clientX > left // left
  //   && clientX < right // right
  //   && clientY > top // top
  //   && clientY < bottom // bottom
  // )
}