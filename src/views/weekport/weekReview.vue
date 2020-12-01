<template>
  <van-pull-refresh
    v-model="refreshing"
    @refresh="onRefresh"
    style="min-height: 88vh"
  >
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      offset="30"
      @load="onLoad"
    >
    <div class="nodata" v-if="list.length<1">
            暂无数据~
            </div>
      <div class="history">
        <!-- <li>
            <div class="titles">111112020 ( 04.25-04.30 )</div>
            <div class="rihtdiv">
                <div class="mv_colors1 gdcss">待上报</div>
                <img src="@/assets/img/right_jt.png">
            </div>
        </li> -->
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
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { ref, onMounted, reactive, toRefs, getCurrentInstance } from "vue";
import {getWeekDay, getWeek,getNewData} from '../../assets/js/util'
export default {
  name: "history",
  props: [""],
  setup() {
    const data = reactive({
      list: [],
      refreshing: false,
      loading: false,
      finished: false,
      page: 1,
      pageSize: 20,

    });
    const { ctx } = getCurrentInstance();
    onMounted(() => {
      // getUserportlist();
    });
    const gotoDateils = (item) => {
      ctx.$router.push({
        name: "weekCheck",
        query: { 
            id:item.weekID,
             name:item.employeeName,
             isLeader:1,
             empStatus:item.status,
             empWeekDate:item.weekDate
          
        },
      });
    };
    // const getUserportlist = () => {
    //   ctx.$HttpApi
    //     .post("/api/WeekReview/leader/list",{
    //       page:1,
    //       pageSize:10000
    //     })
    //     .then((res) => {
    //       let rescodes = res.data;
    //       if (rescodes.code == 0) {
    //         data.list = rescodes.data;
    //       } else {
    //         ctx.$notify({
    //           message: rescodes.message,
    //           type: "warning",
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };

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
        const onRefresh = () => {
      data.finished = false;
      data.loading = true;
      data.page = 1;
      onLoad();
    };
    const onLoad = () => {
      if (data.refreshing) {
        data.list = [];
        data.refreshing = false;
      }

      ctx.$HttpApi
        .post("/api/WeekReview/leader/list", {
          page: data.page,
          pageSize: data.pageSize,
        })
        .then((res) => {
          let rescodes = res.data;
          if (rescodes.code == 0) {
            if (rescodes.data.length == 0) {
              data.finished = true;
            } else {
              data.page = parseInt(data.page) + 1;
              data.loading = false;
              data.list = data.list.concat(rescodes.data);
            }
          } else {
            ctx.$notify({
              message: rescodes.Message,
              type: "warning",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const refdata = toRefs(data);
    return {
      ...refdata,
      gotoDateils,
      fromTime,
      dateChanges,
      onLoad,
      onRefresh
    };
  },
};
</script>
<style lang='css' scoped>
.history {
  background-color: #fff;
  border-radius: 20px;
  padding-left: 37px;
}
.history li {
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  justify-content: space-between;
  min-height: 98px;
  align-items: center;
  padding-right: 40px;
}
.history li:last-child {
  border-bottom: none;
}
.rihtdiv {
  display: flex;
}
.rihtdiv img {
  width: 14px;
  height: 28px;
}
.gdcss {
  display: inline-block;
  padding: 6px 18px;
  border-radius: 16px;
  color: #fff;
  font-size: 20px;
  margin-right: 20px;
}
.mv_colors1 {
  background-color: #f99e9e;
}
.mv_colors2 {
  background-color: #79d47b;
}
.mv_colors3 {
  background-color: #6497b2;
}
.mv_colors4 {
  background-color: #cdcdcd;
}
.mv_colors5 {
  background-color: #ff8a56;
}
</style>