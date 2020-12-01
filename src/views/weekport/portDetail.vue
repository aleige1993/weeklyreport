<template>
    <div class="scroll_views">
         <div class="one boxfill">
          <div class="zongjie">
              <span class="color1 tiltes" >工作总结</span>
          </div>
          <div class="text_aere" :class='content ? "":"text_aere_img"'>
             <van-field
                :readonly="isCheck"
                class="input_file"
                v-model="content"
                rows="1"
                autosize 
                type="textarea"
                placeholder="请填写工作总结"
                />
          </div>
      </div>
       <div class="one boxfill">
          <div class="zongjie">
              <span class="color2 tiltes" >行为轨迹</span>
          </div>
           <div class="text_aere" :class='action ? "":"text_aere_img"'>
             <van-field
              :readonly="isCheck"
                class="input_file"
                v-model="action"
                rows="1"
                autosize 
                type="textarea"
                placeholder="请填写行为轨迹"
                />
          </div>
      </div>
       <div class="one boxfill">
          <div class="zongjie">
              <span class="color2 tiltes" >工作效果</span>
          </div>
           <div class="text_aere" :class='result ? "":"text_aere_img"'>
             <van-field
              :readonly="isCheck"
                class="input_file"
                v-model="result"
                rows="1"
                autosize 
                type="textarea"
                placeholder="请填写工作效果"
                />
          </div>
      </div>
    </div>
    <div class="but_box" v-if="!isCheck">
        <van-button class="but_action" round type="primary" color="#C0AB7D" @click="delpanls">删除总结</van-button>
        <van-button  class="but_action" round type="primary" color="#005C8D" @click="addplans">{{index == '-1' ?'添加总结':'修改总结'}}</van-button>
    </div>
     
</template>

<script>
import {ref,onMounted,reactive,toRefs, getCurrentInstance} from 'vue'
  export default {
    name:'portDetail',
    props:[''],
   setup(){
       const data = reactive({
           showIcon:false,
           message:'',
           content:'',
           action:'',
           result:'',
           index:'-1',
           isCheck:false
       })
       const {ctx} = getCurrentInstance()
        onMounted(()=>{

            if(ctx.$router.currentRoute.value.params.index !== ''){
                let params = ctx.$router.currentRoute.value.params
                data.content = params.content
                data.action = params.action
                data.result = params.result
                data.index = params.index,
                data.isCheck = params.isCheck?JSON.parse(params.isCheck):params.isCheck
                if(params.isCheck == true){
                     ctx.$store.commit('setHead',[4,'工作总结 - 查看',''])
                }
            }else{

            }
        })
        const addplans = ()=>{
            if(data.content == ''){
                 ctx.$notify({
                    message: '工作总结不能为空',
                    type: 'warning',
                })
                return false
            }else if(data.action  == ''){
                 ctx.$notify({
                    message: '行为轨迹不能为空',
                    type: 'warning',
                })
                return false
            }else if(data.result == ''){
                 ctx.$notify({
                    message: '工作效果不能为空',
                    type: 'warning',
                })
                return false
            } 
            const addWeekReport = ctx.$store.state.addWeekReport
            if(data.index == '-1'){
                addWeekReport.weekPlans.push({
                    'content':data.content,
                    'action':data.action,
                    'result':data.result
                })
                ctx.$toast.success('添加成功');

            }else{
                addWeekReport.weekPlans[data.index] = {
                    'content':data.content,
                    'action':data.action,
                    'result':data.result
                }
                ctx.$toast.success('修改成功');
            } 
            ctx.$store.commit('changeUpdate', true)
            setTimeout(()=>{
            ctx.$router.push('/layout/weekfill')
            },2000)
        }
        const delpanls = () =>{
            if( data.index == '-1'){
            }else{
                ctx.$store.commit('delPanl1', data.index)
                 ctx.$toast.success('删除成功');
                 ctx.$store.commit('changeUpdate', true)
                  setTimeout(()=>{
            ctx.$router.push('/layout/weekfill')
            },2000)
            }
        }
        const refdata = toRefs(data)
       return{
           ...refdata,
           addplans,
           delpanls
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