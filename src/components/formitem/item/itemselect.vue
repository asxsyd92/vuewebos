
    <template>


  <div :class="data.data.col" :style="'display:' + data.data.display">

    <lay-form-item :placeholder="data.data.placeholder" class="layui-form-item" :label="data.data.label">
      <lay-select @change="change" v-model="selected" :items="items" :create="true" @create="createEvent" multiple>
      </lay-select>
      <lay-input style="display:none" v-model="value[data.data.name]" :placeholder="data.data.placeholder"></lay-input>

    </lay-form-item>

  </div>


</template>
<script lang="ts">
import Vue from "vue";
import { values } from 'xe-utils';
export default {
  name: "itemcheckbox",
};
</script>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import http from "../../../utils/http";
interface ItemcolorProps {
  data: any;
  value: any;
}
const props = withDefaults(defineProps<ItemcolorProps>(), {
  data: Object, value: Object
});

const data = ref(props.data);
const value = ref(props.value);
const route = useRoute();
const change = (val: any) => {
  if (selected.value.length > 0) {
    value.value[data.value.data.name] = selected.value.join(",");
  }


}
const items = ref([]) as any;
const selected = ref([]) as any;
onMounted(() => {
  createEvent();
})
const createEvent = function () {

  http.post("/api/form/GetDictionaryByCode", { id: data.value.data.data }, "请稍等").then(res => {
    if (res.success) {
      setdata(res.data);

      setTimeout(() => {

        selected.value = value.value[data.value.data.name].split(",");


      }, 100);
      //items.value=res.data;
      if (route.query.zhuanti != null && route.query.zhuanti != undefined && route.query.zhuanti != "") {
        if (route.query.zhuanti != null && route.query.zhuanti != "" && route.query.zhuanti != undefined)

          setTimeout(() => {
            let result = selected.value.some((ele: any) => ele === route.query.zhuanti) //true
            if (!result) {
              selected.value.push(route.query.zhuanti);
            }

          }, 100);

      }
    }
  });
}
const setdata = (da: Array<any>) => {
  da.forEach((item: any) => {
    if (item.children.length > 0) {
      setdata(item.children);
    }
    items.value.push(item);
  })


}





</script>
