
<template>
    <div class="layer-container">
        <div class="layer-wrapper">
            <div class="layer-close">信息<img class="close-icon" src="" alt=""></div>
            <div class="layer-content">{{options.text}}</div>
            <div class="layer-button">
                <div class="layer-cancle"  v-show="options.cancle" @click="cancleHandle">取消</div>
                <div class="layer-confirm" @click="confirmHandle">确认</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'layer',
        data(){
            return {
                options:{
                    text:'', //
                    confirm:'', //confirm function key 
                    cancle:'', // cancle function key
                }
            }
        },
        created(){
            var self = this;
        },
        methods:{
            cancleHandle(){
                 if(this.options.cancle) {
                     this.options.cancle();
                     this.$layer.hide();
                 }
                 else
                    this.$layer.hide();              
            },
            confirmHandle(){
                if(this.options.confirm){
                    this.options.confirm();
                    this.$layer.hide();                              
                }
                else
                this.$layer.hide();                              
            }
        }
    }
</script>

<style >
    .layer-container{
        width: 100%;height: 100%;position: fixed;background-color: rgba(0,0,0,0.3);top:0;left: 0;right: 0;bottom: 0;
        .layer-wrapper{width: 460px;position: absolute;left:50%;top:50%;margin-left: -230px;margin-top: -84px;background: #ffffff;border-radius:2px;z-index: 9999999;
            .layer-close{width: 100%;height: 42px;overflow: hidden;padding : 0 80px 0 20px;position: relative;line-height:42px;font-size:14px;color:#333;background:#f8f8f8;
                .close-icon{width: 100%;height: 100%;position: absolute;right: 0;top: 0;}
            }
            .layer-content{
                font-size: 14px;color: #666666;padding:20px;line-height: 24px;text-align: center;word-break: break-all;
            }
            .layer-button{
                width: 100%;height: 32px;overflow: hidden;display:flex;justify-content: center;margin:0 0 12px;
                div{width: 100px;height: 100%;line-height: 32px;text-align: center;color: #fff;border: 1px solid #E5E5F0;border-radius: 4px;cursor: pointer;font-size: 14px;}
                .layer-cancle{background-color: #fff;color: #333;}
                .layer-confirm{background-color: #7C77E2;margin-right: 20px;}
            }
        }
    }
</style>