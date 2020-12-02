<template>
<div class="passbox">
    <div class="boxss">
        <li>
            <input type="password" v-model="paswd1" placeholder="原始密码">
        </li>
        <li>
            <input type="password" v-model="paswd2" placeholder="更新密码">
        </li>
        <li>
            <input type="password" v-model="paswd3" placeholder="确认更新密码">
        </li>
    </div>

    <van-button type="primary" round class="changebut" @click="submit">确定修改密码</van-button>
</div>
</template>

<script>
import {
    reactive,
    toRefs,
    onMounted,
    getCurrentInstance
} from 'vue'
export default {
    name: 'password',
    props: [''],
    setup() {
        const data = reactive({
            paswd1: '',
            paswd2: '',
            paswd3: ''
        })
        const {
            proxy
        } = getCurrentInstance()
        onMounted(() => {
            // proxy.$notify({
            //     message: '您输入的原始密码不正确，请重新输入',
            //     type: 'warning',
            // })
        })
        const submit = () =>{
            if(data.paswd1 == ''){
                proxy.$notify({
                    message: '请输入原始密码',
                    type: 'warning',
                })
            }else if(data.paswd2 == ''){
                 proxy.$notify({
                    message: '请输入更新密码',
                    type: 'warning',
                })
            }else if(data.paswd3 !== data.paswd2){
                 proxy.$notify({
                    message: '与更新密码不一致',
                    type: 'warning',
                })
            }
            proxy.$HttpApi.post('/api/Employee/changepwd',{
                oldPassword: data.paswd1,
                newPassword: data.paswd2,
                againPassword:data.paswd3
            }).then((res)=>{
                let rescodes =  res.data
                 proxy.$toast.success('修改成功!'); 
                if(rescodes.code){
                    proxy.$toast.success('修改成功!'); 
                    setTimeout(()=>{
                        proxy.$router.push('/login')
                    },1500)
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
        return {
            ...toRefs(data),
            submit
        }
    }

}
</script>

<style lang="css" scoped>
.boxss li {
    margin: 10px 0 10px 60px;
    border-bottom: 1px solid #E2E2E2;
}

.boxss li input {
    border: none;
    font-size: 28px;
    line-height: 90px;
}

.boxss {
    background-color: #fff;
    border-radius: 20px;
    padding-bottom: 68px;
    padding-top: 20px;
}

.passbox {
    padding: 40px 20px;
}

.changebut {
    background-color: #005C8D;
    height: 70px;
    width: 100%;
    font-size: 30px;
    margin-top: 25px;
    border: #005C8D;
}

.changetip {
    height: 200px !imporant;
    font-size: 34px !imporant;
}
</style>
