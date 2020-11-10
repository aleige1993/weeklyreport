<template>
  <div class="headers">
      <div class="leftcss" @click="onGoBack">
         <img src="../assets/img/left_jt.png" alt="">
      </div>
      <div class="content" v-if="gethdData.rose == 0">{{meat}}</div>
      <div class="content" v-else>{{gethdData.txt}} 
        <span v-if='gethdData.rose == 2' class="end1">{{gethdData.end}}</span>
        <span v-if='gethdData.rose == 3' class="end2">{{gethdData.end}}</span>
        <span v-if='gethdData.rose == 4' class="end3">{{gethdData.end}}</span>
      </div>
      <div class="rightcss" v-if='soso=="soso"'>
          <img src="@/assets/img/icon_soso.png" alt="">
      </div>
  </div>
</template>

<script>
  import { onMounted, reactive, ref, toRefs,getCurrentInstance, computed} from 'vue'
  export default {
    name:'headers',
    props:[''],
    setup(){
      let meat = ref(0)
      let soso = ref(0)
      const {ctx} = getCurrentInstance()
      const $router = ctx.$router.currentRoute.value
      console.log(ctx.$router)
      onMounted(()=>{
        meat.value = $router.meta.title
        soso.value = $router.meta.hd
      })
      const onGoBack = () => {
       ctx.$router.go(-1)
      }
      const gethdData = computed(()=>{
        return ctx.$store.state.HeadData
      })
      return{
        meat,
        onGoBack,
        gethdData,
        soso
      }
    }, 
  }

</script>
<style lang='css' scoped>
.end1{
  color: #005C8D;
}
.end2{
  color: #FF8A56;
}
.end3{
  color: #F13939;
}
.headers{
  width: 100%;
  height:90px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index:5;
  border-bottom:1px solid  #D4D4D4;
}  
.leftcss, .rightcss{
  display: inline-block;
  height: 90px;
  text-align: center;
  line-height: 90px;
  position:absolute;
  z-index:2;
}
.leftcss{
  width:80px;
  top: 0;
  left: 0;
}
.rightcss{
  right: 0;
  top: 0;
  width:120px;
}

.leftcss img{
  display: inline-block;
  width: 12px;
  height: 22px;
}
.content{
  width: 100%;
  height: 90px;
  text-align: center;
  line-height: 90px;
}
.rightcss img{
  display: inline-block;
  width: 36px;
  height: 36px;
}
</style>