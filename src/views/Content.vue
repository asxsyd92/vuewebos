<template>
    <div class="Content">
        联系我们
        <a-button @click="page">新页面</a-button>
    </div>
</template>

<script>
    export default {
        name: "Content",
        methods:{
            page(){
                this.$router.push({path: '/column/new'})
            }
        }
    }
</script>

<style scoped lang="less">

</style>