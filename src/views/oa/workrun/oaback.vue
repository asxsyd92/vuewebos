<template>
	<lay-form ref="sendFormRef" :model="validateModel" :required="true">

		<lay-col :md="24">

			<lay-form-item label="步骤" prop="step">
				<div v-for="(item, index) in nextstep" :key="index">
					<lay-radio v-model="validateModel.step" :value="item.id">{{ item.name }}</lay-radio>
				</div>
			</lay-form-item>
		</lay-col>
		<lay-col :md="24">
			<lay-form-item label="处理意见" prop="comment">
				<!-- <lay-input placeholder="请输入处理意见" ></lay-input> -->
				
		<VueUeditorWrap
        editor-id="comment"
		v-model="validateModel.comment"
		ref="comment"
         name="comment"
         :destroy="true" 
          :config="config" 
		  style="width: 99%;"
         >
        </VueUeditorWrap>
			</lay-form-item>
		</lay-col>
	</lay-form>
</template>
<script lang="ts">

export default {
	name: "oaback",

}
</script>
<script lang="ts" setup>

import { ref, reactive,h } from 'vue';
import http from '../../../api/http';
import { layer } from '@layui/layer-vue';
import { useUserStore } from '../../../store/user';

import VueUeditorWrap from 'vue-ueditor-wrap/lib/vue-ueditor-wrap/index';
interface IoabackProps {
	query:any,type:number, data: any, callback: Function
}
const props = withDefaults(defineProps<IoabackProps>(), {
	query:Object,type:Object, data: Object,  callback: Function
});
const userdata = ref([]);
const userkes = ref([]);
const comment = ref("");
const stepkey = ref([]);
const sendFormRef = ref(null) as any;
const nextstep = ref([]) as any;
   
const user = useUserStore();
const validateModel = reactive({
	user: [],
	step: [] as any,
	comment: ""

})


const config = ref(
        {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
		elementPathEnabled:false,
        // 初始容器高度
        initialFrameHeight: '500px',
    
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: '/api/ueditor/upload?asxsyd92user='+user.userInfo.userid,
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/ueditor/',
        toolbars: [[ 'insertimage', 'attachment' ]],
        // 配合最新编译的资源文件，你可以实现添加自定义Request Headers,详情https://github.com/HaoChuan9421/ueditor/commits/dev-1.4.3.3
        headers: {
         'Authorization':"bearer " +  user.token,
        }
      }
    );
	//获取可退回的步骤
const getStep = () => {
	http.post("/api/workflowtasks/getBackStepList", {  query: JSON.stringify(props.query.value), type: props.type  }, "正在获取...").then(res => {
		if (res.success) {
debugger
			nextstep.value = res.data;
			if(res.data.length>0){
				validateModel.step=res.data[0].id;
				console.log(validateModel.step)
			}
		}

	}).catch(res => {

	});
}
const confirm = (tab: any, query: any, type: string, layid: any, layers: any) => {
	sendFormRef.value!.validate((isValidate: any, model: any, errors: any) => {
		if (!isValidate) {
			return;
		}
		var index= layer.msg("正在退回...",{icon: 16,shadeClose:false})
		var opts = new Object() as any;
		opts.type = type;
		opts.steps = [];
		opts.steps.push({ id: model.step, member: "" });
		query.value.comment = validateModel.comment;
		
		http.post("/api/workflowtasks/sendTask", { table: tab, data: JSON.stringify(props.data), query: JSON.stringify(query.value), params1: JSON.stringify(opts) }, "正在处理...").then(resp => {
			layer.close(index);
			if (resp.success) {
				layer.notifiy({
					title: "温馨提示",
					content: resp.msg
				});
				var obj = new Object() as any;
				obj.success = true;

				props.callback(obj, "callback");
				layers.close(layid);
			} else {
				layer.notifiy({
					title: "温馨提示",
					content: resp.msg
				});

			}
		}).catch(resp => {
			layer.close(index);
			layer.notifiy({
				title: "温馨提示",
				content: "网络错误"
			});

		});

	})

}
getStep();
defineExpose({
	confirm
})
</script>