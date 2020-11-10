<template>
    <van-overlay :show="showlayer" @click="onHideLayer" z-index='5' />
    <div class="review_box" v-if="boxIput">
        <div class="had">
            <span class="title">批复意见</span>
            <span class="name">批复人：张三</span>        
        </div>
        <div class="box_iput">
            <textarea class="box_text" v-model="textarea" cols="30" rows="10" placeholder="请输入周报批复意见"></textarea>
        </div>
        <div class="box_foot" @click='onBoxComf'>
            提交
        </div>
    </div>
    <div class="comfirm" v-if="boxComf">
        <div class="icon_text">
            <img src="@/assets/img/icon_gt.png" alt="">
            <p class="showtest">
                提交周报后将<span>无法修改</span>，<br/> 请您确认检查无误并提交？
            </p>
        </div>
        <div class="but_but">
            <div @click="onHideLayer">取消</div>
            <div class="confirmbut">确定</div>
        </div>
    </div>

    <div class="scroll_view">
        <div class="fixed_review" @click="onShowLayer">
            <img src="@/assets/img/icon_yj.png" alt="">
            <span>批复意见</span>
        </div>
        <p class="time_p">周报时间：2020 04.23-04.29</p>    
        <div class="zhoubaofill">
            <div class="hede">
                <div class="hd_l">
                    <img  class="tu1" src="@/assets/img/icon_rq.png" alt="">
                    <span>本周工作总结</span><sup>*</sup>
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
</template>

<script>
import {ref,onMounted,reactive,toRefs, getCurrentInstance} from 'vue'
  export default {
    name:'weekCheck',
    props:[''],
   setup(){
       const data = reactive({
           showlayer:false,
           boxComf:false,
           boxIput:false,
           textarea:''
       })
      const {ctx } = getCurrentInstance()
       //控制layer
       const onShowLayer = () =>{
           data.showlayer = true 
           data.boxIput = true
       }
       const onHideLayer = () =>{
           data.showlayer = false
           data.boxComf = false
           data.boxIput = false
       }
        const onBoxComf = () =>{
            data.boxComf = true
            data.boxIput = false
        }
        onMounted(()=>{
            ctx.$store.commit('setHead',[2,'查看周报 - ','张三']) 
        })
        const refdata = toRefs(data)
       return{
           ...refdata,
           onShowLayer,
           onHideLayer,
           onBoxComf
       }
   }
  }

</script>
<style lang='css' scoped>
.confirmbut{
    color: #005C8D;
    border-left:1px solid #ccc;
}
.but_but{
    display: flex;
    justify-content: space-around;
    border-top:1px solid #ccc;
    height: 86px;
    line-height: 86px;
}
.but_but div{
    width: 50%;
    text-align: center;
}
    .showtest{
        font-size: 30px;
        color: #333333;
        line-height: 50px;
    }
    .showtest span{
        color:#E10000;
        font: 30px;
    }
    .icon_text{
        display: flex;
        justify-content: center;
        align-items: center;
        padding:75px 100px;
    }
    .icon_text img{
        width:92px;
        height: 92px;
        display: inline-block;
        margin-right: 20px;
    }
    .box_foot{
        text-align: center;
        line-height:86px;
        color: #005C8D;
        font-size: 30px;
        border-top:1px solid #CCCCCC;
        margin-top:50px;
    }
    .review_box{
        background-color: #fff;
        border-radius: 20px;
        width:94%;
        position: fixed;
        z-index: 6;
        top:30%;
        left:3%;
    }
    .comfirm{
        background-color: #fff;
        border-radius: 20px;
        width:94%;
        position: fixed;
        z-index: 8;
        top:30%;
        left:3%;  
    }
    .review_box .had{
        display: flex;
        padding: 50px;
        justify-content: space-between;
        align-items: flex-end;
    }
    .title{ 
        font-size: 36px; 
        font-weight: bold;
        color: #333333;
    }
    .name{ 
        font-size: 28px; 
        color: #999999;
    }
    .box_iput{
        width: 100%;
        padding:0 50px;
    }
    .box_text{
        border:none;
        width: 100%;
        font-size: 28px; 
        color: #333333;
    }
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
        padding-bottom:100px;
    }
    .fixed_review{
        position: fixed;
        text-align: center;

        bottom:40px;
        right:60px;
        z-index:3;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 170px;
        height: 170px; 
            background: #EE787E;
            box-shadow: 0px 8px 9px 0px rgba(235, 91, 99, 0.56);
            border-radius: 100%;
    }
    .fixed_review img{
        display: inline-block;
        width: 50px;
        height: 54px;
    }
    .fixed_review span{
        font-size: 28px;
        color: #fff;
        margin-top: 10px;
    }
</style>