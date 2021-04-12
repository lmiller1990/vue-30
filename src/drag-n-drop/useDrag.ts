import { ref } from 'vue'

export function inRect (event: DragEvent, rect: DOMRect, threshold: number = 1, log: boolean = false) {
  const { pageX, pageY } = event

  const left = rect.x
  const right = rect.x + rect.width
  const top = rect.y
  const bottom = rect.y + rect.height

  const tightLeft = rect.x + (rect.width - (threshold * rect.width))
  const tightRight = rect.x + (rect.width * threshold) 
  const tightTop = rect.y + (rect.height - (threshold * rect.height))
  const tightBottom = rect.y + (rect.height * threshold)


  return (
    pageX > tightLeft // left
    && pageX < tightRight // right
    && pageY > tightTop // top
    && pageY < tightBottom // bottom
  )
}