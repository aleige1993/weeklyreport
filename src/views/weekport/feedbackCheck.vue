<template>
    <div class="scroll_views">
         <div class="one boxfill">
          <div class="zongjie newzongjie" >
              <span class="colora tiltes" >意见类别</span>
              <div class="right_type" >
                  <span>{{valueCol}}</span>
                 
              </div>
          </div>
          <!-- <div class="text_aere" :class='message ? "":"text_aere_img"'>
             <van-field
                class="input_file"
                v-model="message"
                rows="1"
                autosize 
                type="textarea"
                placeholder="请填写工作总结"
                />
          </div> -->
      </div>
       <div class="one boxfill">
          <div class="zongjie">
              <span class="colorb tiltes" >意见标题</span>
          </div>
           <div class="text_aere" :class='tiltes ? "":"text_aere_img"'>
             <van-field
                class="input_file"
                readonly
                v-model="tiltes"
                rows="1"
                autosize 
                type="textarea"
                placeholder="请填写意见标题"
                />
          </div>
      </div>
       <div class="one boxfill">
          <div class="zongjie">
              <span class="color2 tiltes" >意见内容</span>
          </div>
           <div class="text_aere" :class='message ? "":"text_aere_img"'>
             <van-field
                readonly
                class="input_file"
                v-model="message"
                rows="1"
                autosize 
                type="textarea"
                placeholder="请填写意见内容"
                />
          </div>
      </div>
    </div>
</template>

<script>
import {ref,onMounted,reactive,toRefs, getCurrentInstance} from 'vue'
  export default {
    name:'feedbackfillin',
    props:[''],
   setup(){
       const data = reactive({
           showIcon:false,
           tiltes:'',
           message:'',
           showPicker:false,
           params:'',
           isReview:false,
           date:'',
            columns: [{
      "name": "string1",
      "value": 0
    },{
      "name": "string2",
      "value": 1
    }],
            valueCol:''
       })
       const {proxy} = getCurrentInstance()
       onMounted(()=>{
            if(proxy.$router.currentRoute.value.query){
                let query = proxy.$router.currentRoute.value.query
                data.tiltes = query.title
                data.valueCol = query.categoryName
                data.message = query.content
                data.date = query.createTime
            }
            getTypes()
       })
       const getTypes = () =>{
           proxy.$HttpApi.get('/api/SuggestionCategory/list').then((res)=>{
            if(res.code == 0){
                data.columns = res.data
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
       
       
       const handlPicker = (bel) => {
           data.showPicker = bel
       }
       const onConfirm = (value) =>{ 
           data.valueCol = value
           data.showPicker = false
       }
        const refdata = toRefs(data)
       return{
           ...refdata,
           handlPicker,
           onConfirm
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
    width: 100%;
    height: 70px;
}
 .boxfill{
     background-color: #fff;
     padding: 30px;
     border-radius: 20px;
     margin-bottom: 30px;
 }
 .colora{
     background-color: #7DC0B6;
 }
 .colorb{
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
 .right_type{
     display: flex;
     justify-content: flex-end;
 }
 .right_jt{
    width: 18px;
    height:28px;
    margin-left: 20px;
 }
 .newzongjie{
     display: flex;
     justify-content: space-between;
     align-items: center;
 }
 .right_type span{
    font-size: 28px;
 }
</style>