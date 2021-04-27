<template>
  <div class="bg-purple-500 h-full flex flex-col items-center">
    <div class="max-w-3xl">
      <Section>
        <div class="bg-white rounded-lg">
          <div class="rounded-lg mx-8 mt-8">
            <img src="/banner.jpg">
          </div>
          <div class="flex justify-center text-left">
            <div class="p-4">
              <!-- <h4 class="text-3xl p-6">30 days and 30 skills to take your skills to the next level.</h4> -->
              <img src="/banner.jpg" class="rounded-md">
              
              <div class="text-lg">
                <para>
                  Sick of "advanced" tutorials showing you have to use <code>v-for</code> 
                  or telling you the difference between <code>v-if</code> and <code>v-show</code>?
                </para>
                <para>
                  Time to go a bit deeper and see the depth of expression Vue.js really wants you to have.
                </para>
                <para>
                   Build projects that explore a variety of technical skills, including...
                   <ul class="list-disc list-inside my-2">
                     <li>
                       advanced slot usage
                     </li>
                     <li>
                       render functions
                     </li>
                     <li>
                      custom directives
                     </li>
                     <li>
                      bundling libraries for npm
                     </li>
                     <li>
                      optimizing builds
                     </li>
                     <li>
                       authoring components for design system
                     </li>
                     <li>
                       implementing your own Vuex
                     </li>
                     <li>
                       exploring Vue internals
                     </li>
                   </ul>
                </para>
                <para>
                  ... and heaps more! The really fun stuff other courses won't teach you.
                </para>

                <para class="text-sm">
                  <em>This course is a work in progress. Got a suggestion for content? 
                    Something you'd like to see?
                    <a class="underline" href="https://twitter.com/Lachlan19900">Let me know!</a>
                  </em>
                </para>
              </div>

              <div class="flex justify-center flex flex-col items-center">
                <p class="m-1">Get updates and early access.</p>
                <form class="h-10 flex">
                  <label for="email" class="hidden">Email</label>
                  <input
                    type="email"
                    for="email"
                    placeholder="Email"
                    class="border-2 border-black rounded-l-md p-2 text-lg h-full"
                  />
                  <button class="bg-blue-500 text-white h-full p-2 rounded-r">Submit</button>
                </form>
                <a class="underline text-sm mt-1">Unsubscribe</a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <VHoldSection />
      <VDragSection />
      <TransitionsSection />

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from './Card.vue'
import { Para, Section } from './sharedComponents'

import Powerbar from '../v-hold-directive/power-bar.vue'
import VHoldSection from './VHoldSection.vue'
import TransitionsSection from './TransitionsSection.vue'
import VDragSection from './VDragSection.vue'
import 'highlight.js/styles/atom-one-dark.css'


export default defineComponent({
  components: {
    Card,
    Powerbar,
    VDragSection,
    VHoldSection,
    TransitionsSection,
    Section,
    Para
  },
})
</script>

<style>
  .code {
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;
  }
</style>
