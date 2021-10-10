<template>
<commonlist :data="data"></commonlist>
</template>
<script >
  import commonlist from "@/components/sublist/commonlist";
export default {
    name:"querylist", 
     components:{commonlist},data(){
         var m=this;
return{
    data:{
        id:"role",
        tableId:"role",
        elem:'#role',
        filter:"roletable",
        url:m.host+'/api/tasks/WaitList?title=&type=&desc=AddTime desc',
        data:[{ fixed: 'right', title: '操作', toolbar: '#barDemo' }
            , { field: 'title', title: '标题' }
            , { field: 'sendername', title: '处理人' }
            , { field: 'addtime', title: '时间' }  ],
        limits: [8, 16, 24, 32, 40, 48, 56],
        page: {theme: '#1E9FFF'},
        even:true, 
        size:"sm",
        limit:15
    }
}

    }, provide() {
    return {
      commonlistData:this. data,
      contentSelectChange: this.contentSelectChange
    }
}
}
</script>