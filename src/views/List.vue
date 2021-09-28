<template>
    <div class="list">
        <a-button @click="page">新增tab页面</a-button>
    </div>
</template>

<script>
    export default {
        name: "List",
        methods:{
            page(){
                this.$router.push({path: 'new'})
            }
        }
    }
</script>

<style scoped>

</style>