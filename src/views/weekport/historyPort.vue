<template> 
      <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="min-height:88vh;"> -->
         
        <!-- <van-list
            v-model:loading="loading"
            :finished="finished" 
            finished-text="没有更多了"
            offset="30"
            @load="onLoad"
        > -->
         <div class="nodata" v-if="list.length<1">
            暂无数据~
            </div>
          <div class="history">
         <li v-for="(item,index) in  list" :key="index" @click="gotoDateils(item)">
            <div class="titles">{{dateChanges(item.weekDate)}}</div>
            <div class="rihtdiv">
                <div class="mv_colors1 gdcss" v-if="item.status == '待上报'">{{item.status}}</div>
                  <div class="mv_colors2 gdcss" v-if="item.status == '已上报'">{{item.status}}</div>
                 <div class="mv_colors5 gdcss" v-if="item.status == '延迟上报'">{{item.status}}</div>
                   <div class="mv_colors4 gdcss" v-if="item.status == '已逾期'">{{item.status}}</div>
                    <div class="mv_colors3 gdcss" v-if="item.status == '已批复'">{{item.status}}</div>
                <img src="@/assets/img/right_jt.png">
            </div>
        </li>
       
        <!-- <li>
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
        </li> -->
          </div>
            <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <!-- </van-list> -->
        <!-- </van-pull-refresh> -->
</template>

<script>
import {ref,onMounted,reactive,toRefs, getCurrentInstance} from 'vue'
import {getWeekDay, getWeek,getNewData} from '../../assets/js/util'
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
       const {ctx} = getCurrentInstance()
    //    const onRefresh = ()=>{
    //         data.finished = false; 
    //         data.loading = true;
    //         onLoad();
    //    }
    //     const onLoad = ()=>{
    //        setTimeout(() => {
    //             if (data.refreshing) {
    //             data.list = [];
    //             data.refreshing = false;
    //             }

    //             for (let i = 0; i < 10; i++) {
    //             data.list.push(data.list.length + 1);
    //             }
    //             data.loading = false;

    //             if (data.list.length >= 40) {
    //                  data.finished = true;
    //             }
    //             data.loading = false
    //         }, 1000);
    //    }
    onMounted(()=>{
        getUserportlist()
    })
    //历史报里面有待提交的
    const gotoUpdate = (id, name) =>{
         ctx.$router.push({path:'/layout/weekfill', query:{
                isID:id
             }})
     }
     const gotoDateils = (item) =>{
         ctx.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            });
         if(item.status == '待上报'){ 
              ctx.$HttpApi.get(`/api/WeekReview/leader/${item.weekID}`).then((res)=>{
                 if(res.code == 0){
                   let addWeekReport = ctx.$store.state.addWeekReport
                    if(res.data.detail.id){ 
                            ctx.$store.state.isID = res.data.detail.id
                             ctx.$store.state.isWeekFill = res.data.detail.status
                        } 
                    if(res.data.detail == null){
                        addWeekReport.weekPlans = [],
                        addWeekReport.weekNextPlans = [],
                        addWeekReport.weekMend =[]
                    }else{
                        addWeekReport.weekPlans = res.data.detail.weekPlans?res.data.detail.weekPlans:[],
                        addWeekReport.weekNextPlans = res.data.detail.weekNextPlans?res.data.detail.weekNextPlans:[],
                        addWeekReport.weekMend = res.data.detail.weekMend?res.data.detail.weekMend:[]
                    }
                    setTimeout(()=>{
                        ctx.$router.push({path:'/layout/weekfill', query:{
                            isID:item.weekID
                        }})
                    },2000)
                 }
                 
            }).catch((err)=>{
                console.log(err)
            })  
         }else{
              ctx.$router.push({path:'/layout/weekCheck',query:{
             id:item.weekID,
             name:item.name,
             isLeader:0,
             empStatus:item.status,
             empWeekDate:item.weekDate
         } })
         }
        
     }
       const getUserportlist = ()=>{
            ctx.$HttpApi.post('/api/WeekReview/list',{}).then((res)=>{
                let rescodes =  res.data
                if(rescodes.code == 0){
                    data.list = rescodes.data
                }else{
                    ctx.$notify({
                        message: rescodes.message,
                        type: 'warning',
                    })
                }
            }).catch((err)=>{
                console.log(err)
            })
       }
        const dateChanges = (val) =>{
            if(val){
            let week = val.slice(0,10)
            let weekend = getNewData(week, 6)
            return `${week} 至 ${weekend}`

            }else{
                return val
            }
        }
 
       const refdata = toRefs(data)
       return{
           ...refdata,
           gotoDateils,
           gotoUpdate,
           dateChanges
        //    onLoad,
        //    onRefresh
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
     .mv_colors5{
        background-color: #FF8A56;
    }
</style>