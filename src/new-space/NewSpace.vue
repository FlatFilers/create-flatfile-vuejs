<script setup>
import { ref } from 'vue';
import { UseSpace } from '@flatfile/vue';
import { config as workbook } from "/src/config";
import { listener } from '/src/listeners/listener';

const environmentId = import.meta.env.VITE_ENVIRONMENT_ID;
const publishableKey = import.meta.env.VITE_PUBLISHABLE_KEY;


const showSpace = ref(false);
const spaceProps = ref({
  name: 'Vue Space',
  environmentId,
  publishableKey,
  closeSpace: {
    operation: 'submitActionFg',
    onClose: () => { showSpace.value = false; },
  },
  workbook,
  listener,
  autoconfigure:true,
  themeConfig: { primaryColor: "#546a76", textColor: "#fff" },
  userInfo: {
    name: 'username'
  },
  spaceInfo: {
    name: 'space info'
  },
  displayAsModal: true,
  spaceBody: {
    metadata: {
      random: 'param'
    }
  },
  
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
