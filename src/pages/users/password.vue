<template>
<div>
  <div id="asxsyd92heater"></div>
  <div class="main-newsdate"></div>
  <div class="layui-container">
    <form class="layui-form layui-form-pane" lay-filter="addinfos">
      <div id="asxsyd92heater"></div>
      <div class="layui-row layui-col-space15 layui-form-item">
        <!--多行输入框-->
        <div class="_two">
          <div class="asxsyd92move" id="_asxsfromname" style="text-align: center;">
            <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
              <legend>修改密码</legend></fieldset>
          </div>
          <div class="layui-col-md12">
            <div class="layui-form-item">
              <label class="layui-form-label">原密码</label>
              <div class="layui-input-block">
                <input class="layui-input" data-target="" id="oldpw" lay-filter="column" lay-verify="required" name="oldpw" placeholder="请输入原密码" type="password"></div>
            </div>
          </div>
          <div  class="layui-col-md12">
            <div class="layui-form-item">
              <label class="layui-form-label">新密码</label>
              <div class="layui-input-block">
                <input class="layui-input" data-target="" id="newpw" lay-filter="column" lay-verify="pass" name="newpw" placeholder="请输入新密码" type="password"></div>
            </div>
          </div>
          <div  class="layui-col-md12">
            <div class="layui-form-item">
              <label class="layui-form-label">确认密码</label>
              <div class="layui-input-block">
                <input class="layui-input" data-target="" id="pw" lay-filter="column" lay-verify="pass" name="pw" placeholder="请输入确认密码" type="password"></div>
            </div>
          </div>
        </div>
        <!--一行行输入框-->
        <div class="_one"></div>
      </div>
      <div class="layui-form-item">
        <p style="text-align: center;color:red;">密码必须满足：数字、字母、特殊符号组成，密码长度8位至16位之间！</p>
        <div class="layui-input-block">
          <button class="layui-btn layui-btn-normal " lay-filter="_submit" lay-submit="">立即提交</button></div>
      </div>
    </form>
  </div>
</div>
</template>
<script>
  export default {
        name: 'sysheader', data() {
            return {
                users: []
            }

        }, mounted: function () {
            console.log(11);
            var m=this;
var form = layui.form; 
 form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
          if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
          }
          if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
          }
          if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
          }
          
          //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
          if(value === 'xxx'){
            alert('用户名不能为敏感词');
            return true;
          }
        }
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,pass: [
            /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,16}$/
             ,'为了保证账号安全：密码必须包含数字、字母、特殊符号组成,密码长度8至16之间！'
        ] 
      });   
      
      
         form.on('submit(_submit)', function (data) {
        if (data.field.newpw.length<6){
            layer.tips('密码过短！', '#pw', {
                tips: [1, '#FF5722']
            });
            return false;
        }
        if (data.field.newpw !== data.field.pw) {
            //tips层-左
            layer.tips('两次密码不一致', '#pw', {
                tips: [1, '#FF5722']
            });
            return false;
        }

        m.$post(m.host+"/api/users/EditPw", { old: data.field.oldpw, pw: data.field.pw }).then(res => {
                 console.log(res);
         

                }).catch(resp=>{
            if (resp.success === true) {
                
                top.layer.closeAll();

                layer.alert(resp.msg);
            } else {
                layer.alert(resp.msg);
                return false;
            }
        },function (resp) {
            layer.alert(resp.statusText);
        });






        return false;
    });
        }
        
        , methods: {



        }}
    
           
 
</script>