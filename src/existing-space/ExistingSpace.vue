<script setup>
import { ref } from 'vue';
import { UseSpace } from '@flatfile/vue';

const showSpace = ref(false);
const spaceProps = ref({

});

const toggleSpace = () => {
  showSpace.value = !showSpace.value;
};
</script>

<template>
  <div v-if="showSpace" class="space-wrapper">
    <UseSpace v-bind="spaceProps" />
  </div>
</template>