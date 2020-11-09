<template> 
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="min-height:88vh;">
         
        <van-list
            v-model:loading="loading"
            :finished="finished" 
            finished-text="没有更多了"
            offset="30"
            @load="onLoad"
        >
          <div class="history">
         <li>
            <div class="titles">2020 ( 04.25-04.30 )</div>
            <div class="rihtdiv">
                <div class="mv_colors1 gdcss">待上报</div>
                <img src="@/assets/img/right_jt.png">
            </div>
        </li>
        <li>
            <div class="titles">2020 ( 04.25-04.30 )</div>
            <div class="rihtdiv">
                <div class="mv_colors2 gdcss">已上报</div>
                <img src="@/assets/img/right_jt.png">
            </div>
        </li>
        <li>
            <div class="titles">2020 ( 04.25-04.30 )</div>
            <div class="rihtdiv">
                <div class="mv_colors3 gdcss">已批复</div>
                <img src="@/assets/img/right_jt.png">
            </div>
        </li>
        <li>
            <div class="titles">2020 ( 04.25-04.30 )</div>
            <div class="rihtdiv">
                <div class="mv_colors4 gdcss">已逾期</div>
                <img src="@/assets/img/right_jt.png">
            </div>
        </li>
          </div>
            <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        </van-list>
        </van-pull-refresh>
</template>

<script>
import {ref,onMounted,reactive,toRefs, getCurrentInstance} from 'vue'
  export default {
    name:'history',
    props:[''],
   setup(){
       const data = reactive({
           list:[],
           refreshing:false,
           loading:false,
           finished:false,

       })
       const onRefresh = ()=>{
            data.finished = false; 
            data.loading = true;
            onLoad();
       }
        const onLoad = ()=>{
           setTimeout(() => {
                if (data.refreshing) {
                data.list = [];
                data.refreshing = false;
                }

                for (let i = 0; i < 10; i++) {
                data.list.push(data.list.length + 1);
                }
                data.loading = false;

                if (data.list.length >= 40) {
                     data.finished = true;
                }
                data.loading = false
            }, 1000);
       }
       const refdata = toRefs(data)
       return{
           ...refdata,
           onLoad,
           onRefresh
       }
   }
  }

</script>
<style lang='css' scoped>
    .history{
        background-color: #fff;
        border-radius:20px;
        padding-left: 37px;
    }
    .history li{
        border-bottom:1px solid #E2E2E2;
        display: flex;
        justify-content: space-between;
        min-height: 98px;
        align-items: center;
        padding-right: 40px;
    }
    .history li:last-child{
        border-bottom:none;
    }
    .rihtdiv{
        display: flex;
    }
    .rihtdiv img{
        width: 14px;
        height: 28px;
    }
    .gdcss{
        display: inline-block;
        padding:6px 18px;
        border-radius: 16px;
        color: #fff;
        font-size: 20px;
        margin-right: 20px;
    }
    .mv_colors1{
        background-color: #F99E9E;
    }
     .mv_colors2{
        background-color: #79D47B;
    }
     .mv_colors3{
        background-color: #6497B2;
    }
     .mv_colors4{
        background-color: #CDCDCD;
    }
</style>