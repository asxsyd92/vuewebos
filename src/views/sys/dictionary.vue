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
                                <input name="dictName" class="layui-btn layui-btn-normal  layui-btn-sm" placeholder="输入字典名称" style="text-align: left;color: #009688; background-color: #fff;"/>
                            </div>
                            <div class="layui-inline">
                                <button class="layui-btn layui-btn-normal  layui-btn-sm" lay-filter="dictTbSearch" lay-submit>
                                    <i class="layui-icon">&#xe615;</i>搜索
                                </button>
                            </div>
                        </div>
                    </form>
                    <!-- 数据表格1 -->
                    <div id="dicTable" class="dtree" lay-filter="dicTable"></div>
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
                                    <input name="dictDataName" class="layui-btn layui-btn-normal  layui-btn-sm" placeholder="输入字典名称" style="text-align: left;color: #009688; background-color: #fff;"/>
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label">字典键值:</label>
                                <div class="layui-input-inline">
                                    <input name="dictDataCode" class="layui-btn layui-btn-normal  layui-btn-sm" placeholder="输入字典键值" style="text-align: left;color: #009688; background-color: #fff;"/>
                                </div>
                            </div>
                            <div class="layui-inline">&emsp;
                                <button  class="layui-btn layui-btn-normal  layui-btn-sm" lay-filter="dictDataTbSearch" lay-submit>
                                    <i class="layui-icon">&#xe615;</i>搜索
                                </button>
                            </div>
                        </div>
                    </form>
                    <!-- 数据表格2 -->
                    <div id="dicDataTable"  lay-filter="dicDataTable"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- 表格操作列 -->
<script type="text/html" id="dictDataTbBar">
    <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="edit">修改</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
</script>
<!-- 新增或编辑 -->
<script type="text/html"  id="adddic" > 
<form class="layui-form layui-form-pane" lay-filter="adddic" style="text-align: center;">
       <input name="id" type="hidden" />

    <div class="layui-form-item">
        <label class="layui-form-label layui-form-required">父级id:</label>
        <div class="layui-input-block">
            <input name="parentid" placeholder="请输入字典名称" disabled="disabled" class="layui-input"/>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label layui-form-required">字典名称:</label>
        <div class="layui-input-block">
            <input name="title" placeholder="请输入字典名称" class="layui-input  " lay-verType="tips" lay-verify="required"
                required />
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label layui-form-required">字典代码:</label>
        <div class="layui-input-block">
            <input name="code" placeholder="请输入字典键值" class="layui-input " lay-verType="tips" />
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label layui-form-required">字典代码:</label>
        <div class="layui-input-block">
            <input name="value" placeholder="请输入字典键值" class="layui-input  " lay-verType="tips" />
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label layui-form-required">字典代码:</label>
        <div class="layui-input-block">
            <input name="other" placeholder="请输入字典键值" class="layui-input  " lay-verType="tips" />
        </div>
    </div>
    <div class="layui-form-item" style="text-align: left;">
        <label class="layui-form-label">状态</label>
        <div class="layui-input-block">
            <input type="radio" name="isuse" value="1" title="启用">
            <input type="radio" name="isuse" value="0" title="冻结">

        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label layui-form-required">排序号:</label>
        <div class="layui-input-block">
            <input name="sort" placeholder="请输入排序号" class="layui-input  " type="number" lay-verType="tips"
                lay-verify="required" required />
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">备注:</label>
        <div class="layui-input-block">
            <input name="note" placeholder="请输入字典键值" class="layui-input  " lay-verType="tips" />
        </div>
    </div>
   
 
    <div class="layui-form-item text-right">
        <button class="layui-btn layui-btn-normal layui-btn-sm " lay-filter="_submit" lay-submit>保存</button>
        <button class="layui-btn layui-btn-primary layui-btn-sm" type="button" ew-event="closeDialog">取消</button>
    </div>
</form>
</script>
</div>

