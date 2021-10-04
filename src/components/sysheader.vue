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

                    <span style="font-family: digital-7;color: #4cff00; " id="show_time"></span>
                    <span style="font-family: digital-7;color: #4cff00; " class="date" id="datatime"> </span>

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
        <div id="password" style="display:none">
            <password></password>
        </div>
    </div>

</template>
<script>
    import password from "@/pages/users/password.vue"
    export default {
        name: 'sysheader', data() {
            return {
                users: []
            }

        }, 
        components: { password },
      mounted: function () {
            var m = this;
            m.getuser();
            m.showtime();
            let form = layui.form, element = layui.element;
            form.render();
            element.render();
        }, methods: {

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
                try {
                    setInterval(function () {
                        var time = document.getElementById("datatime");
                        var show_time = document.getElementById("show_time");

                        var da = new Date();
                        if (time != null & time != undefined) {
                            time.innerHTML = da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate();
                            show_time.innerHTML = da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds() + ' 星期' + '日一二三四五六'.charAt(da.getDay());
                        }
                    }, 100);
                } catch (e) { console.log(e); }
            }
        }

    }
</script>