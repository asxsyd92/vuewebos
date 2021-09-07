<template>
    <div class="login">
        <form class="layui-form">
            <div class="login">
                <div class="box png">
                    <div class="logo png"></div>
                    <div class="input">
                        <div class="log">
                            <div class="name">
                                <label>用户名</label><input type="text" class="text" id="user" name="user"
                                    placeholder="用户名" tabindex="1" />
                            </div>
                            <div class="pwd">
                                <label>密　码</label><input type="password" class="text" id="password" placeholder="密码"
                                    name="password" tabindex="2" />
                         
                              
                            
                            </div>
                             <div class="pwd">
                                    <label>验证码</label><input type="text" class="text" id="code" name="code"
                                    placeholder="请输入验证码" tabindex="1" style="width:40%"/><img :src="code"/>
                                    <div class="check"></div>
                                       <input type="button" class="submit" lay-submit lay-filter="formsubmit" tabindex="3"
                                    value="登录" />
                             </div>
                         
                            <div class="tip"></div>
                        </div>
                    </div>

                </div>
                <div class="air-balloon ab-1 png"></div>
                <div class="air-balloon ab-2 png"></div>
                <div class="footer"></div>
            </div>
        </form>
    </div>
</template>
<script>

    export default {
        name: 'login',
        data() {
            return {
                user: [],code:'',
                viewSize: [], viewWidth: 0, viewHeight: 0
            }
        },
        mounted: function () {
            var m = this;
            let form = layui.form;
            m.code=m.host+"/api/login/getCode"
            m.airBalloon('div.air-balloon');
            //监听提交
            form.on('submit(formsubmit)', function (data) {
                console.log(data);
                m.login(data.field);
                return false;
            });
        },
        methods: {

            rand(mi, ma) {
                var range = ma - mi;
                var out = mi + Math.round(Math.random() * range);
                return parseInt(out);
            },
            airBalloon(balloon) {
               var $ = layui.$;
               var m=this;
                m.resize();
      
                $(balloon).each(function () {
                    $(this).css({ top: m.rand(40, m.viewHeight * 0.5), left: m.rand(10, m.viewWidth - $(this).width()) });
                  m.  fly(this);
                });
                $(window).resize(function () {
                    m.resize()
                    $(balloon).each(function () {
                        $(this).stop().animate({ top:m. rand(40, m.viewHeight * 0.5), left: m.rand(10, m.viewWidth - $(this).width()) }, 1000, function () {
                          m.  fly(this);
                        });
                    });
                })
            },

            resize() {
             var $ = layui.$;
             var m=this;
                m.viewSize = m.getViewSize();
                m.viewWidth = $(document).width();
                m.viewHeight = m.viewSize[1];
            }
            ,

            fly(obj) {
                var m=this;
                var $ = layui.$;
                var $obj = $(obj);
                var currentTop = parseInt($obj.css('top'));
                var currentLeft = parseInt($obj.css('left'));
                var targetLeft =m. rand(10, m.viewWidth - $obj.width());
                var targetTop =m. rand(40, m.viewHeight / 2);
                /*求两点之间的距离*/
                var removing = Math.sqrt(Math.pow(targetLeft - currentLeft, 2) + Math.pow(targetTop - currentTop, 2));
                /*每秒移动24px ，计算所需要的时间，从而保持 气球的速度恒定*/
                var moveTime = removing / 24;
                $obj.animate({ top: targetTop, left: targetLeft }, moveTime * 1000, function () {
                    setTimeout(function () {
                      m.  fly(obj);
                    }, m.rand(1000, 3000));
                });
            },
            getViewSize() {
                var de = document.documentElement;
                var db = document.body;
                var viewW = de.clientWidth == 0 ? db.clientWidth : de.clientWidth;
                var viewH = de.clientHeight == 0 ? db.clientHeight : de.clientHeight;
                return Array(viewW, viewH);


            }, login(data) {
                let m = this;
                let $ = layui.$;

                if (data.user.length <= 0) {
                    layer.tips('用户名不能为空！', '#user');
                    return false;
                }
                if (data.password.length <= 0) {
                    layer.tips('密码不能为空！', '#password');
                    return false;
                }
                     if (data.code.length <= 0) {
                    layer.tips('验证码不能为空！', '#code');
                    return false;
                }
                var lay = layer.msg('正在登陆...', { icon: 16, shade: 0.5, time: 20000000 });
                m.$post(m.host+"/api/login/Login", { user: data.user, pw: data.password,code:data.code }).then(res => {
                 console.log(res);
         

                }).catch(data=>{

                    layer.close(lay);
                    if (data.success) {

                        window.localStorage["user"] = data.name;
                        window.localStorage["userid"] = data.userid;
                        window.localStorage["orname"] = data.orname;
                        window.localStorage["orid"] = data.orid;
                        window.localStorage["_token"] = data.access_token;
                        window.localStorage["account"] = data.account;
                        window.localStorage["picture"] = data.picture;
                        m.$router.push('/index');


                        //  show_msg('登录成功咯！  正在为您跳转...', "/index.html");
                    } else {
                        layer.msg(data.msg, { icon: 2 });
                        // layer.alert(data.msg);
                        // show_err_msg(data.msg);
                        //  asxsyd92.createCode();
                    }
                })

            }
        }
    }
</script>
<style>
    @import './../../assets/login/css/main.css';
</style>