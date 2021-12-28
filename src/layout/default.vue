<template>
    <!-- <a-layout class="components-layout-demo-custom-trigger">
       -->
    <div>
        <sysheader></sysheader>

        <div class="left-nav">
            <div id="side-nav">
                <ul id="nav">

                    <li v-for="m in menus" :key="m.id">
                        <a href="javascript:;">
                            <i class="iconfont left-nav-li " v-bind:title="m.title" v-bind:lay-tips="m.title">
                                <i v-bind:style="{color:Color(m.color)}" :class="m.icon"></i>
                            </i>
                            <cite>{{m.title}}</cite>
                            <i class="iconfont nav_right">&#xe6a7;</i>
                        </a>

                        <ul class="sub-menu" v-for="ms in m.children" :key="ms.id">
                            <li v-on:click="add_tab(ms)">

                                <a>
                                    <i class="iconfont">&#xe6a7;</i>
                                    <cite>{{ms.title}}</cite>
                                </a>
                            </li>

                        </ul>
                    </li>

                </ul>
            </div>
                <div class="page-tabs">
            <a-tabs hideAdd :size="'small'" v-model="activeKey" type="editable-card" @edit="onEdit">
                <a-tab-pane v-for="pane in panes" :tab="pane.meta.title" :key="pane.path"
                    :closable="pane.path == inRoutes[0].children[0].path ? false : true" />
            </a-tabs>
        </div>
        </div>
    
        <div class="page-content">
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
    </div>

</template>

