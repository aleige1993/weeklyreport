<template>
<van-overlay :show="showlayer" @click="onHideLayer" z-index='5' />
<div class="comfirm" v-if="showlayer">
        <div class="icon_text">
            <img src="@/assets/img/icon_gt.png" alt="">
            <p class="showtest">
                今天{{weekd}}，下周一将<span>逾期</span><br/> 请您及时填报本周周报！
            </p>
        </div>
        <div class="but_but">
            <div class="hhecol" @click="onHideLayer">我已知晓</div> 
        </div>
    </div>

  <div class="haer_bg">
      <div class="logimgs">
          <img class="log" src="@/assets/img/icon_logo.png" alt="">
          <img @click="logout()" class="logout" src="@/assets/img/icon_tc.png" alt="">
      </div>
      <div class="toux">
          <img class="usertoux" src="@/assets/img/icon_tx.png" alt="">
          <p class="xidong">
              欢迎您，{{employeeName}}<span class="role" >{{posNames}}</span><router-link  :to="{path:'/layout/password'}" class="change" >修改密码</router-link>
          </p>
      </div>
      <div class="pand">
          <div class="flexbox">
              <span class="sp1">{{delayWriteWeekCount}}</span>
              <span class="sp2">待填周报</span>
          </div>
          <div class="flexbox">
              <span class="sp1">{{replyingWeekCount}}</span>
              <span class="sp2">待批复周报</span>
          </div>
          <div class="flexbox">
              <span class="sp1">{{suggestionCount}}</span>
              <span class="sp2">匿名意见</span>
          </div>
      </div>
  </div>
    <div class="flexurlbox">
        <li @click="gotoPage(1)">
            <div>
                <img class="imga" src="@/assets/img/u_txzb.png" alt="">
            </div>
            <span>填写活动周报</span>
        </li>
          <li @click="gotoPage(2)">
            <div>
                <img class="imga" src="@/assets/img/u_wdlis.png" alt="">
            </div>
            <span>我的历史周报</span>
        </li>
         <li v-if='isCheck' @click="gotoPage(3)">
            <div>
                <img class="imga" src="@/assets/img/u_pf.png" alt="">
            </div>
            <span>批复下属周报</span>
        </li>
          <li @click="gotoPage(4)">
            <div>
                <img class="imga" src="@/assets/img/u_nm.png" alt="">
            </div>
            <span>填写匿名意见</span>
        </li>
          <li @click="gotoPage(5)">
            <div>
                <img class="imga" src="@/assets/img/u_wdls.png" alt="">
            </div>
            <span>我的历史意见</span>
        </li>
           
          <li @click="gotoPage(6)">
                <div>
                    <img class="imgyj" src="@/assets/img/u_yj.png" alt="">
                </div>
                <span>大地意见广场</span>
        </li>
    </div>
</template>

