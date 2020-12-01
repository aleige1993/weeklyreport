<template> 
            <div class="sosodiv">
                <input v-model="sosoval" class="inputso" placeholder="请输入员工姓名"/>
                <span class="sotext" @click="onSearch">搜索</span>
            </div>
          <div class="history"> 
         <!-- <li>
            <div class="titles">111112020 ( 04.25-04.30 )</div>
            <div class="rihtdiv">
                <div class="mv_colors1 gdcss">待上报</div>
                <img src="@/assets/img/right_jt.png">
            </div>
        </li> -->
        <div class="nodata" v-if="islist">
            无数据，试试其他人~
            </div>
        <li
          v-for="(item, index) in list"
          :key="index"
          @click="gotoDateils(item)"
        >
          <div class="titles">{{item.employeeName  }}   {{ dateChanges(item.weekDate) }}</div>
          <div class="rihtdiv">
           <div class="mv_colors1 gdcss" v-if="item.status == '待批复'">{{item.status}}</div>
                 <div class="mv_colors5 gdcss" v-if="item.status == '已延迟'">{{item.status}}</div>
                   <div class="mv_colors4 gdcss" v-if="item.status == '已逾期'">{{item.status}}</div>
                    <div class="mv_colors3 gdcss" v-if="item.status == '已批复'">{{item.status}}</div>
            <img src="@/assets/img/right_jt.png" />
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
        </li>
         <li>
            <div class="titles">2020 ( 04.25-04.30 )</div>
            <div class="rihtdiv">
                <div class="mv_colors5 gdcss">已延迟</div>
                <img src="@/assets/img/right_jt.png">
            </div>
        </li> -->
          </div>
            <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
       
</template>

<script>
import {ref,onMounted,reactive,toRefs, getCurrentInstance} from 'vue'
import {getWeekDay, getWeek,getNewData} from '../../assets/js/util'
  export default {
    name:'soso',
    props:[''],
   setup(){
       const data = reactive({
           list:[],
           refreshing:false,
           loading:false,
           finished:false,
           sosoval:'',
           islist:false

       })
       const { ctx } = getCurrentInstance();
       const gotoDateils = (item) => {
      ctx.$router.push({
        path: "/layout/weekCheck",
        query: {
           id:item.weekID,
             name:item.employeeName,
             isLeader:1,
             empStatus:item.status,
             empWeekDate:item.weekDate 
        },
      });
    };
    const onSearch = () => {
      ctx.$HttpApi
        .post("/api/WeekReview/leader/list",{
          page:1,
          pageSize:10000,
          query:{
            employeeName:data.sosoval
          }
        })
        .then((res) => {
          let rescodes = res.data;
          if (rescodes.code == 0) {
            data.list = rescodes.data;
            if(rescodes.data.length>0){
              data.islist = false
            }else{
               data.islist =true
            }
          } else {
            ctx.$notify({
              message: rescodes.message,
              type: "warning",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
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
    //    const onSearch = ()=>{
    //     console.log(data.sosoval)
    //    }
      const fromTime = (val) => {
      if (val) {
        return val.slice(0, 10);
      } else {
        return val;
      }
    };
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
        //    onLoad,
        //    onRefresh,
           onSearch,
           gotoDateils,
           fromTime,
           dateChanges
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
    .sosodiv{
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        border-radius: 20px;
        margin-bottom: 18px;
        height:80px;
        align-items: center;
    }
    .inputso{
        flex: 1;
        padding-left: 40px;
        border: none;
    }
    .sotext{
        font-size: 28px;
        color: #005C8D;
        width: 100px;
        margin-left:40px;
        height:80px;
        line-height: 80px;
        display: inline-block;
    }
</style>