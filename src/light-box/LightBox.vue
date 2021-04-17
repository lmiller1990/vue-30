<template>
  <teleport to="#light-box">
    <div class="lb__bg fixed h-full w-full flex items-center px-12" @click.self="close">
      <arrow 
        :rotate="180" 
        @click="previous"
      />
      <div class="rounded-lg w-full flex justify-center px-4">
        <div class="inline-block rounded-lg overflow-hidden">
          <img 
            :src="currentImage" 
            class="object-contain w-full"
            :class="{ 'fade-in': fadeIn }"
          />
        </div>
      </div>
      <arrow 
        @click="next"
      />
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, FunctionalComponent, h, ref } from 'vue'

const Arrow: FunctionalComponent<{ rotate: number }> = (props) => {
  return h(
    'button',
    h('img', { class: 'lb__arrow', src: '/arrow.png', style: { transform: `rotate(${props.rotate}deg)` } })
  )
}

export default defineComponent({
  components: {
    Arrow,
  },

  props: {
    images: {
      type: Array as () => string[],
      required: true
    },
    defaultImage: {
      type: String,
    }
  },

  setup(props, ctx) {
    const fadeIn = ref(false)
    const currentIndex = ref(props.images.findIndex(x => x === props.defaultImage) ?? 0) 

    const currentImage = computed(() => {
      return props.images[currentIndex.value]
    })

    const setFadeIn = () => {
      fadeIn.value = true
      setTimeout(() => {
        fadeIn.value = false
      }, 500)
    }

    const next = () => {
      if (currentIndex.value + 1 < props.images.length) {
        currentIndex.value += 1
        setFadeIn()
      }
    }

    const previous = () => {
      if (currentIndex.value > 0) {
        currentIndex.value -= 1
        setFadeIn()
      }
    }

    const close = () => {
      ctx.emit('close')
    }

    return {
      close,
      fadeIn,
      currentImage,
      previous,
      next
    }
  }
})
</script>

<style>
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-in {
  animation: fade-in 0.5s;
}

.lb__arrow {
  height: 50px;
}

.lb__bg {
  background: rgba(0, 0, 0, 0.9);
}

img {
  max-height: 80vh;
}
</style>
