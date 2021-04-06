import * as Vue from 'vue'

// export declare type DirectiveHook<T = any, Prev = VNode<any, T> | null, V = any> = (el: T, binding: DirectiveBinding<V>, vnode: VNode<any, T>, prevVNode: Prev) => void;

export const hold: Vue.Directive<HTMLElement, (count: number) => unknown> = {
  mounted(el, binding, vnode, prevVNode) {
    let count = 0
    let interval: number
    const tick = Number(binding.arg) ?? 250

    function cleanup() {
      if (!interval) {
        return
      }

      clearInterval(interval)
      count = 0
    }

    el.addEventListener('mousedown', () => {
      interval = setInterval(() => {
        count += 1
        binding.value(count)
      }, tick)
    })

    el.addEventListener('mouseup', cleanup)
    el.addEventListener('mouseleave', cleanup)
  },
}