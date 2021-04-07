import { defineComponent, h } from 'vue'

export const TabContainer = defineComponent({
  name: 'TabContainer',
  props: ['modelValue'],
  setup(props, ctx) {
    const slots = ctx?.slots?.default?.() ?? []
    const Tabs = slots.filter(x => x.type === Tab)
    const TabContents = slots.filter(x => x.type === TabContent)

    const $tabs = Tabs.map(tab => {
      return h('div', 
        {
          onClick: () => {
            ctx.emit('update:modelValue', tab.props?.tabId)
          },
        },
        h(tab)
      )
    })

    const $contents = TabContents.map(content => {
      return h('div', h(content))
    })

    return () => [$tabs, $contents]
  }
})

export const Tab = defineComponent({
  props: ['tabId'],
  emits: ['click'],
  name: 'Tab',
  setup(props, ctx) {
    return () => ctx.slots?.default?.()
  }
})

export const TabContent = defineComponent({
  name: 'TabContent',
  props: ['tabId'],
  setup(props, ctx) {
    return () => ctx.slots?.default?.()
  }
})
