<template>
      <div>
    <sysleft></sysleft>

        <div class="page-content">
                  <vue-tabs></vue-tabs>
        </div>


  </div>
</template>

<script>
import home from '@/pages/index/home'
import sysleft from '@/components/sysleft'

export default {
    name: 'index',
    components: {
        home, sysleft
    },
    methods: {
        dd (tab) {
            console.log(tab)
        }
    }
}

// import sysheader from '@/components/sys/sysheader'
// import syscontent from '@/components/sys/syscontent'
// import sysleft from '@/components/sys/sysleft'
// export default {
//   name: 'index'
//   ,components:{

//     sysheader,sysleft,syscontent
//   }
// }
</script>
<style>
 @import './../../assets/css/vue-tabs.css';
 </style>

