<template>
    <van-overlay :show="showlayer" @click="onHideLayer" z-index='5' />
    <div class="review_box" v-if="boxIput">
        <div class="had" v-if="isStatus == 'Replyed'"> 
            <span class="title">批复意见</span>
            <span class="name">{{`批复人：${replyName}`}}</span>        
        </div>
         <div class="had" v-else> 
            <span class="title">{{isLeader == 1?'批复意见填写':'批复意见'}}</span>
            <span class="name">{{isLeader == 1? `周报提交人：${userName}`:`批复人：${replyName}`}}</span>        
        </div>
        <div class="box_iput">
            <textarea :disabled="ischanges" class="box_text" v-model="replyContent" cols="30" rows="10" placeholder="请输入周报批复意见"></textarea>
        </div>
         <div v-if="ischanges" class="box_foot" @click='onHideLayer'>
            关闭
        </div>
        <div v-else class="box_foot" @click='onBoxComf'>
            提交
        </div>
    </div>
    <div class="comfirm" v-if="boxComf">
        <div class="icon_text">
            <img src="@/assets/img/icon_gt.png" alt="">
            <p class="showtest">
                提交批复后将<span>无法修改</span>，<br/> 请您确认检查无误并提交？
            </p>
        </div>
        <div class="but_but">
            <div @click="onHideLayer">取消</div>
            <div class="confirmbut" @click="setReply">确定</div>
        </div>
    </div>

    <div class="scroll_view">
         <!-- isLeader:1,  data.isReply  replyContent-->
        <div class="fixed_review" v-if="isLeader == 0 && replyContent != null" @click="onShowLayer('redy')" >
            <img src="@/assets/img/icon_yj.png" alt="">
            <span>查看意见</span>
        </div>
        <div class="fixed_review" v-if="isLeader == 1 && replyContent !== null && isReply =='N'" @click="onShowLayer('redy')" >
            <img src="@/assets/img/icon_yj.png" alt="">
           
            <span>查看意见</span>
        </div>
         <div class="fixed_review" v-if="isLeader == 1 && isReply !='N' " @click="onShowLayer('changes')" >
            <img src="@/assets/img/icon_yj.png" alt="">
            <span>批复意见</span>
        </div>
 
         <p class="time_p">周报时间： {{weekstart}}至{{weekend}}</p>    
        <div class="zhoubaofill">
            <div class="hede">
                <div class="hd_l">
                    <img  class="tu1" src="@/assets/img/icon_rq.png" alt="">
                    <span>本周工作总结</span><sup>*</sup>
                </div>
            </div>
            <div class="conter_text">
                <p v-if="empStatus=='已逾期'" class="addtext">已逾期</p>
                <p v-if="delayed" class="addtext">已延迟</p>
                 
                <!-- <p class="addtext">请在右侧添加内容</p> -->
                    <li class="listQA" v-for="(item,index) in weekPlans" :key="index" @click="addpanl(1,item,index)">
                        <span class="num">{{index+1}}</span>
                        <span class="tilts van-ellipsis">{{item.content}}</span>
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
                 <p v-if="empStatus=='已逾期'" class="addtext">已逾期</p>
                  <p v-if="delayed" class="addtext">已延迟</p>
                  <li class="listQA"  v-for="(item,index) in weekMend" :key="index" @click="addpanl(2,item,index)">
                        <span class="wt_num">问题{{index+1}}</span>
                        <span class="tilts van-ellipsis">{{item.content}}</span>
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
                 <p v-if="empStatus=='已逾期'" class="addtext">已逾期</p>
                  <p v-if="delayed" class="addtext">已延迟</p>
                  <li class="listQA"  v-for="(item,index) in weekNextPlans" :key="index" @click="addpanl(3,item,index)">
                        <span class="num">{{index+1}}</span>
                        <span class="tilts van-ellipsis">{{item}}</span>
                        <img  src="@/assets/img/right_jt.png" alt="">
                    </li>
            </div>
        </div> 
      
    </div>  
</template>

