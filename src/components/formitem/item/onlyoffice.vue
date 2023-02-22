<template>

    <div ref="office"  style="    height: 500px;">

       <div id="office">

</div>
    </div>
</template>

<script lang="ts">
export default {
    name: "onlyoffice",
 
};
</script>
<script lang="ts" setup>
import { ref, onMounted,onBeforeMount } from "vue";
import utils from "../../../utils/utils";
import config from "../../../config";
interface ItemcolorProps {
    config: any;

}

const props = withDefaults(defineProps<ItemcolorProps>(), {
    config: Object
});

const office=ref(null);
const win = window as any;


onMounted(() => {
    console.log(office)
    var docEditor = new win.DocsAPI.DocEditor("office", props.config);
   
})
</script>