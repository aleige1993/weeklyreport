<template>
  <div class="dagonin">
      <img src="../../assets/img/dadilogo.png" class="logos" alt="">
      <img src="../../assets/img/buglogo.png" class="bgtu" alt="">
      <p class="titles">登录 USERLOGIN</p>
      <div class="divgrap">
        <!-- <van-field v-model="tel" type="tel" placeholder="手机号码" />
        <van-field v-model="password" type="password" placeholder="密码" /> -->
        <input class="inputtext"  v-model="tel" type="text" placeholder="手机号码" />
        <input class="inputtext" v-model="password"  type="password" placeholder="密码"/>
         <van-button class="buttvat" @click="subLogin" round type="primary">登录</van-button>
      </div>
     
  </div>
</template>

<script>
 import {ref,onMounted,reactive,toRefs, getCurrentInstance} from 'vue'
  export default {
    name:'',
    props:[''],
    setup(){
      const data = reactive({
        tel:'',
        password:''
      })
    const {ctx , proxy } = getCurrentInstance()
    const subLogin = () =>{
      proxy.$HttpApi.post('/api/Employee/login',{
        userName:data.tel,
        userPwd:data.password
      }).then((res)=>{
        if(res.headers.token){
          proxy.$UserLogin.setLoginInfo(res.headers.token)
          ctx.$router.push({path:'/user'})
        }else{
          if(proxy.$UserLogin.getLoginToken()){
             ctx.$router.push({path:'/user'})
          }else{
            ctx.$notify({
                    message: '登录失败',
                    type: 'warning',
                })
          }
        }
       
      }).catch((err)=>{
    
      })
    }
      return{
        ...toRefs(data),
        subLogin
      }      
    }
  }

</script>
<style lang='css' scoped>
.dagonin{
  width: 100%;
  height: 100vh;
background: linear-gradient(-27deg, #D5DE9B, #005C8D);
}
.logos{
  width: 210px;
  height: 46px;
  margin-left: 72px;
  margin-top: 72px;
}
.bgtu{
width: 657px;
height: 550px;
margin-left: 44px;
margin-top: 100px;
}
.titles{
font-size: 24px; 
color: #FFFFFF;
text-align: right;
padding-right: 90px;
margin-top: 55px;
margin-bottom: 20px;
}
.divgrap{
  padding: 0 70px;
}
.inputtext{
  line-height: 70px;
  border-radius:35px;
  background-color: #fff;
  margin-bottom:20px;
  width: 100%;
  border:none;
  padding-left:20px;
}
.buttvat{
  background-color: #176A87;
  width: 100%;
  height:80px;
  margin-top: 30px;
  border:none;
}
</style>