import home from '@/pages/index/home'

export default [{
    name: 'home',
    title: '首页',
    id: 'id_home',
    component: home,
    beforeCreate (tab, next) {
        console.log('before create:', tab)
        next()
    },
    beforeClose (tab, next) {
        console.log('before close', tab)
        next()
    }
}, {
    name: 'test1',
    title: '测试1',
    component: {
        template: '<h2>测试1</h2>'
    },
    beforeCreate (tab, next) {
        console.log('before create:', tab)
        next()
    }
}, {
    name: 'test2',
    title: '测试2',
    component: resolve => {
        setTimeout(() => {
            resolve({
                template: '<p>测试2</p>'
            })
        }, 1000)
    }
}, {
    name: 'async',
    title: '异步组件',
    component: resolve => {
        // require.ensure(['./components/AsyncComp.vue'], () => {
        //     resolve(require('./components/AsyncComp.vue'))
        // })
        // setTimeout(() => {
        //     resolve({
        //         template: '<h2>我是异步组件, 我也是受害者</h2>'
        //     })
        // }, 3000)
    }
}, {
    name: 'setting',
    title: '设置',
    component: {
        template: '<h2>设置</h2>'
    }
}]