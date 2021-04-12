import { FunctionalComponent, h } from 'vue'

export const Section: FunctionalComponent = (props, { slots }) => {
  return h('section', { class: 'text-center w-full my-6 shadow-lg' }, slots.default && h(slots.default))
}

export const Para: FunctionalComponent = (props, { slots }) => {
  return h('p', { class: 'my-2' }, slots.default && h(slots.default))
}

