/**

 @Name：workflow layui路由扩展v0.01
 @Author：爱上歆随懿恫|http://www.asxsyd92.com
 @Url：http://www.asxsyd92.com
 @License：MIT
*/



    workflow = {
        tempArrPath: [], //临时连线
        mouseX: 0,
        mouseY: 0,
        wf_id: "",//当前流程ID
        links_tables_fields: [],//当前流程的所有连接所有表和字段
        wf_json: [],
        wf_r: null, //画板对象
        wf_steps: [], //步骤数组
        wf_texts: [], //文本数组
        wf_conns: [], //连线数组
        wf_option: "", //当前操作
        wf_focusObj: null, //当前焦点对象
        wf_width: 108, //步骤宽度
        wf_height: 50, //步骤高度
        wf_rect: 8, //圆角大小
        wf_designer: true, //是否是设计模式(查看流程图时不帮定双击事件）
        wf_connColor: "#898a89", //连线的常规颜色
        wf_nodeBorderColor: "#587aa9", //节点边框颜色
        wf_noteColor: "#efeff0", //节点填充颜色
        wf_stepDefaultName: "新步骤",//默认步骤名称
    
        ,//添加子流程节点
       
     
    }



