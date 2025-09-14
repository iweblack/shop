import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'

// 流程  action提交
// dispatch --> actions --> mutations --> state --> render

const state = {
    username: '',
    uid: '',
    token: '',
    cartNums: ''
}

export default createStore({
    state,
    mutations,
    actions
})
