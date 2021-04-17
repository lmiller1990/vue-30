import { onMounted, onUnmounted } from 'vue'

export function useEventListener<E extends keyof DocumentEventMap>(
  doc: Document,
  event: E,
  handler: (event: DocumentEventMap[E]) => any,
) {

  onMounted(() => {
    doc.addEventListener(event, handler)
  })

  onUnmounted(() => {
    doc.removeEventListener(event, handler)
  })
}

export function useKeyPress(key: string, callback: () => void) {
  const handler = (event: KeyboardEvent) => {
    if (event.key === key) {
      callback()
    }
  }

  return useEventListener(document, 'keyup', handler)
}
