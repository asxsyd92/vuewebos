import LayerComponent from '@/components/layui/Layer.vue'  //引入layer 组件

export default {
    install(Vue, options) {   //插件安装
        let Layer = Vue.extend(LayerComponent)  
        let $vm = new Layer()

        Vue.prototype.$layer = { // 在Vue的原型上添加实例方法，以全局调用  //layer 方法
            show(opt) { // 控制toast显示的方法  //show 事件
                $vm.options = opt;
                document.body.appendChild($vm.$mount().$el)   //插入dom
            },
            hide(opt) { // 控制toast隐藏的方法
                console.log(opt)
                document.body.removeChild($vm.$mount().$el)
            }
        }
}
}