<script>
import {ref,onMounted,reactive,toRefs, getCurrentInstance} from 'vue'
import {getWeekDay, getWeek,getNewData,fromTime} from '../../assets/js/util'
  export default {
    name:'weekCheck',
    props:[''],
   setup(){
       const data = reactive({
           showlayer:false,
           boxComf:false,
           boxIput:false,
           textarea:'',
           query:'',
           id:'',
           weekstart:'',
           weekend:'',
           isSeeWeek:false,
           isLeader:1,
           isReivew:false,
           userName:'',
           isBut:false,
           isCheck:'',
           isReply:'',
           weekDate:'',
           replyName:'',
           replyContent:null,
           isStatus:'',
           weekMend:[],
           weekNextPlans:[],
           weekPlans:[],
           ischanges:false,
           empStatus:'',
           empWeekDate:'',
           delayed:false

       })
      const {proxy} = getCurrentInstance()
       //控制layer
       const onShowLayer = (val) =>{
           if(val=='redy'){
               data.ischanges = true
           }else if(val == 'changes'){
               data.ischanges = false
           }
           data.showlayer = true 
           data.boxIput = true
       }
       const onHideLayer = () =>{
           data.showlayer = false
           data.boxComf = false
           data.boxIput = false
       }
        const onBoxComf = () =>{
            if(data.replyContent =="" || data.replyContent == null ){
                 proxy.$notify({
                        message: '批复意见不能为空',
                        type: 'warning',
                })
                return false
            }
            data.boxComf = true
            data.boxIput = false
        }
        onMounted(()=>{
            //id-查询id name-查看谁 isLeader-是否领导查看 isReview是否有权限批复
            if(proxy.$router.currentRoute.value.query.id !== ''){
                let query = proxy.$router.currentRoute.value.query
                data.isLeader = query.isLeader
                data.id = query.id
                data.userName = query.name
                data.empStatus = query.empStatus
                data.empWeekDate = query.empWeekDate
                if(data.empStatus == '已逾期'){
                    chagedata(data.empWeekDate)
                    setTimeout(()=>{
                    proxy.$store.commit('setHead',[4,'查看周报 - ','已逾期']) 
                    
                    },1000)
                }
                if(data.empStatus == '已延迟' && data.id == 0){
                    chagedata(data.empWeekDate)
                    data.delayed = true
                    setTimeout(()=>{
                    proxy.$store.commit('setHead',[4,'查看周报 - ','已延迟']) 
                    
                    },1000)
                }
                if( data.isLeader == 1){
                    proxy.$store.commit('setHead',[2,'查看周报 - ',data.userName]) 
                }else{
                     proxy.$store.commit('setHead',[2,'查看周报','']) 
                }
            }
            getCheckweek()
            getSeeWeek()
            //     data.query = proxy.$router.currentRoute.value.query
            // if(proxy.$store.state.isSeeWeek == 'N'){
            //     data.isSeeWeek =  false
            //     proxy.$store.commit('setHead',[2,'查看周报',''])
            // }else{
            //     data.isSeeWeek =  true
            //     proxy.$store.commit('setHead',[2,'查看周报', data.query.name])
            // }
            // proxy.$store.commit('setHead',[2,'查看周报','']) 
            // proxy.$store.commit('setHead',[2,'查看周报 - ','张三']) 
        })
        //审批权限
        const getSeeWeek= ()=>{
        proxy.$HttpApi.get('/api/Employee/seeWeek').then((res)=>{
            if(res.data == 'N'){
                data.isCheck = false
                proxy.$store.state.isSeeWeek = 'N' 
            }else{
                data.isCheck = true
                proxy.$store.state.isSeeWeek = 'Y' 
            }
        }).catch((err)=>{
            console.log(err)
        }) 
       }
        //查看周报
        const getCheckweek= () =>{
             proxy.$HttpApi.get(`/api/WeekReview/leader/${data.id}`).then((res)=>{
                 if(res.code == 0){
                      let detail = res.data.detail
                     if(detail){
                        data.isReply =  res.data.isReply,
                        data.weekDate= detail.weekDate,
                        data.replyName= detail.replyName ,
                        data.replyContent= detail.replyContent,
                        data.isStatus= detail.status,
                        data.weekMend= detail.weekMend,
                        data.weekNextPlans= detail.weekNextPlans,
                        data.weekPlans= detail.weekPlans 
                       let week =  fromTime(detail.weekDate)
                        let weekend = getNewData(week, 6)
                        data.weekstart = week
                        data.weekend = weekend
                     }else{ 
                          data.replyContent = null
                           data.isReply =  res.data.isReply
                     }
                    
                 }else{
                      proxy.$notify({
                        message: res.message,
                        type: 'warning',
                    })
                 }
                 
            }).catch((err)=>{
                console.log(err)
            }) 
        }
        const setReply = () =>{
             proxy.$HttpApi.post('/api/WeekReview/leader/reply',{
               id:data.id,
               replyContent:data.replyContent
            }).then((res)=>{
                let rescodes =  res.data 
                if(rescodes.code){
                    proxy.$toast.success('提交成功'); 
                    data.replyContent = null
                    setTimeout(()=>{
                        proxy.$router.go(-1)
                    },1500)
                }else{
                    proxy.$notify({
                        message: rescodes.message,
                        type: 'warning',
                    })
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
        const addpanl = (num,item,index = '') =>{ 
            console.time('计算时间')
            if(num == 1){
                proxy.$router.push({
                name: 'portDetail',
                params: {
                    content:item? item.content:'',
                    action:item?item.action:'',
                    result:item?item.result:'',
                    index:index,
                    isCheck:true
                }
                }) 
            }else if(num == 2){ 
                proxy.$router.push({
                    name:'portDetail2',
                    params: {
                        content:item? item.content:'',
                        mend:item?item.mend:'',
                        index:index,
                         isCheck:true
                    }
                 })
            }else if(num == 3){
                proxy.$router.push({
                    name:'portDetail3',
                    params: {
                        content:item? item:'',
                        index:index,
                         isCheck:true
                    }
                 })
            }
        }
        const chagedata = (weekDate)=>{
            let week =  fromTime(weekDate)
            let weekend = getNewData(week, 6)
            data.weekstart = week
            data.weekend = weekend
        }
        const refdata = toRefs(data)
       return{
           ...refdata,
           onShowLayer,
           onHideLayer,
           onBoxComf,
           setReply,
           addpanl,
           chagedata
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
      .conter_text{
        min-height:60px;
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