<script setup>
import { ref } from 'vue';
import { UseSpace } from '@flatfile/vue';

const environmentId = import.meta.env.VITE_ENVIRONMENT_ID;
const spaceId = import.meta.env.VITE_SPACE_ID;

const showSpace = ref(false);
const spaceProps = ref({
  environmentId,
  spaceId,
  closeSpace: {
    operation: 'submitActionFg',
    onClose: () => { showSpace.value = false; },
  },
  themeConfig: { 
    primaryColor: "#546a76", 
    textColor: "#fff" 
  },
  displayAsModal: true,
});

const toggleSpace = () => {
  showSpace.value = !showSpace.value;
};
</script>

<template>
  <div class="new-space-button-container">
    <button @click="toggleSpace">{{ showSpace ? 'Close' : 'Open' }} space</button>
  </div>
  <div v-if="showSpace" class="space-wrapper">
    <UseSpace v-bind="spaceProps" />
  </div>
</template>