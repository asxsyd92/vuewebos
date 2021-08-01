<template>
<div class="home">
home
</div>
</template>

<script>
function onActiveChange () {
    console.log('on active change')
}
export default {
    name: 'hello',
    data () {
        console.log('data: ', this.$tab.meta.id)
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    beforeCreate () {
        console.log('1', this.$tab.params, this.$taber)
        this.$taber.$on('vue-tabs-active-change', onActiveChange)
    },
    beforeDestroy () {
        console.log('hello destroy')
        this.$taber.$off('vue-tabs-active-change', onActiveChange)
    },
    created () {
        console.log('2', this.$tab, this.$taber)
    },
    mounted () {
        console.log('3', this.$tab, this.$taber)
    }
}
</script>