</template>
<script>
export default {
    data(){return{
   selObj:"",
   layerindex:0
    }},mounted(){
        let m=this;
        m.init();


    },methods:{
        adddic(){
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
                    area: ['50%', '70%'],
                    content: layui.$("#adddic").html(),
                   success: function (layero, dIndex) {
                        // 回显表单数据
          
                   layui.form.render();
           
                    }
                });
        },     editdic(data){
            var m=this;
             m.layerindex=   layui.layer.open({
                    type: 1,
                    title: '编辑菜单',
                    shadeClose: false,
                    shade: 0.8,
                    area: ['50%', '70%'],
                    content: layui.$("#adddic").html(),
                   success: function (layero, dIndex) {
                        // 回显表单数据
                
                      layui.  form.val('adddic', data.data);
                      layui. form.render();
            
               
                  
                    }
                });
        },
    
      init() {
          let m=this;
            var $ = layui.$, dtree=layui.dtree,table=layui.table,form=layui.form, colorpicker=layui.colorpicker;
          console.log("dic");

      // 分页配置


    var insTb = dtree.render({
        elem: "#dicTable",
        //  data: demoTree,
        method: "post",
      accordion:true,
        headers: { "Authorization": "bearer " + window.localStorage["_token"] },
           url: "/api/form/GetDictionaryByID?id=00000000-0000-0000-0000-000000000000"
    });
    // 绑定节点点击
    dtree.on("node('dicTable')", function (obj) {
        var title = $("#title").val();
        var param = dtree.getParam("dicTable", obj.param.nodeId); //获取ID为001的节点的值
      m.  selObj = obj.param.nodeId;
        insTb2.reload({ where: { id: obj.param.nodeId, page: 1, limit: 10 }, page: { curr: 1 }, url: '/api/dictionary/getPageById' });
    });
    /* 表格搜索 */
    form.on('submit(dictTbSearch)', function (data) {
        insTb.reload({ where: data.field });
        return false;
    });


    /* 渲染表格2 */
    var insTb2 = table.render({
        elem: '#dicDataTable', method: "post", headers: { "Authorization": "bearer " + window.localStorage["_token"] },
        data: [], id: 'dicDataTable',
        height: 'full',
        page: { theme: '#1E9FFF' },
        //size:'sm',
        toolbar: ['<p>',
            '<button lay-event="add" class="layui-btn layui-btn-normal  layui-btn-sm icon-btn"><i class="layui-icon">&#xe654;</i>添加</button>&nbsp;',
            '<button lay-event="del" class="layui-btn layui-btn-sm layui-btn-danger icon-btn"><i class="layui-icon">&#xe640;</i>删除</button>&nbsp;',
            '</p>'].join(''),
        cellMinWidth: 100,
            cols: [[
            { type: 'checkbox' },
            // {type: 'numbers'},
            { field: 'title', title: '名称' },
            { field: 'value', title: '值', },
            // {field: 'parentid', title: '父级id'},
            { field: 'code', title: 'code' },
            // {field: 'isuse', title: '是否使用', align: 'center',  templet: function (d) {
            //     console.log(d);
            //     if(d=='0'){
            //         return "启用";
            //     }else{
            //         return "停用";
            //     }

            // }},
            //{field: 'note', title: '备注', },
            //  {field: 'other', title: '其他', },
            //{field: 'sort', title: '排序号', },


            { title: '操作', toolbar: '#dictDataTbBar', align: 'center' }
        ]]
    });

    /* 表格2搜索 */
    form.on('submit(dictDataTbSearch)', function (data) {

        return false;
    });

    /* 表格2工具条点击事件 */
    table.on('tool(dicDataTable)', function (obj) {
        if (obj.event === 'edit') { // 修改
        
              m.editdic(obj);
        } else if (obj.event === 'del') { // 删除
            dic.doDel2(obj,m);
        }
    });

    /* 表格2头工具栏点击事件 */
    table.on('toolbar(dicDataTable)', function (obj) {
        if (obj.event === 'add') { // 添加
           m.adddic();
        } else if (obj.event === 'del') { // 删除
            var checkRows = table.checkStatus('dictDataTable');
            if (checkRows.data.length === 0) {
                layer.msg('请选择要删除的数据', { icon: 2 });
                return;
            }
            var ids = checkRows.data.map(function (d) {
                return d.dictDataId;
            });
            doDel2({ ids: ids },m);
        }
    });

//新增相关
      form.on('submit(_submit)', function (data) {
                 data.field.parentid=m.selObj;
                 m.$post(m.host + "/api/dictionary/AddDictionary", { data: JSON.stringify(data.field) }).then(res => {

                }).catch(resp => {
                if (resp.success) {
                    layui.layer.close(m.layerindex);
                    dic.dicReload(m);
                    dic.treeReload();
                }
            }, function (error) {
                layui.layer.alert('网络错误', { icon: 2, title: '温馨提示' });
            });
            return false;
        });

   let dic = {
        doDel2: function (obj,m) {
            layui.layer.confirm('确定要删除选中数据吗？', {
                skin: 'layui-layer-admin',
                shade: .1
            }, function (i) {
                layer.close(i);
                var loadIndex = layer.load(2);
                    m.$post(m.host + "/api/dictionary/delDictionary", { data: JSON.stringify(obj.data)}).then(res => {

                }).catch(resp => {
         
                    if (resp.success) {
                        dic.dicReload(m);
                        dic.treeReload();
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
    #dictTable + .layui-table-view .layui-table-tool-temp {
        padding-right: 0;
    }
    #dictTable + .layui-table-view .layui-table-body tbody > tr td {
        cursor: pointer;
    }
    #dictTable + .layui-table-view .layui-table-body tbody > tr.layui-table-click {
        background-color: #fff3e0;
    }
    #dictTable + .layui-table-view .layui-table-body tbody > tr.layui-table-click td:last-child > div:before {
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
