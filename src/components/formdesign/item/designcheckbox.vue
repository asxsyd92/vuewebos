 <template>
    <div>
        <lay-form-item :label="data.data.label">
       <lay-checkbox-group disabled="disabled">
      <lay-checkbox name="like" skin="primary" label="1">写作</lay-checkbox>
      <lay-checkbox name="like" skin="primary" label="2">画画</lay-checkbox>
      <lay-checkbox name="like" skin="primary" label="3">运动</lay-checkbox>
    </lay-checkbox-group>
        </lay-form-item>
    </div>

</template>
<script lang="ts">
export default {
    name: "designselect",
};
</script>
<script lang="ts" setup>
import { ref } from "vue";
interface IdesignselectProps {
    data: any
}
const props = withDefaults(defineProps<IdesignselectProps>(), {
    data: Object
});

const data = ref(props.data);


</script>
