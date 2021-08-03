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
    name: 'formdesign',
    title: '表单设计',
    component:  resolve => {
        require.ensure(['./pages/formdesign/formdesign.vue'], () => {
            resolve(require('./pages/formdesign/formdesign.vue'))
        })},
    beforeCreate (tab, next) {
        console.log('before create:', tab)
        next()
    }
}, {
    name: 'querylist',
    title: '列表',
    component: resolve => {
        require.ensure(['./pages/common/querylist.vue'], () => {
            resolve(require('./pages/common/querylist.vue'))
        })
    // resolve => {
    //     setTimeout(() => {
    //         resolve({
    //             template: '<p>测试2</p>'
    //         })
    //     }, 1000)
     }
},
 {
    name: 'async',
    title: '异步组件',
    component: resolve => {
        require.ensure(['./components/AsyncComp.vue'], () => {
            resolve(require('./components/AsyncComp.vue'))
        })
        // setTimeout(() => {
        //     resolve({
        //         template: '<h2>我是异步组件, 我也是受害者</h2>'
        //     })
        // }, 3000)
    }
}, {
    name: 'password',
    title: '修改密码',
    component: resolve => {
        require.ensure(['@/pages/users/password.vue'], () => {
            resolve(require('@/pages/users/password.vue'))
        })
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