<script>
import {ref,onMounted,reactive,toRefs, getCurrentInstance} from 'vue'
import {getWeekDay, getWeek} from '../../assets/js/util'
import UserLogin from '../../assets/js/UserLogin';
  export default {
    name:'user',
    props:[''],
   setup(){
       const data = reactive({
           isCheck:false,
           showlayer:false,
           delayWriteWeekCount:0,
           replyingWeekCount:0,
           suggestionCount:0,
           weekd:'星期五',
           isSubmit:"",
           isID:'',
           employeeName:'',
           posNames:''
       })
       onMounted(()=>{
        getSummary()
        getSeeWeek()
        getExists()
        getWeekReport()
        getUserInfo()
        // proxy.$router.push('/layout/password')
       })
       
      const {proxy } = getCurrentInstance()
       //控制layer
       const onShowLayer = () =>{
           data.showlayer = true  
       }
       const onHideLayer = () =>{
           data.showlayer = false 
       }
        const getExists = () =>{
            let weekDate = getWeekDay()
            proxy.$HttpApi.get(`/api/WeekReview/exists/${weekDate}`).then((res)=>{
                data.weekd = getWeek()
                if(res.code==0){
                    data.isSubmit = res.data
                    if(res.data == 'Y'){
                        data.showlayer = false
                    }else{
                         data.showlayer = true
                    }
                }else{
                     proxy.$notify({
                        message: res.message,
                        type: 'warning',
                    })
                }
            }).catch((err)=>{
                
            })
        }

       const getSummary= ()=>{
            proxy.$HttpApi.get('/api/Employee/summary').then((res)=>{
                const respoen = res.data
                data.delayWriteWeekCount = respoen.delayWriteWeekCount,
                data.replyingWeekCount= respoen.replyingWeekCount,
                data.suggestionCount= respoen.suggestionCount
            }).catch((err)=>{
               
            })
       } 
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
           
        }) 
       }

        //跳转修改密码
        const changePswd =() => {
            proxy.$router.push('/layout/password')
        }
        const gotoPage =(name)=>{
            if(name == 1){
            //     let isStuts = ''
            //     if(data.isSubmit == 'N'){
            //         isStuts = 1
            //     }else{
            //          isStuts = 2
            //     }
            //     proxy.$router.currentRoute.value.query
            //   proxy.$router.push({path:'/layout/weekfill',query:{'isStuts':isStuts}})
             proxy.$router.push({path:'/layout/weekfill', query:{
                isID:data.isID,

             }})
            }else if(name == 2){
                proxy.$router.push('/layout/historyPort')
            }else if(name == 3){
                proxy.$router.push({name:'weekReview'})
            }else if(name == 4){
                proxy.$router.push('/layout/feedbackfill')
            }else if(name == 5){
                proxy.$router.push('/layout/myfeedback')
            }else if(name == 6){
                proxy.$router.push('/layout/feedback')
            }
         }
      const getWeekReport = () =>{
            let week = getWeekDay()
            proxy.$HttpApi.get(`/api/WeekReview/${week}`).then((res)=>{
            if(res.code == 0){
               let addWeekReport = proxy.$store.state.addWeekReport
               if(res.data.id){ 
                    proxy.$store.state.isID = res.data.id
                     proxy.$store.state.isWeekFill = res.data.status
                } 
               if(res.data == null){
                addWeekReport.weekPlans = [],
                addWeekReport.weekNextPlans = [],
                addWeekReport.weekMend =[]
                proxy.$store.state.isWeekFill = ""
               }else{
                addWeekReport.weekPlans = res.data.weekPlans?res.data.weekPlans:[],
                addWeekReport.weekNextPlans = res.data.weekNextPlans?res.data.weekNextPlans:[],
                addWeekReport.weekMend = res.data.weekMend?res.data.weekMend:[]
               }
            }else{
                 proxy.$notify({
                        message: res.message,
                        type: 'warning',
                    })
            }
        }).catch((err)=>{
            
        }) 

        }
        const getUserInfo = () =>{ 
            proxy.$HttpApi.get(`/api/Employee/info`).then((res)=>{
            if(res.code == 0){
              data.employeeName = res.data.employeeName
              if(res.data.posNames){
                data.posNames = res.data.posNames.toString()
              }else{
                  data.posNames = ''
              }
            }else{
                 proxy.$notify({
                        message: res.message,
                        type: 'warning',
                    })
            }
        }).catch((err)=>{
            
        }) 

        }
        const logout = () =>{
            UserLogin.removeLoginInfo()
            proxy.$router.replace('/login')
        }
        const refdata = toRefs(data)
       return{
           ...refdata,
           onShowLayer,
           onHideLayer,
           getSummary,
           getSeeWeek,
           changePswd,
           gotoPage,
           logout
       }
   }
  }
</script>
<style lang='css' scoped>
.flexurlbox{
    width: 90%;
    margin-left:5%;
    margin-top: 10%;
    display: flex;
    flex-wrap: wrap;
}
.flexurlbox li{
    width: 33%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
}
.flexurlbox li div{
    display: inline-block;
    width: 118px;
    height: 118px;
    border-radius:100%;
    background-color: #005C8D;
    text-align: center;
    line-height: 150px;
}
.flexurlbox li span{
    color: #333;
    font-size: 26px;
    margin-top: 16px;
}
.pand{
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    width: 90%;
    position: absolute;
    border-radius:20px;
    left:5%;
    bottom:-60px;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 40px; 
box-shadow: 0px 9px 13px 0px rgba(0, 0, 0, 0.1);
}
.flexbox{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.flexbox span{
text-align: center;
}
span.sp1{
    color: #C0AB7D;
    font-size: 46px;
    margin-bottom: 20px;
}
span.sp2{
    color: #666666;
    font-size: 26px;
}
.imga{
    width: 48px;
    height: 47px;
}
.haer_bg{
    background-image: url('../../assets/img/img_bj.png');
    background-size:100% 400px;
    background-repeat: no-repeat;
    position: relative;
    height: 400px;
}
.logimgs{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:40px;
}
.logimgs .log{
    width: 177px;
    height: 40px;
}
.logimgs .logout{
    width: 44px;
    height: 44px;
}
.toux{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.usertoux{
    width: 112px;
    height: 112px;
}
.xidong{
    color: #fff;
    font-size: 24px;
    margin-top: 20px;
}
.role{
    color: #FFF47E;
    font-size: 24px;
    margin-left: 10px;
    display: inline-block;
    max-width:100px;
}
.change{
    color: #8DFFE6;
    margin-left:20px;
    text-decoration:underline;
    font-size: 24px;
}
.imgyj{
    width:63px;
    height: 46px;
}
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
    .hhecol{
        font-size: 30px;
        color: #005C8D;
    }
</style>