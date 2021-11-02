<template>
    
<!-- 正文开始 -->
<div class="layui-fluid" style="padding-bottom: 0;">
    <div class="layui-row layui-col-space15">
        <div class="layui-col-md2" style="width:260px">
            <div class="layui-card">
                <div class="layui-card-body" style="padding: 10px;">
                    <!-- 表格工具栏1 -->
                    <form class="layui-form toolbar">
                        <div class="layui-form-item">
                            <div class="layui-inline" style="max-width: 140px;">
                                <input name="userName" class="layui-btn layui-btn-normal  layui-btn-sm" placeholder="输入字典名称" style="text-align: left;color: #009688; background-color: #fff;"/>
                            </div>
                            <div class="layui-inline">
                                <button class="layui-btn layui-btn-normal  layui-btn-sm" lay-filter="userTbSearch" lay-submit>
                                    <i class="layui-icon">&#xe615;</i>搜索
                                </button>
                            </div>
                        </div>
                    </form>
                    <!-- 数据表格1 -->
                    <div id="userTable" class="dtree" lay-filter="userTable"></div>
                </div>
            </div>
        </div>
        <div class="layui-col-md9">
            <div class="layui-card">
                <div class="layui-card-body" style="padding: 10px;">
                    <!-- 表格工具栏2 -->
                    <form class="layui-form toolbar">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <label class="layui-form-label">字典名称:</label>
                                <div class="layui-input-inline">
                                    <input name="userDataName" class="layui-btn layui-btn-normal  layui-btn-sm" placeholder="输入字典名称" style="text-align: left;color: #009688; background-color: #fff;"/>
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label">字典键值:</label>
                                <div class="layui-input-inline">
                                    <input name="userDataCode" class="layui-btn layui-btn-normal  layui-btn-sm" placeholder="输入字典键值" style="text-align: left;color: #009688; background-color: #fff;"/>
                                </div>
                            </div>
                            <div class="layui-inline">&emsp;
                                <button  class="layui-btn layui-btn-normal  layui-btn-sm" lay-filter="userDataTbSearch" lay-submit>
                                    <i class="layui-icon">&#xe615;</i>搜索
                                </button>
                            </div>
                        </div>
                    </form>
                    <!-- 数据表格2 -->
                    <div id="userDataTable"  lay-filter="userDataTable"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- 表格操作列 -->
<script type="text/html" id="userDataTbBar">
    <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="edit">修改</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
</script>
<!-- 新增或编辑 -->
<script type="text/html"  id="adduser" > 
<form class="layui-form" lay-filter="adduser" style="text-align: center;">
        <div class="layui-form-item"  style="display: none;">
            <label class="layui-form-label">上级</label>
            <div class="layui-input-block">

               <input type="text" disabled="disabled" name="parentid" placeholder="目录id" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item" style="display: none;">
            <label class="layui-form-label">主键</label>
            <div class="layui-input-block">
                <input autocomplete="off" class="layui-input layui-disabled" name="id" placeholder="id" type="text" value="00000000-0000-0000-0000-000000000000">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">标题</label>
            <div class="layui-input-block">
                <input autocomplete="off" class="layui-input" lay-verify="required" name="title" placeholder="标题" type="text">

            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">路径</label>
            <div class="layui-input-block">
                <input autocomplete="off" class="layui-input" name="tag" placeholder="tag" type="text">

            </div>
        </div>
        <div class="layui-form-item" style="display: none;">
            <label class="layui-form-label">角色</label>
            <div class="layui-input-block">
                <input autocomplete="off" disabled="disabled" class="layui-input" name="roleid" placeholder="角色id必须为guid" type="text" value="00000000-0000-0000-0000-000000000000">

            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">图标</label>
            <div class="layui-input-block">
                <input autocomplete="off" class="layui-input" id="icon" lay-filter="icon" name="icon" placeholder="layui小图标css样式" type="text">

            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">参数</label>
            <div class="layui-input-block">
                <input autocomplete="off" class="layui-input" name="params" placeholder="参数" type="text">

            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">排序</label>
            <div class="layui-input-block">
                <input class="layui-input" name="sort" type="number">
            </div>
        </div>
    
            <div class="layui-form-item">
                <label class="layui-form-label">颜色</label>
                <div class="layui-input-inline" >
                    <input class="layui-input" id="color" name="color" placeholder="请选择颜色" type="text" value="" >
                </div>
                <div class="layui-inline" style="left: -11px;">
                    <div id="_color"></div>
                </div>
            </div>
 
   
 
    <div class="layui-form-item text-right">
        <button class="layui-btn layui-btn-normal  layui-btn-sm" lay-filter="_submit" lay-submit>保存</button>
        <!-- <button class="layui-btn layui-btn-primary " type="button" ew-event="closeDialog">取消</button> -->
    </div>
