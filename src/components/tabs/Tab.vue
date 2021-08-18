<template>
<li :class="{'active': tabData.active, 'loading': tabData.loading}">{{tabData.meta.title}}<span v-if="tabData.name!='home'" class="btn-close" @click.stop="close">&times;</span></li>
</template>
<script>
export default {
    props: {
        tabData: Object
    },
    methods: {
        close () {
            console.log( this.tabData);
            this.$emit('close', this.tabData)
        }
    }
}
</script>