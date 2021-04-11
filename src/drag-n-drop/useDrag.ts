import { ref } from 'vue'

const dragItemId = ref<string | null>(null)

class EventBus {
  subscriptions: Record<string, any> = { };

  subscribe = (eventType: string, callback: any) => {
    const id = Symbol('id');
    if (!this.subscriptions[eventType]) this.subscriptions[eventType] = { };
    this.subscriptions[eventType][id] = callback;
    return {
      unsubscribe: () => {
        delete this.subscriptions[eventType][id];
        if (Object.getOwnPropertySymbols(this.subscriptions[eventType]).length === 0) {
          delete this.subscriptions[eventType];
        }
      },
    };
  };

  publish = (eventType: string, arg: any) => {
    if (!this.subscriptions[eventType]) return

    Object.getOwnPropertySymbols(this.subscriptions[eventType])
      .forEach(key => this.subscriptions[eventType][key](arg))
  }
}

const bus = new EventBus()

export function useDrag() {
  const triggerSwap = (dragSrcKey: any, dragDestKey: any) => {
    bus.publish('swap', { dragSrcKey, dragDestKey })
  }

  return {
    dragItemId,
    bus,
    triggerSwap,
  }
}

export function getDelta (event: MouseEvent, element: HTMLDivElement) {
  const rect = element.getBoundingClientRect()
  const dx = Math.abs(rect.x + rect.width / 2 - event.pageX)
  const dy = Math.abs(rect.y + (rect.height / 2) - event.pageY)
  const delta = Math.sqrt((dx ** 2) + (dy ** 2))
  return Math.round(delta)
}

export function inRect (event: DragEvent, rect: DOMRect) {
  return event.pageX > rect.x 
    && event.pageX < rect.x + rect.width
    && event.pageY > rect.y
    && event.pageY < rect.y + rect.height
}