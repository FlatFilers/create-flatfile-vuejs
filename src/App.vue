<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import NewSpace from './new-space/NewSpace.vue'
import ExistingSpace from './existing-space/ExistingSpace.vue'
import '/src/styles.css'

const routes = {
  '/': Home,
  '/new-space': NewSpace,
  '/existing-space': ExistingSpace,
}

const currentPath = ref(window.location.hash);
console.log(currentPath)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
});
</script>

<template>
  <div class="main">
    <h2>
      <code>&lt;Flatfile /&gt;</code>
    </h2>
    <p>Embed Flatfile in just a few lines of code.</p>
    <nav class="navbar">
      <a href="#/">Home</a>
      <a href="#/new-space">Embed a New Space</a>
      <a href="#/existing-space">Embed a Existing Space</a>
      <component :is="currentView" />
    </nav>
  </div>
</template>