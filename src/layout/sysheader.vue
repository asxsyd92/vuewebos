<template>
    <div>
        <!-- 顶部开始 -->
        <div class="container">
            <div class="logo">
                <a href="javascript:;"><span style="color:springgreen">爱上</span> 歆随懿恫</a>
            </div>
            <div class="left_open">
                <a><i title="展开左侧栏" class="iconfont">&#xe699;</i></a>
            </div>
            <ul class="layui-nav left fast-add" lay-filter="mes">
                <li class="layui-nav-item">
                    <a href="javascript:;">+新增</a>
                    <dl class="layui-nav-child">
                        <!-- 二级菜单 -->
                        <dd>
                            <a onclick="xadmin.open('最大化','http://www.baidu.com','','',true)">
                                <i class="iconfont">&#xe6a2;</i>弹出最大化
                            </a>
                        </dd>
                        <dd>
                            <a onclick="xadmin.open('弹出自动宽高','http://www.baidu.com')">
                                <i class="iconfont">&#xe6a8;</i>弹出自动宽高
                            </a>
                        </dd>
                        <dd>
                            <a onclick="xadmin.open('弹出指定宽高','http://www.baidu.com',500,300)">
                                <i class="iconfont">&#xe6a8;</i>弹出指定宽高
                            </a>
                        </dd>
                        <dd>
                            <a onclick="xadmin.add_tab('在tab打开','member-list.html')">
                                <i class="iconfont">&#xe6b8;</i>在tab打开
                            </a>
                        </dd>
                        <dd>
                            <a onclick="xadmin.add_tab('在tab打开刷新','member-del.html',true)">
                                <i class="iconfont">&#xe6b8;</i>在tab打开刷新
                            </a>
                        </dd>
                    </dl>
                </li>
            </ul>
            <ul class="layui-nav right">
                <li class="layui-nav-item to-index">

                    <span style="font-family: digital-7;color: #4cff00; " >{{show_time}}</span>
                    <span style="font-family: digital-7;color: #4cff00; " class="date" >{{datatime}} </span>

                </li>
                <li class="layui-nav-item">
                    <a href="javascript:;"><img :src="users.picture" class="layui-nav-img">
                        【{{users.orname}}】{{users.name}}
                    </a>
                    <dl class="layui-nav-child">
                        <!-- 二级菜单 -->
                        <dd>
                            <a v-on:click="setpassword()">修改密码</a>
                        </dd>
                        <dd>
                            <a onclick="xadmin.open('个人信息','http://www.baidu.com')">个人信息</a>
                        </dd>
                        <dd>
                            <a onclick="window.location.href='/winos.html'">win10界面</a>
                        </dd>
                        <dd>
                            <a v-on:click="exit()">退出</a>
                        </dd>
                    </dl>
                </li>

            </ul>
        </div>
        <!-- 顶部结束 -->
        <script type="text/html" id="password" style="display:none">

    <form class="layui-form layui-form-pane" lay-filter="laypasswd">
    <form class="layui-form layui-form-pane" lay-filter="addinfos">
        <div id="asxsyd92heater"></div>

        <div class="layui-row layui-col-space15 layui-form-item">
            <!--多行输入框-->
            <div class="_two"><div class="asxsyd92move" id="_asxsfromname" style="text-align: center;" ><fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;"><legend>修改密码</legend></fieldset> </div><div  class="layui-col-md6"><div class="layui-form-item"><label class="layui-form-label">原密码</label><div class="layui-input-block"><input class="layui-input" data-target="" id="oldpw" lay-filter="column" lay-verify="required" name="oldpw" placeholder="请输入原密码" type="password"></div></div></div><div "" class="layui-col-md6"><div class="layui-form-item"><label class="layui-form-label">新密码</label><div class="layui-input-block"><input class="layui-input" data-target="" id="newpw" lay-filter="column" lay-verify="pass" name="newpw" placeholder="请输入新密码" type="password"></div></div></div><div "" class="layui-col-md6"><div class="layui-form-item"><label class="layui-form-label">确认密码</label><div class="layui-input-block"><input class="layui-input" data-target="" id="pw" lay-filter="column" lay-verify="pass" name="pw" placeholder="请输入确认密码" type="password"></div></div></div></div>
            <!--一行行输入框-->
            <div class="_one"></div>
        </div>
        <div class="layui-form-item">
            <p style="text-align: center;color:red;">密码必须满足：数字、字母、特殊符号组成，密码长度8位至16位之间！</p></br>
            <div class="layui-input-block">
                <button class="layui-btn layui-btn-normal " lay-filter="_submit" lay-submit="">立即提交</button>
     
            </div>
        </div>
    </form>
     </form>
        </script>
    </div>

