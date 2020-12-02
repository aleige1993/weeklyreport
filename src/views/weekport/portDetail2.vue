<template>
    <div class="scroll_views">
         <div class="one boxfill">
          <div class="zongjie"> 
              <span class="color1 tiltes" v-if="index == '-1'">问题</span>
              <span class="color1 tiltes" v-else>问题{{num}}</span>
          </div>
          <div class="text_aere" :class='content ? "":"text_aere_img"'>
             <van-field
                :readonly="isCheck"
                class="input_file"
                v-model="content"
                rows="1"
                autosize 
                type="textarea"
                placeholder="请填写工作问题"
                />
          </div>
      </div>
       <div class="one boxfill">
          <div class="zongjie">
              <span class="color2 tiltes" >改进措施</span>
          </div>
           <div class="text_aere" :class='mend ? "":"text_aere_img"'>
             <van-field
                :readonly="isCheck"
                class="input_file"
                v-model="mend"
                rows="1"
                autosize 
                type="textarea"
                placeholder="请填写改进措施"
                />
          </div>
      </div> 
    </div>
    <div class="but_box" v-if="!isCheck">
        <van-button class="but_action" round type="primary" color="#C0AB7D" @click="delpanls">删除问题</van-button>
        <van-button  class="but_action" round type="primary" color="#005C8D" @click="addplans">{{index == '-1' ?'添加问题':'修改问题'}}</van-button>
    </div>
     
</template>

<script>
import {ref,onMounted,reactive,toRefs, getCurrentInstance} from 'vue'
  export default {
    name:'portDetail2',
    props:[''],
  setup(){
       const data = reactive({
           content:'',
           mend:'',
           index:'-1',
           num:0,
           isCheck:false
       })
       const {proxy} = getCurrentInstance()
        onMounted(()=>{
            if(proxy.$router.currentRoute.value.params.index !== ''){
                let params = proxy.$router.currentRoute.value.params
                data.content = params.content
                data.mend = params.mend
                data.index = params.index
                data.isCheck = params.isCheck?JSON.parse(params.isCheck):params.isCheck
                data.num = parseInt(data.index)+1
                 if(params.isCheck == true){
                     proxy.$store.commit('setHead',[4,'存在问题 - 查看',''])
                }
            }else{

            }
        })
        const addplans = ()=>{
            if(data.content == ''){
                 proxy.$notify({
                    message: '问题不能为空',
                    type: 'warning',
                })
                return false
            }else if(data.mend  == ''){
                 proxy.$notify({
                    message: '改进措施不能为空',
                    type: 'warning',
                })
                return false
            }
            const addWeekReport = proxy.$store.state.addWeekReport
            console.log('addWeekReport', addWeekReport.weekMend)
            if(data.index == '-1'){
                addWeekReport.weekMend.push({
                    'content':data.content,
                    'mend':data.mend,
                })
                proxy.$toast.success('添加成功');
            }else{
                addWeekReport.weekMend[data.index] = {
                    'content':data.content,
                    'mend':data.mend
                }
                proxy.$toast.success('修改成功');
            } 
            setTimeout(()=>{
            proxy.$router.push('/layout/weekfill')
            },2000)
             proxy.$store.commit('changeUpdate', true)
        }
        const delpanls = () =>{
            if( data.index == '-1'){
            }else{
                proxy.$store.commit('delPanl2', data.index)
                 proxy.$toast.success('删除成功');
                 proxy.$store.commit('changeUpdate', true)
                  setTimeout(()=>{
            proxy.$router.push('/layout/weekfill')
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