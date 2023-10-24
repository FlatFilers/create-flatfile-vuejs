<template >
  <h3>Use an Existing Space</h3>
  <div class="new-space-button-container" >
    <button @click="toggleSpace" v-if="space.space.accessToken !== ''">
      {{ showSpace ? "Close" : "Open" }} space
    </button>
  </div>
  <div v-if="showSpace" class="space-wrapper">
    <UseSpace v-bind="spaceProps" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { UseSpace } from "@flatfile/vue";

const environmentId = import.meta.env.VITE_ENVIRONMENT_ID;
const id = import.meta.env.VITE_SPACE_ID;

const space = ref({
  environmentId,
  space: {
    id,
    accessToken: "",
  }
});

const fetchData = async (spaceId) => {
  const response = await fetch(`/api/spaces/${spaceId}`);
  const json = await response.json();
  if(json.error){
    return
  }
  space.value.space.accessToken = json.space.data.accessToken;
}

const showSpace = ref(false);
const spaceProps = ref({
  ...space.value,
  closeSpace: {
    operation: "submitActionFg",
    onClose: () => {
      showSpace.value = false;
    },
  },
  themeConfig: {
    primaryColor: "#546a76",
    textColor: "#fff",
  },
  displayAsModal: true,
});

fetchData(id).catch(
    (err)=>{
      console.error(err)
    }
  );
const toggleSpace = () => {
  showSpace.value = !showSpace.value;
};
</script>