</template>
<script>

    export default {
        name: 'sysheader', data() {
            return {
                users: [],datatime:'',show_time:''
            }

        }, 
      
      mounted: function () {
            var m = this;
            m.getuser();
            m.showtime();
                  m.xiugai();
            let form = layui.form, element = layui.element;
            form.render();
            element.render();
        }, methods: {
   xiugai() {
        layui.form.verify({
          username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
              return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
              return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
              return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
              alert('用户名不能为敏感词');
              return true;
            }
          }

          //我们既支持上述函数式的方式，也支持下述数组的形式
          //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
          , pass: [
            /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[.~!@#$%^&*])[\da-zA-Z~!@#$%^&.*]{8,16}$/
            , '为了保证账号安全：密码必须包含数字、字母、特殊符号组成,密码长度8至16之间！'
          ]
        });
        layui.form.on('submit(_password)', function (data) {
          if (data.field.newpw.length < 6) {
            layer.tips('密码过短！', '#pw', {
              tips: [1, '#FF5722']
            });
            return false;
          }
          if (data.field.pw == "") {
            //tips层-左
            layer.tips('请输入确认密码！', '#pw', {
              tips: [1, '#FF5722']
            });
            return false;
          }
          if (data.field.newpw !== data.field.pw || data.field.pw == "") {
            //tips层-左
            layer.tips('两次密码不一致', '#pw', {
              tips: [1, '#FF5722']
            });
            return false;
          }

          m.$post(m.host + "/api/users/EditPw", { old: data.field.oldpw, pw: data.field.pw }).then(res => {
            console.log(res);


          }).catch(resp => {
            if (resp.success === true) {

              top.layer.closeAll();

              layer.alert(resp.msg);
            } else {
              layer.alert(resp.msg);
              return false;
            }
          }, function (resp) {
            layer.alert(resp.statusText);
          });






          return false;
        });
      },
            getuser: function () {
                var m = this;
                var us = new Object();
                us.id = window.localStorage["userid"];
                us.name = window.localStorage["user"];
                us.orid = window.localStorage["orid"];
                us.orname = window.localStorage["orname"];
                us.picture = window.localStorage["picture"];
                m.users = us;
            },
            setpassword: function () {
             
                layui.layer.open({
                    type: 1,
                    title: '修改密码',
                    shadeClose: true,
                    shade: 0.8,
            
                    area: ['35%', '55%'],
                    content: document.getElementById("password").innerHTML
                });
                console.log(this)
            }, exit: function () {
                var m = this;

                layui.layer.confirm('你确定要退出系统吗？', {
                    btn: ['确定', '取消'] //按钮
                }, function (index) {
                    layui.layer.close(index);
                    window.localStorage.clear();
                    window.sessionStorage.clear()
                    m.$router.push('/login');
                }, function () {

                });
            }, showtime: function () {
                var m=this;
                try {
                    setInterval(function () {
                         var da = new Date();
                           m.  datatime= da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate();
                           m.show_time = da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds() + ' 星期' + '日一二三四五六'.charAt(da.getDay());
                      
                    }, 100);
                } catch (e) { console.log(e); }
            }
        }

    }
</script>