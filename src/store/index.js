import { createStore } from 'vuex'

export default createStore({
    state: {
        HeadData: {
            rose: 0, //0：不变 1:直接赋值 2：查看name 3:延迟上报 4：已逾期
            txt: '', // rose == 1 && txt!= null 
            end: '' // rose > 1 展示的不同类型的内容
        }
    },
    mutations: {
        setHead(state, vaule = []) {
            console.log('val', vaule)
            state.HeadData.rose = vaule[0] ? vaule[0] : 0
            state.HeadData.txt = vaule[1] ? vaule[1] : ''
            state.HeadData.end = vaule[2] ? vaule[2] : ''
        }
    },
    actions: {},
    modules: {}
})