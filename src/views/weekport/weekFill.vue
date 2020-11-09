<template> 
    <div class="scroll_view">
        <p class="time_p">周报时间：2020 04.23-04.29</p>    
        <div class="zhoubaofill">
            <div class="hede">
                <div class="hd_l">
                    <img  class="tu1" src="@/assets/img/icon_rq.png" alt="">
                    <span>本周工作总结</span><sup>*</sup>
                </div>
                <div class="hd_r">
                    <!-- <img class="tu2" src="@/assets/img/icon_add.png" alt=""> -->
                    <img class="tu2" src="@/assets/img/icon_add_dis.png" alt="">
                </div>
            </div>
            <div class="conter_text">
                 <!-- <p class="addtext">已逾期</p> -->
                <!-- <p class="addtext">请在右侧添加内容</p> -->
                    <li class="listQA">
                        <span class="num">1</span>
                        <span class="tilts van-ellipsis">对承保业务及时地进行审核务及务及时地进行务及时地进行务及时地进行时地进行审核，利用风险.....</span>
                        <img  src="@/assets/img/right_jt.png" alt="">
                    </li> 
            </div>
        </div>
        <div class="zhoubaofill">
            <div class="hede">
                <div class="hd_l">
                    <img  class="tu3" src="@/assets/img/icon_bd.png" alt="">
                    <span>存在问题及改进措施</span><sup>*</sup>
                </div>
                <div class="hd_r">
                    <img class="tu2" src="@/assets/img/icon_add.png" alt="">
                     <!-- <img class="tu2" src="@/assets/img/icon_add_dis.png" alt=""> -->
                </div>
            </div>
            <div class="conter_text">
                <!-- <p class="addtext">请在右侧添加内容</p> -->
                  <li class="listQA">
                        <span class="wt_num">问题1</span>
                        <span class="tilts van-ellipsis">对承保业务及时地进行审核务及务及时地进行务及时地进行务及时地进行时地进行审核，利用风险.....</span>
                        <img  src="@/assets/img/right_jt.png" alt="">
                    </li>
            </div>
        </div>
        <div class="zhoubaofill">
            <div class="hede">
                <div class="hd_l">
                    <img  class="tu1" src="@/assets/img/icon_sj.png" alt="">
                    <span>下周工作计划</span><sup>*</sup>
                </div>
                <div class="hd_r">
                    <img class="tu2" src="@/assets/img/icon_add.png" alt="">
                     <!-- <img class="tu2" src="@/assets/img/icon_add_dis.png" alt=""> -->
                </div>
            </div>
            <div class="conter_text">
                <!-- <p class="addtext">请在右侧添加内容</p> -->
                  <li class="listQA">
                        <span class="num">1</span>
                        <span class="tilts van-ellipsis">对承保业务及时地进行审核务及务及时地进行务及时地进行务及时地进行时地进行审核，利用风险.....</span>
                        <img  src="@/assets/img/right_jt.png" alt="">
                    </li>
            </div>
        </div> 
      
    </div>  
    <div class="gubottom">
        <van-button class="zdbutton" round type="primary" color='#005C8D'>提交周报</van-button>
        <!-- <van-button class="zdbutton" round type="primary" color='#C2C2C2'>提交周报</van-button> -->
    </div>
</template>

<script>
import {ref,onMounted,reactive,toRefs, getCurrentInstance} from 'vue'
  export default {
    name:'weekfill',
    props:[''],
   setup(){
       
       return{
           
       }
   }
  }

</script>
<style lang='css' scoped>
    .time_p{
        width: 100%;
        height: 40px;
        background-color: #005C8D;
        color: #fff;
        text-align: center;
        font-size: 24px;
        border-radius: 20px;
        line-height: 40px;
    }
    .zhoubaofill{
        width: 100%;
        border-radius: 20px;
        background-color: #fff;
        padding: 46px 26px 0px 40px;
        margin-top: 30px;
        display: inline-block;
    }
    .hede{
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }
    .tu1{
        display: inline-block;
        width: 28px;
        height: 28px;
        margin-right: 20px;
        
    }
    .tu2{
        display: inline-block;
        width: 48px;
        height: 48px;
        margin-right: 20px;
    }
     .tu3{
        display: inline-block;
        width: 26px;
        height: 30px;
        margin-right: 20px;
    }
    .hd_l span{ 
        color: #333;
        font-size: 32px;
        font-weight: bold;
    }
    .hd_l sup{
        color: red;
    }
    .conter_text .addtext{
        color: #999;
        font-size: 28px;
        padding:30px 0 50px 0;
    }
    .listQA{
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        margin-top: 48px;
    }
   .zhoubaofill .listQA:last-child{
        margin-bottom: 48px;
    }
    .listQA .num{
        color: #fff;
        background-color: #CCCCCC;
        font-size: 24px;
        border-radius: 100%;
        text-align: center;
        display: inline-block;
        padding:5px 10px;
    }
    .listQA img{
        display: inline-block;
        width: 14px;
        height: 28px;
        margin-right: 34px;
    }
    .listQA .tilts{
        flex: 1;
        margin-left: 20px;
        margin-right: 64px;
    }
    .wt_num{
         color: #fff;
        background-color: #CCCCCC;
        font-size: 24px;
        border-radius: 20px;
        text-align: center;
        display: inline-block;
        padding:6px 16px;
    }
    .zdbutton{
        width: 100%;
        height:70px;
    }
    .gubottom{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index:2;
        padding:20px;
    }
    .scroll_view{
        padding-bottom:120px;
    }
</style>