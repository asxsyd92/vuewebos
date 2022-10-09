<template>
<div v-if="menus!=undefined">
    <div v-for="(menu, index) in menus" :key="index">
        <div v-if="menu.children.length>0">
            <lay-sub-menu :id="menu.id">
                <template #icon>
                    <lay-icon :type="menu.icon" :style="'color:' + menu.color + ' !important;'" ></lay-icon>
                </template>
                <template #title>{{ menu.title }}</template>
                <GlobalMenuItem :menus="menu.children"></GlobalMenuItem>
            </lay-sub-menu>
        </div>
        <div v-else>
            <lay-menu-item :id="menu.id">
                <template #icon>
                    <lay-icon :type="menu.icon" :style="'color:' + menu.color + ' !important;'" ></lay-icon>
                </template>
                <template #title>{{ menu.title }}</template>
            </lay-menu-item>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import GlobalMenuItem from "./GlobalMenuItem.vue"
import { defineComponent } from "vue";

export default defineComponent({
    name:  "GlobalMenuItem",
    props: {
        menus: {
            type: Object
        }
    }
})
</script>