<script>
    import panes from "./panes";
    import sysheader from './sysheader'
    export default {
        name: "default", components: { sysheader },
        data() {
            return {
                collapsed: false, menus: []
            }
        },
        mounted: function () {

            this.getmenu();


        },
        mixins: [panes],
        methods: {
            add_tab(to) {
                console.log("tianjia");
                var m = this;
                if (m.$route.fullPath.indexOf(to.tag) > -1) {
                    if(to.params!=null&&to.params!=""){
                    m.$router.push({
                        path: "/" + to.tag + "/" + to.params + "/" + to.id,

                    }
                    )
                    }else{
                            m.$router.push({
                        path: "/" + to.tag ,

                    } )
                    }
                
                } else {
                           if(to.params!=null&&to.params!=""){
                    m.$router.push({
                        path: "/" + to.tag + "/" + to.params + "/" + to.id,

                    } )
                           }else{

        m.$router.push({
                        path: "/" + to.tag ,

                    } )
                           }
                }

            },
            onEdit(e) {
                let panes = this.panes;
                let activeKey = this.activeKey;
                let index = panes.findIndex((item) => { return item.path == e });
          
                panes.splice(index, 1);
                this.panes = panes;
                if (e == activeKey) {
                    this.activeKey = panes[index - 1].path
                }
            }, getmenu: function () {
                var m = this;
                
                m.$post(m.host + '/api/users/GetAppList', {}).then(res => {
                    console.log(res);


                }).catch(res => {
                    if (res.success) {
                        var mydata = res.data;
                        m.menus = mydata;
                        setTimeout(function () {
                            m.init();
                        }, 1000);
                        console.log(res);
                    } else {
                        layer.msg(res.msg, { icon: 2 });
                    }
                });

            },
            Color: function (_this) {
                console.log(_this);
                if (_this === null || _this === undefined) {
                    return "red";
                } else return _this;

            }, init() {

                var layer = layui.layer, $ = layui.$,
                    element = layui.element, form = layui.form;
               if ($('.left-nav').css('width') == '60px') {
                      $('.page-tabs').animate({ left: '60px' }, 10);
               }

                // 打开页面初始
                xadmin.init();

                //关闭tab清除记忆
                element.on('tabDelete(xbs_tab)', function (data) {
                    var id = $(this).parent().attr('lay-id');
                    xadmin.del_data(id);
                });
                //左侧菜单
                $('.left-nav #nav').on('click', 'li', function (event) {

                    if ($(this).parent().attr('id') == 'nav') {
                        xadmin.set_cate_data({ key: 'f1', value: $('.left-nav #nav li').index($(this)) })
                        xadmin.set_cate_data({ key: 'f2', value: null })
                        xadmin.set_cate_data({ key: 'f3', value: null })
                    }

                    if ($(this).parent().parent().parent().attr('id') == 'nav') {
                        xadmin.set_cate_data({ key: 'f2', value: $('.left-nav #nav li').index($(this)) })
                        xadmin.set_cate_data({ key: 'f3', value: null })
                    }

                    if ($(this).parent().parent().parent().parent().parent().attr('id') == 'nav') {
                        xadmin.set_cate_data({ key: 'f3', value: $('.left-nav #nav li').index($(this)) })
                    }



                    if ($('.left-nav').css('width') == '60px') {
                        $('.left-nav').animate({ width: '220px' }, 100);
                        $('.page-content').animate({ left: '220px' }, 100);
                        $('.page-tabs').animate({ left: '220px' }, 100);

                        $('.left-nav i').css('font-size', '14px');
                        $('.left-nav cite,.left-nav .nav_right').show();
                    }

                    if ($(window).width() < 768) {
                
                        $('.page-content-bg').show();
                    }

                    $('.left-nav').find('a').removeClass('active');
                    $(this).children('a').addClass('active');
                    if ($(this).children('.sub-menu').length) {
                        if ($(this).hasClass('open')) {
                            $(this).removeClass('open');
                            $(this).find('.nav_right').html('&#xe697;');
                            $(this).children('.sub-menu').stop(true, true).slideUp();
                            $(this).siblings().children('.sub-menu').slideUp();
                        } else {
                            $(this).addClass('open');
                            $(this).children('a').find('.nav_right').html('&#xe6a6;');
                            $(this).children('.sub-menu').stop(true, true).slideDown();
                            $(this).siblings().children('.sub-menu').stop(true, true).slideUp();
                            $(this).siblings().find('.nav_right').html('&#xe697;');
                            $(this).siblings().removeClass('open');
                        }
                    }
                    event.stopPropagation();
                })
                var left_tips_index = null;
                $('.left-nav #nav').on('mouseenter', '.left-nav-li', function (event) {
                    if ($('.left-nav').css('width') != '220px') {
                        var tips = $(this).attr('lay-tips');
                        left_tips_index = layer.tips(tips, $(this));
                    }
                })

                $('.left-nav #nav').on('mouseout', '.left-nav-li', function (event) {
                    layer.close(left_tips_index);
                })
                // 隐藏左侧
                $('.container .left_open i').click(function (event) {
                    if ($('.left-nav').css('width') == '220px') {
                        $('.left-nav .open').click();
                        $('.left-nav i').css('font-size', '18px');
                        $('.left-nav').animate({ width: '60px' }, 100);
                        $('.left-nav cite,.left-nav .nav_right').hide();
                        $('.page-content').animate({ left: '60px' }, 100);
                        $('.page-tabs').animate({ left: '60px' }, 100);
                        $('.page-content-bg').hide();
                    } else {
                        $('.left-nav').animate({ width: '220px' }, 100);
                        $('.page-content').animate({ left: '220px' }, 100);
                        $('.page-tabs').animate({ left: '220px' }, 100);
                        $('.left-nav i').css('font-size', '14px');
                        $('.left-nav cite,.left-nav .nav_right').show();
                        if ($(window).width() < 768) {
                            $('.page-content-bg').show();
                        }
                    }

                });

                $('.page-content-bg').click(function (event) {
                    $('.left-nav .open').click();
                    $('.left-nav i').css('font-size', '18px');
                    $('.left-nav').animate({ width: '60px' }, 100);
                    $('.left-nav cite,.left-nav .nav_right').hide();
                    $('.page-content').animate({ left: '60px' }, 100);
                    $('.page-tabs').animate({ left: '60px' }, 100);
                    $(this).hide();
                });

                $(".layui-tab-title").on('contextmenu', 'li', function (event) {
                    var tab_left = $(this).position().left;
                    var tab_width = $(this).width();
                    var left = $(this).position().top;
                    var this_index = $(this).attr('lay-id');
                    $('#tab_right').css({ 'left': tab_left + tab_width / 2 }).show().attr('lay-id', this_index);
                    $('#tab_show').show();
                    return false;
                });

                $('#tab_right').on('click', 'dd', function (event) {
                    var data_type = $(this).attr('data-type');
                    var lay_id = $(this).parents('#tab_right').attr('lay-id');
                    if (data_type == 'this') {
                        $('.layui-tab-title li[lay-id=' + lay_id + ']').find('.layui-tab-close').click();
                    } else if (data_type == 'other') {
                        $('.layui-tab-title li').eq(0).find('.layui-tab-close').remove();
                        $('.layui-tab-title li[lay-id!=' + lay_id + ']').find('.layui-tab-close').click();
                    } else if (data_type == 'all') {
                        $('.layui-tab-title li[lay-id]').find('.layui-tab-close').click();
                    }
                    $('#tab_right').hide();
                    $('#tab_show').hide();
                })


                $('.page-content,.page-tabs,#tab_show,.container,.left-nav').click(function (event) {
                    $('#tab_right').hide();
                    $('#tab_show').hide();
                });

                // 页面加载完要做的
                xadmin.end();
            }
        }

    }
</script>

<style scoped lang="less">
    /deep/.ant-tabs-bar {
        margin: 0;
    }

    .components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    .components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    .components-layout-demo-custom-trigger .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }

    .components-layout-demo-custom-trigger {
        height: 100%;
    }


    .page-content {

        position: absolute;
        z-index: 1;
        top: 85px;
        overflow-y: scroll;
    }

    .page-tabs {
        top: 45px;
        position: fixed;
        left: 220px;
        width: 100%;
        background-color: #f5f5f5 !important;
    }
</style>