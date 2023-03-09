<template>

    <lay-container>
        <lay-card>
            <lay-tree ref="selecteuser" :data="data2"  :checkStrictly="true" :showCheckbox="showCheckbox2" v-model:checkedKeys="checkedKeys2">
            </lay-tree>
        </lay-card>
    </lay-container>


</template>
<script lang="ts">
export default {
    name: "selecteuser"
}
</script>
<script lang="ts" setup>

import { ref } from 'vue';
import { treeToList } from '../../library/treeUtil';
import http from 'webosutils/lib/http';
interface IselecteuserProps {
    orgid:any,data:any, callback:Function
}
 const props = withDefaults(defineProps<IselecteuserProps>(), {
    orgid:String, data:Array,callback:Function
});
const checkedKeys2 = ref([]) as any;
const showCheckbox2 = ref(true);
checkedKeys2.value=props.data;
const confirm=(layid:any, layers:any)=>{
   
    if(checkedKeys2.value.length>0){
        var list= treeToList(data2.value);
        var newlist=[] as any;
        checkedKeys2.value.forEach((v: any) => {
            var data = list.find((e: any) => e.id == v);
            if(data!=null){
                newlist.push(data);
            }
        });
    }
    var obj=new Object() as any;
    obj.success=true;

    obj.checked=checkedKeys2.value;
    obj.item=newlist;
    props.callback(obj,"callback");
    layers.close(layid);
    // http.post("", {}, "正在加载").then(res => {
    //     props.callback(obj,"callback");
    //                         }
    //                         ).catch(res => {
                            
    //                         })
 
    //props.callback({success:false,msg:"网络错误",layid:layid},"callback");
}


const data2 = ref([{
    title: '一级1',
    id: 1,
    checked: true,
    spread: true,
    children: [{
        title: '二级1-1 可允许跳转',
        id: 3,
        href: 'https://www.layui.com/',
        children: [{
            title: '三级1-1-3',
            id: 23,
            children: [{
                title: '四级1-1-3-1',
                id: 24,
                children: [{
                    title: '五级1-1-3-1-1',
                    id: 30,
                    field: ''
                },
                {
                    title: '五级1-1-3-1-2',
                    id: 31,
                }]
            }]
        },
        {
            title: '三级1-1-1',
            id: 7,
            children: [{
                title: '四级1-1-1-1 可允许跳转',
                id: 15,
                href: 'https://www.layui.com/doc/'
            }]
        },
        {
            title: '三级1-1-2',
            id: 8,
            children: [{
                title: '四级1-1-2-1',
                id: 32,
            }]
        }]
    },
    {
        title: '二级1-2',
        id: 4,
        spread: true,
        children: [{
            title: '三级1-2-1',
            id: 9,
            disabled: true
        },
        {
            title: '三级1-2-2',
            id: 10,
        }]
    },
    {
        title: '二级1-3',
        id: 20,
        children: [{
            title: '三级1-3-1',
            id: 21,
        },
        {
            title: '三级1-3-2',
            id: 22,
        }]
    }]
},
{
    title: '一级2',
    id: 2,
    spread: true,
    children: [{
        title: '二级2-1',
        id: 5,
        spread: true,
        children: [{
            title: '三级2-1-1',
            id: 11,
        },
        {
            title: '三级2-1-2',
            id: 12,
        }]
    },
    {
        title: '二级2-2',
        id: 6,
        children: [{
            title: '三级2-2-1',
            id: 13,
        },
        {
            title: '三级2-2-2',
            id: 14,
            disabled: true
        }]
    }]
},
{
    title: '一级3',
    id: 16,
    children: [{
        title: '二级3-1',
        id: 17,
        fixed: true,
        children: [{
            title: '三级3-1-1',
            id: 18,
        },
        {
            title: '三级3-1-2',
            id: 19,
        }]
    },
    {
        title: '二级3-2',
        id: 27,
        children: [{
            title: '三级3-2-1',
            id: 28,
        },
        {
            title: '三级3-2-2',
            id: 29,
        }]
    }]
}]);




defineExpose({
    confirm
})
</script>