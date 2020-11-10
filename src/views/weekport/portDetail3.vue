<template>
    <div class="scroll_views">
         <div class="one boxfill">
          <div class="zongjie">
              <span class="color1 tiltes" >工作计划内容</span>
          </div>
          <div class="text_aere" :class='message ? "":"text_aere_img"'>
             <van-field
                class="input_file"
                v-model="message"
                rows="1"
                autosize 
                type="textarea"
                placeholder="请填写工作计划内容"
                />
          </div>
      </div>
       
    </div>
    <div class="but_box">
        <van-button class="but_action" round type="primary" color="#C0AB7D">删除计划</van-button>
        <van-button  class="but_action" round type="primary" color="#005C8D">保存更新</van-button>
    </div>
     
</template>

<script>
import {ref,onMounted,reactive,toRefs, getCurrentInstance} from 'vue'
  export default {
    name:'portDetail2',
    props:[''],
   setup(){
       const data = reactive({
           showIcon:false,
           message:''
       })
        const refdata = toRefs(data)
       return{
           ...refdata
       }
   }
  }

</script>
<style lang='css' scoped>
.scroll_views{
padding-bottom:90px;
}
.but_box{
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 30px;
    left: 3%;
    width: 94%;
    z-index: 2;
}
.but_action{
    width: 49%;
    height: 70px;
}
 .boxfill{
     background-color: #fff;
     padding: 30px;
     border-radius: 20px;
     margin-bottom: 30px;
 }
 .color1{
     background-color: #C0AB7D;
 }
  .color2{
     background-color: #96C0D6;
 }
 .tiltes{
     display: inline-block;
     padding:10px 20px;
     color: #fff;
     font-size: 24px;
     border-radius:20px;
 }
 .text_aere{
     margin-top: 30px;
     background-size:28px;
     background-position:right;
    background-repeat: no-repeat;
 }
 .text_aere_img{
     background-image: url(../../assets/img/icon_bj.png);
 }
 .input_file{
     font-size: 28px;
     padding: 0;
     line-height: 36px;
     background-color:transparent;
 }
</style>