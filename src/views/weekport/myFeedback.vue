<template>
  <!-- <div class="nodata" v-if="list.length<1">
    暂无数据~
</div> -->
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
      <div class="box_div">
        <li
          class="box_li"
          v-for="(item, index) in list"
          :key="index"
          @click="gotofeedDateils(item)"
        >
          <span class="van-ellipsis left_span">{{ item.title }}</span>
          <div class="right_span">
            <span>{{ fromTime(item.createTime) }}</span>
            <img class="right_jt" src="@/assets/img/right_jt.png" alt="" />
          </div>
        </li>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { ref, onMounted, reactive, toRefs, getCurrentInstance } from "vue";
export default {
  name: "myfeedback",
  props: [""],
  setup() {
    const data = reactive({
      list: [],
       refreshing: false,
      loading: false,
      finished: false,
      page:1,
      pageSize:20
    });
    const { proxy } = getCurrentInstance();
    onMounted(() => {
    //   getfeedback();
    });
    // const getfeedback = () => {
    //   proxy.$HttpApi
    //     .post("/api/Suggestion/list", {
    //       page: 1,
    //       pageSize: 1000,
    //     })
    //     .then((res) => {
    //       let rescodes = res.data;
    //       if (rescodes.code == 0) {
    //         data.list = rescodes.data;
    //       } else {
    //         proxy.$notify({
    //           message: rescodes.Message,
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
    const gotofeedDateils = (item) => {
      proxy.$router.push({
        path: "/layout/feedbackCheck",
        query: {
          createTime: item.createTime,
          title: item.title,
          categoryName: item.categoryName,
          content: item.content,
        },
      });
    };
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

      proxy.$HttpApi
        .post("/api/Suggestion/list", {
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
            proxy.$notify({
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
      fromTime,
      gotofeedDateils,
        onRefresh,
      onLoad,
    };
  },
};
</script>
<style lang='css' scoped>
.box_img {
  width: 100%;
  height: 240px;
  border-radius: 20px;
  overflow: hidden;
}
.box_img img {
  width: 100%;
  height: 100%;
}
.box_div {
  width: 100%;
  background-color: #fff;
  padding-left: 36px;
  border-radius: 20px;
}
.right_jt {
  width: 14px;
  height: 28px;
}
.box_li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 92px;
  padding: 0 36px 0 0;
  border-bottom: 1px solid #e2e2e2;
}
.left_span {
  flex: 1;
}
.right_span {
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
}
</style>