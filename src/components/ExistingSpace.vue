<script setup>
import { ref } from "vue";
import { UseSpace } from "@flatfile/vue";
import { getCurrentInstance } from "vue";

const environmentId = import.meta.env.VITE_ENVIRONMENT_ID;
const spaceId = import.meta.env.VITE_SPACE_ID;

const space = ref({
  environmentId,
  space: {
    id: spaceId,
    accessToken: "",
  }
});

const spaceInfo = ref({
  spaceId,
  accessToken: "",
  environmentId,
})

const fetchData = async (spaceId) => {
  const response = await fetch(`/api/spaces/${spaceId}`);
  const json = await response.json();
  if(json.error){
    console.error(json);
    return
  }
  space.value.space.accessToken = json.space.data.accessToken;
  spaceInfo.value.accessToken = json.space.data.accessToken;
  console.log(space.value)
  console.log(spaceInfo.value)

}

const showSpace = ref(false);
console.log(spaceInfo)
const spaceProps = ref({
  spaceInfo,
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
fetchData(spaceId).catch(
    (err)=>{
      console.error(err)
    }
  );
const toggleSpace = () => {
  
  showSpace.value = !showSpace.value;
};
</script>

<template >
  <div class="new-space-button-container" >
    <button @click="toggleSpace" v-if="spaceInfo.accessToken !== ''">
      {{ showSpace ? "Close" : "Open" }} space
    </button>
  </div>
  <div v-if="showSpace" class="space-wrapper">
    <UseSpace v-bind="spaceProps" />
  </div>
</template>