</form>
</script>
</div>

</template>
<script>
export default {
     name: 'users',
    data(){return{
   selObj:"",
   layerindex:0
    }},mounted(){
        let m=this;
        m.init();


    },methods:{
        adduser(){
            var m=this;
          if(m.selObj==""){
               layui.layer.alert('请选择节点', { icon: 2, title: '温馨提示' });
               return false;
          }
    
             m.layerindex=   layui.layer.open({
                    type: 1,
                    title: '新增菜单',
                    shadeClose: false,
                    shade: 0.8,
                    area: ['35%', '55%'],
                    content: layui.$("#adduser").html(),
                   success: function (layero, dIndex) {
                        // 回显表单数据
                    m.zhujian();
                   layui.form.render();
           
                    }
                });
        },     edituser(data){
            var m=this;
             m.layerindex=   layui.layer.open({
                    type: 1,
                    title: '编辑菜单',
                    shadeClose: false,
                    shade: 0.8,
                    area: ['35%', '55%'],
                    content: layui.$("#adduser").html(),
                   success: function (layero, dIndex) {
                        // 回显表单数据
                      m.zhujian(data.data.color);
                      layui.  form.val('adduser', data.data);
                     layui. iconPicker.checkIcon("icon", data.data.icon);
              
                      layui. form.render();
            
               
                  
                    }
                });
        },
        zhujian(rgb){
       //开启全功能
      layui.colorpicker.render({
        elem: '#_color'
        , color:rgb==undefined? 'rgba(7, 155, 140, 1)':rgb
        , format: 'rgb'
        , predefine: true
        , alpha: true
        , done: function (color) {
           layui.$('#color').val(color);
        }
        , change: function (color) {
            //给当前页面头部和左侧设置主题色
            // $('.header-demo,.layui-side .layui-nav').css('background-color', color);
        }
    });
           layui. iconPicker.render({
            // 选择器，推荐使用input
            elem: '#icon',
            // fa 图标接口
            url: "/common/variables.less",
            // 是否开启搜索：true/false，默认true
            search: true,
            // 是否开启分页：true/false，默认true
            page: true,
            // 每页显示数量，默认12
            limit: 12,
            // 点击回调
            click: function (data) {
               layui.$('#icon').val(data.icon);
            },
            // 渲染成功后的回调
            success: function (d) {
            
            }
        });
        },
      init() {
          let m=this;
            var $ = layui.$, dtree=layui.dtree,table=layui.table,form=layui.form, colorpicker=layui.colorpicker;
        

      // 分页配置


    var insTb = dtree.render({
        elem: "#userTable",
        //  data: demoTree,
        method: "post",
      accordion:true,
        headers: { "Authorization": "bearer " + window.localStorage["_token"] },
         url: "/api/organiz/GetOrganizeById?id=00000000-0000-0000-0000-000000000000"
    });
    // 绑定节点点击
    dtree.on("node('userTable')", function (obj) {
        var title = $("#title").val();
        var param = dtree.getParam("userTable", obj.param.nodeId); //获取ID为001的节点的值
      m.  selObj = obj.param.nodeId;
        insTb2.reload({ where: { organizeid: obj.param.nodeId, page: 1, limit: 10 }, page: { curr: 1 }, url: '/api/users/UsersList'});
    });
    /* 表格搜索 */
    form.on('submit(userTbSearch)', function (data) {
        insTb.reload({ where: data.field });
        return false;
    });


    /* 渲染表格2 */
    var insTb2 = table.render({
        elem: '#userDataTable', method: "post", headers: { "Authorization": "bearer " + window.localStorage["_token"] },
        data: [], id: 'userDataTable',
        height: 'full',
        page: { theme: '#1E9FFF' },
        //size:'sm',
        toolbar: ['<p>',
            '<button lay-event="add" class="layui-btn layui-btn-normal  layui-btn-sm icon-btn"><i class="layui-icon">&#xe654;</i>添加</button>&nbsp;',
            '<button lay-event="del" class="layui-btn layui-btn-sm layui-btn-danger icon-btn"><i class="layui-icon">&#xe640;</i>删除</button>&nbsp;',
            '</p>'].join(''),
        cellMinWidth: 100,
         cols: [[ //表头
            //{ field: 'ID', title: 'ID', width: 80, sort: true, fixed: 'left' }
            { field: 'name', title: '姓名' },
            { field: 'account', title: '账号' },
            {
                field: 'state', title: '状态', sort: true, templet: '#switchTpl', unresize: true

            }
            , { fixed: 'right', title: '操作', toolbar: '#userDataTbBar' }
        ]]
    });

    /* 表格2搜索 */
    form.on('submit(userDataTbSearch)', function (data) {

        return false;
    });

    /* 表格2工具条点击事件 */
    table.on('tool(userDataTable)', function (obj) {
        if (obj.event === 'edit') { // 修改
        
              m.edituser(obj);
        } else if (obj.event === 'del') { // 删除
            user.doDel2(obj,m);
        }
    });

    /* 表格2头工具栏点击事件 */
    table.on('toolbar(userDataTable)', function (obj) {
        if (obj.event === 'add') { // 添加
           m.adduser();
        } else if (obj.event === 'del') { // 删除
            var checkRows = table.checkStatus('userDataTable');
            if (checkRows.data.length === 0) {
                layer.msg('请选择要删除的数据', { icon: 2 });
                return;
            }
            var ids = checkRows.data.map(function (d) {
                return d.userDataId;
            });
            doDel2({ ids: ids },m);
        }
    });

//新增相关
      form.on('submit(_submit)', function (data) {
                 data.field.parentid=m.selObj;
                 m.$post(m.host + "/api/users/dduser", { data: JSON.stringify(data.field) }).then(res => {

                }).catch(resp => {
                if (resp.success) {
                    layui.layer.close(m.layerindex);
                    user.dicReload(m);
                    user.treeReload();
                }
            }, function (error) {
                layui.layer.alert('网络错误', { icon: 2, title: '温馨提示' });
            });
            return false;
        });

   let user = {
        doDel2: function (obj,m) {
            layui.layer.confirm('确定要删除选中数据吗？', {
                skin: 'layui-layer-admin',
                shade: .1
            }, function (i) {
                layer.close(i);
                var loadIndex = layer.load(2);
                    m.$post(m.host + "/api/users/deluser", { data: JSON.stringify(obj.data)}).then(res => {

                }).catch(resp => {
         
                    if (resp.success) {
                        user.dicReload(m);
                        user.treeReload();
                    } else {
                        top.layer.alert(resp.msg, { icon: 2, title: '温馨提示' });
                        layer.closeAll();
                    }
                }, function () {

                    top.layer.alert('网络错误', { icon: 2, title: '温馨提示' });
                    layer.closeAll();
                });
            });
        },
        dicReload: function (m) {
            if (m.selObj == "") {
                insTb2.reload({ id: '00000000-0000-0000-0000-000000000000', page: { curr: 1 } })
            } else {
                insTb2.reload({ id: m.selObj, page: { curr: 1 } })
            }
        },
        treeReload: function () {
            insTb.reload({ where: '00000000-0000-0000-0000-000000000000' });
        }


    }
}

    }
}
</script>

<style>
    #userTable + .layui-table-view .layui-table-tool-temp {
        padding-right: 0;
    }
    #userTable + .layui-table-view .layui-table-body tbody > tr td {
        cursor: pointer;
    }
    #userTable + .layui-table-view .layui-table-body tbody > tr.layui-table-click {
        background-color: #fff3e0;
    }
    #userTable + .layui-table-view .layui-table-body tbody > tr.layui-table-click td:last-child > div:before {
        position: absolute;
        right: 6px;
        content: "\e602";
        font-size: 12px;
        font-style: normal;
        font-family: layui-icon !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
