<script lang="jsx">
import { ref, defineComponent } from 'vue';
import { initializeFlatfile } from '@flatfile/vue';
import { config as workbook } from "/src/workbooks/config";
import { listener } from '/src/listeners/listener';

export default defineComponent({
  setup() {
    const showSpace = ref(false);
    const apiKey = import.meta.env.FLATFILE_API_KEY;
    const publishableKey = import.meta.env.VITE_PUBLISHABLE_KEY;
    const environmentId = import.meta.env.VITE_ENVIRONMENT_ID;
    const spaceId = import.meta.env.VITE_SPACE_ID;
    const spaceProps = ref({
      environmentId,
      publishableKey,
      space: {
        id: spaceId
      },
      closeSpace: {
        operation: 'submitActionFg',
        onClose: () => { showSpace.value = false; },
      },
      displayAsModal: true
    });

const fetchData = async (spaceId) => {
  const response = await fetch(`/api/spaces/${spaceId}`);
  const json = await response.json();
  
  if(json.error){
    return
  }
  spaceProps.value.space.accessToken = json.space.data.accessToken;
}

    const { Space, OpenEmbed } = initializeFlatfile(spaceProps.value);

fetchData(spaceId).catch(
    (err)=>{
      console.error(err)
    }
  );

    const toggleSpace = () => {
      showSpace.value = !showSpace.value;
      OpenEmbed()
    };

    return {
      toggleSpace,
      showSpace,
      Space
    }
  },
  render(props, ctx) {
    const Space = props.Space

    return (
      <div>
        <h3>Use an Existing Space</h3>
        <div class="new-space-button-container">
          <button onClick={props.toggleSpace}>{ props.showSpace ? 'Close' : 'Open' } space</button>
        </div>

        {props.showSpace && <div class="space-wrapper">
          <Space />
        </div>}
      </div>
    )
  },
});
</script>
