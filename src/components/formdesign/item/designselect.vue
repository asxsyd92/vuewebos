 <template>
    <div>
        <lay-form-item :label="data.data.label">
            <lay-select disabled="disabled">
                <lay-select-option value="1" label="学习"></lay-select-option>
                <lay-select-option value="2" label="编码"></lay-select-option>
                <lay-select-option value="3" label="运动"></lay-select-option>
            </lay-select>
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
