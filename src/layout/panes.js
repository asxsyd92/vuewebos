import {inRoutes} from "../router";

export default {
    data() {
        return {
            inRoutes,
            activeKey: inRoutes[0].children[0].path,
            panes: [inRoutes[0].children[0]]
        }
    },
    created() {
        this.initPanes();
    },
    methods: {
        // 添加Panes
        addPanes(to) {
            let panesIndex = this.panes.findIndex((item) => {
                return item.path == to.path
            });
            let activeKey = '';
            if (panesIndex == -1) {
                let panes = this.panes;
                panes.push({path: to.path, meta: to.meta});
                this.panes = panes;
                activeKey = to.path
            } else {
                activeKey = this.panes[panesIndex].path
            }
            this.activeKey = activeKey
        },
        // 初始化Panes
        initPanes() {
            let route = this.$route;
            if (route.path != this.activeKey) {
                let panes = this.panes;
                panes.push({path: route.path, meta: route.meta});
                this.panes = panes;
                this.activeKey = route.path
            }
        }
    },

    watch: {
        $route(to, from) {
            this.addPanes(to)
        },
        activeKey(key,old){
            if(key != this.$route.path){
                this.$router.push({path: key})
            }
        }
    }


}