export function inRect (event: DragEvent, rect: DOMRect, threshold: number = 1, log: boolean = false) {
  const { clientX, clientY } = event

  const left = rect.x
  const right = rect.x + rect.width
  const top = rect.y
  const bottom = rect.y + rect.height

  const tightLeft = rect.x + (rect.width - (threshold * rect.width))
  const tightRight = rect.x + (rect.width * threshold) 
  const tightTop = rect.y + (rect.height - (threshold * rect.height))
  const tightBottom = rect.y + (rect.height * threshold)


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