<template>
  <lay-col :md="data.data.col"  style="margin-bottom: 20px;" :style="'display:' + data.data.display">


    <div v-if="data.type == 'input'">
      <div v-if="data.data.type == 'number'" >

        <lay-form-item  :label="data.data.label" :prop="data.data.name"  :required="required">
          <div v-if="data.data.showtext == 'true'">
            <span class="showtext">{{ value[data.data.name] }}</span>
          </div>
          <div v-else>
            <lay-input-number v-model="value[data.data.name]" :placeholder="data.data.placeholder"></lay-input-number>

          </div>
        </lay-form-item>

      </div>
      <div v-if="data.data.type == 'password'" :style="'display:' + data.data.display">
        <lay-form-item :label="data.data.label" :prop="data.data.name" :required="required">

          <div v-if="data.data.showtext == 'true'">
            <span class="showtext">{{ value[data.data.name] }}</span>
          </div>
          <div v-else>
            <lay-input v-model="value[data.data.name]" :placeholder="data.data.placeholder" type="password"></lay-input>


          </div>

        </lay-form-item>

      </div>
      <div v-else-if="data.data.type == 'date' || data.data.type == 'datetime'" :style="'display:' + data.data.display">
        <lay-form-item :label="data.data.label" :prop="data.data.name" :required="required">
          <div v-if="data.data.showtext == 'true'">
            <span class="showtext">{{ moment(value[data.data.name]).format('YYYY年MM月DD日') }}</span>
          </div>
          <div v-else>
            <lay-date-picker v-model="value[data.data.name]" :placeholder="data.data.placeholder"></lay-date-picker>

          </div>

        </lay-form-item>
      </div>
      <div v-else-if="data.data.type == 'text'">

        <lay-form-item :label="data.data.label" :prop="data.data.name" :style="'display:' + data.data.display"
          :required="required">
          <div v-if="data.data.showtext == 'true'">
            <span class="showtext">{{ value[data.data.name] }}</span>
          </div>
          <div v-else>
            <lay-input v-model="value[data.data.name]" :placeholder="data.data.placeholder"></lay-input>

          </div>

        </lay-form-item>
      </div>
    </div>
    <div v-if="data.data.type == 'textarea'" :style="'display:' + data.data.display">
      <lay-form-item :label="data.data.label" :prop="data.data.name" :required="required">
        <div v-if="data.data.showtext == 'true'">
          <div classs="showtext"  >
            <span class="showtext">{{ value[data.data.name] }}</span>
            </div>
        </div>
        <div v-else>  
        <lay-textarea v-model="value[data.data.name]" :placeholder="data.data.placeholder"></lay-textarea>
      </div>
      </lay-form-item>
    
    </div>
  
</lay-col>
</template>
<script lang="ts">

import moment from 'moment'
export default {
  name: "itemnput",
};
</script>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useUserStore } from "../../../store/user";
interface ItemnputProps {
  data: any;
  value: any;
}
const props = withDefaults(defineProps<ItemnputProps>(), {
  data: Object, value: Object
});
const required = ref(false);
const userStore = useUserStore();
const data = ref(props.data);
const value = ref(props.value);
if (data.value.data.required == "true") {
  required.value = true;
} else {
  required.value = false;
}
//这是给初始化赋值

  switch (value.value[data.value.data.name]) {
    case "@_SYS_GETUSERID": value.value[data.value.data.name] = userStore.userInfo.userid; break;
    case "@_SYS_GETUSERNAME": value.value[data.value.data.name] = userStore.userInfo.name; break;
    case "@_SYS_GETUSERNICKNAME": value.value[data.value.data.name] = userStore.userInfo.name; break;
    case "@_SYS_ORGID": value.value[data.value.data.name] = userStore.userInfo.orid; break;
    case "@_SYS_DATETIME": value.value[data.value.data.name] = new Date(); break;
    case "@_SYS_ORGNAME": value.value[data.value.data.name] = userStore.userInfo.orgname; break;
    case "00000000-0000-0000-0000-000000000000": value.value[data.value.data.name] = "00000000-0000-0000-0000-000000000000"; break;
    case "@_SYS_GW": value.value[data.value.data.name] = ""; break;
  }

//数值填写默认值为0
if (data.value.data.type == 'number') {
  if (value.value[data.value.data.name] == "") {
    value.value[data.value.data.name] = 1;
  }
}

//
console.log(data.value.data.value)
if (data.value.data.type == 'date' || data.value.data.type == 'datetime') {
  if (value.value[data.value.data.name] == "") {
    value.value[data.value.data.name] = new Date();
  } else {
    value.value[data.value.data.name] = moment(value.value[data.value.data.name]).format('YYYY/MM/DD');
  }

}

</script>
